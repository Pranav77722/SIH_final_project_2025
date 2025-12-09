import { collection, getDocs, query, where, collectionGroup, addDoc, updateDoc, doc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/client';
import kpiData from '../../mock-data/kpi-sample.json';

const SIMULATED_DELAY = 300;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getApplications = async (filters = {}) => {
    try {
        // Use collectionGroup to query all 'schemes' subcollections across all citizens
        const schemesQuery = query(collectionGroup(db, 'schemes'));
        const querySnapshot = await getDocs(schemesQuery);

        console.log(`[DEBUG] Fetched ${querySnapshot.size} scheme applications from subcollections.`);

        let data = querySnapshot.docs.map(doc => {
            const schemeData = doc.data();
            // The parent of a scheme doc is the 'schemes' collection
            // The parent of that is the citizen document
            const citizenId = doc.ref.parent.parent ? doc.ref.parent.parent.id : 'Unknown';

            // Determine Progress Steps based on data
            const isSubmitted = true; // If it exists, it's submitted
            const isDigiVerified = true; // Assuming Verified for now as data doesn't explicitly have it in the snippets
            const isOfficerVerified = schemeData.scheme_approved_by_officer === true;

            return {
                id: doc.id, // Scheme Document ID
                citizenId: citizenId, // Aadhaar/Citizen ID
                applicantName: schemeData.userName || schemeData.fullName || 'Unknown',
                
                // Scheme Details
                schemeName: schemeData.schemeTitle || 'Unknown Scheme',
                cost: schemeData.cost || 0,
                
                // Status & Verification
                status: schemeData.status || 'Applied',
                approvedBy: schemeData.scheme_approved_by_officer ? 'Officer' : 'Pending',
                submissionDate: schemeData.timestamp ? new Date(schemeData.timestamp.seconds * 1000).toISOString().split('T')[0] : 'Recent',
                
                // Steps for Progress Bar
                steps: {
                    submitted: isSubmitted,
                    digiVerified: isDigiVerified,
                    officerVerified: isOfficerVerified
                },
                
                // Raw request data for submission
                fullData: schemeData
            };
        });

        if (filters.search) {
            const lowerSearch = filters.search.toLowerCase();
            data = data.filter(app => 
                app.applicantName.toLowerCase().includes(lowerSearch) || 
                app.citizenId.includes(lowerSearch) ||
                app.schemeName.toLowerCase().includes(lowerSearch)
            );
        }

        return data;
    } catch (error) {
        console.error("Error fetching applications:", error);
        return [];
    }
};

export const submitApplicationForFunds = async (application) => {
    try {
        // 1. Fetch Citizen Details (for Bank Info)
        const citizenRef = doc(db, 'citizens', application.citizenId);
        const citizenSnap = await getDoc(citizenRef);
        const citizenData = citizenSnap.exists() ? citizenSnap.data() : {};
        
        const bankDetails = citizenData.bank_details || {
            account_no: citizenData.bankAccountNo || 'N/A',
            ifsc: citizenData.ifscCode || 'N/A',
            bank_name: citizenData.bankName || 'N/A'
        };

        // 2. Create a request in 'fund_requests' collection
        const fundRequestRef = await addDoc(collection(db, 'fund_requests'), {
            schemeId: application.id, // Original scheme doc ID
            citizenAadhaar: application.citizenId,
            applicantName: application.applicantName,
            schemeName: application.schemeName,
            amount: application.cost,
            
            // Bank Details for Admin
            bankDetails: bankDetails,
            
            // Status tracking
            status: 'pending_approval', // Admin status
            submittedBy: 'Officer', 
            submittedAt: new Date().toISOString(),
            
            // Link back to original doc
            originalSchemeRef: `citizens/${application.citizenId}/schemes/${application.id}`
        });

        // 3. Update the original scheme document status
        const schemeRef = doc(db, 'citizens', application.citizenId, 'schemes', application.id);
        await updateDoc(schemeRef, { 
            status: 'Submitted for Funds',
            fundRequestId: fundRequestRef.id,
            submitted_to_admin: true,
            sent_to_admin: true
        });
        
        console.log(`[DEBUG] Fund request created with ID: ${fundRequestRef.id} including bank details.`);
        return { success: true };
    } catch (error) {
        console.error("Error submitting application:", error);
        return { success: false, error };
    }
};

// ADMIN APIs
export const getFundRequests = async (status = 'pending_approval') => {
    try {
        const q = query(
            collection(db, 'fund_requests'), 
            where('status', '==', status)
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            submittedAt: doc.data().submittedAt ? new Date(doc.data().submittedAt).toLocaleDateString() : 'Recent',
            disbursedAt: doc.data().disbursedAt ? new Date(doc.data().disbursedAt).toLocaleDateString() : '-'
        }));
    } catch (error) {
        console.error("Error fetching fund requests:", error);
        return [];
    }
};

export const releaseFundRequest = async (requestId, schemeId, citizenId) => {
    try {
        const batch = writeBatch(db);

        // 1. Update Fund Request
        const fundRef = doc(db, 'fund_requests', requestId);
        const txnId = 'TXN' + Math.floor(Math.random() * 10000000); // Generate TXN ID first
        
        batch.update(fundRef, {
            status: 'disbursed',
            disbursedAt: new Date().toISOString(),
            transactionId: txnId 
        });

        // 2. Update Scheme Status
        const schemeRef = doc(db, `citizens/${citizenId}/schemes/${schemeId}`);
        batch.update(schemeRef, {
            status: 'Funds Disbursed',
            paymentStatus: 'Completed',
            paymentDate: new Date().toISOString(),
            payment_sanctioned: true,
            payment_transferred: true
        });

        // 3. Create Notification for Citizen
        const notificationRef = doc(collection(db, `citizens/${citizenId}/notifications`));
        batch.set(notificationRef, {
            title: 'Funds Disbursed',
            message: `Your fund request for scheme ID: ${schemeId} has been successfully disbursed. Tracking ID: ${txnId}`,
            type: 'fund_disbursement',
            read: false,
            timestamp: new Date().toISOString(),
            schemeId: schemeId
        });

        await batch.commit();
        return { success: true };
    } catch (error) {
        console.error("Error releasing funds:", error);
        return { success: false, error };
    }
};

export const getCitizenDocuments = async (citizenId) => {
    try {
        const docsRef = collection(db, `citizens/${citizenId}/documents`);
        const querySnapshot = await getDocs(docsRef);
        
        if (querySnapshot.empty) {
            return [];
        }

        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            let n = data.name || data.fileName || data.type || doc.id;
            
            return {
                id: doc.id,
                name: n,
                url: data.document_url || '#',
                type: data.type || 'Document',
                uploadDate: data.created_at ? new Date(data.created_at.seconds * 1000).toLocaleDateString() : 'N/A'
            };
        });
    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
};

export const approveSchemeApplication = async (citizenId, schemeId) => {
    try {
        const schemeRef = doc(db, `citizens/${citizenId}/schemes/${schemeId}`);
        
        await updateDoc(schemeRef, {
            scheme_approved_by_officer: true,
            status: 'Approved', // Updates status to Approved
            approved_at: new Date().toISOString()
        });

        console.log(`[DEBUG] Scheme ${schemeId} approved for citizen ${citizenId}`);
        return { success: true };
    } catch (error) {
        console.error("Error approving scheme application:", error);
        return { success: false, error };
    }
};

// ... keep other exports if needed for other parts of the app to avoid breaking imports
export const updateDocumentStatus = async () => { return { success: true }; };
export const verifyAllDocuments = async () => { return { success: true }; };
export const approveApplication = async (id) => { return { success: true, id }; };
export const rejectApplication = async (id) => { return { success: true, id }; };
export const scheduleVisit = async (payload) => { return { success: true }; };

export const getKPIs = async () => {
    await delay(SIMULATED_DELAY);
    return kpiData;
};
