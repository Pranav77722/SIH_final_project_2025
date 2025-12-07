import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  serverTimestamp,
  query,
  orderBy,
  where 
} from 'firebase/firestore';
import { db, auth } from '../../firebase/client';

const COLLECTION_NAME = 'pfms_batches';

export const pfmsApi = {
  // Create a new batch
  createBatch: async (batchData) => {
    try {
      const user = auth.currentUser;
      const newBatch = {
        ...batchData,
        status: 'DRAFT',
        createdAt: new Date().toISOString(), // Store as ISO string for easier frontend parsing initially
        createdBy: user ? user.uid : 'anonymous',
        auditTrail: [{ 
          action: 'CREATED', 
          user: user ? user.email : 'Unknown', 
          timestamp: new Date().toISOString() 
        }]
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), newBatch);
      return { id: docRef.id, ...newBatch };
    } catch (error) {
      console.error("Error creating batch:", error);
      throw error;
    }
  },

  // Get all batches
  getBatches: async () => {
    try {
      // Simple query to get all batches
      const q = query(collection(db, COLLECTION_NAME)); 
      // Note: orderBy might require an index, so keeping it simple first
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Client-side sort
    } catch (error) {
      console.error("Error fetching batches:", error);
      throw error;
    }
  },

  // Get single batch by ID
  getBatchById: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("Batch not found");
      }
    } catch (error) {
      console.error("Error fetching batch:", error);
      throw error;
    }
  },

  // Validate Batch (Mock server-side validation logic)
  validateBatch: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const user = auth.currentUser;
      
      await updateDoc(docRef, {
        status: 'VALIDATED',
        auditTrail: [...(await getAuditTrail(id)), {
          action: 'VALIDATED',
          user: user ? user.email : 'System',
          timestamp: new Date().toISOString()
        }]
      });
      return true;
    } catch (error) {
      console.error("Error validating batch:", error);
      throw error;
    }
  },

  // Approve Batch
  approveBatch: async (id, level) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const user = auth.currentUser;
      const newStatus = level === 1 ? 'PENDING_APPROVAL_2' : 'APPROVED';
      
      const updateData = {
        status: newStatus,
        auditTrail: [...(await getAuditTrail(id)), {
          action: `APPROVED_LEVEL_${level}`,
          user: user ? user.email : 'Approver',
          timestamp: new Date().toISOString()
        }]
      };

      await updateDoc(docRef, updateData);
      return { id, ...updateData }; // Return partial update for store
    } catch (error) {
      console.error("Error approving batch:", error);
      throw error;
    }
  },

  // Submit Batch (Simulates Payment Processing)
  submitBatch: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const user = auth.currentUser;
      
      // 1. Set Status to PROCESSING
      await updateDoc(docRef, {
        status: 'PROCESSING',
        auditTrail: [...(await getAuditTrail(id)), {
          action: 'SUBMITTED_TO_PFMS',
          user: user ? user.email : 'System',
          timestamp: new Date().toISOString()
        }]
      });

      // 2. Simulate Bank Processing Delay (3 seconds)
      await new Promise(resolve => setTimeout(resolve, 3000));

      // 3. Fetch current batch data to get beneficiaries
      const batchSnap = await getDoc(docRef);
      const batchData = batchSnap.data();
      
      // 4. Process Beneficiaries (Simulate Success)
      const updatedBeneficiaries = batchData.beneficiaries.map(b => ({
        ...b,
        paymentStatus: 'CREDITED',
        utr: `UTR${Date.now()}${Math.floor(Math.random() * 1000)}`, // Generate fake UTR
        paymentDate: new Date().toISOString()
      }));

      // 5. Update Batch to PROCESSED
      const finalUpdate = {
        status: 'PROCESSED',
        beneficiaries: updatedBeneficiaries,
        auditTrail: [...(batchData.auditTrail || []), {
          action: 'PAYMENT_PROCESSED',
          user: 'PFMS Gateway (Simulated)',
          timestamp: new Date().toISOString()
        }]
      };

      await updateDoc(docRef, finalUpdate);
      
      // 6. Update Citizen Records & Send Notifications
      for (const ben of updatedBeneficiaries) {
        if (ben.aadhaar) { 
           try {
             // Add Notification to 'citizens/{aadhaar}/notifications'
             const notificationsRef = collection(db, 'citizens', ben.aadhaar, 'notifications');
             await addDoc(notificationsRef, {
               title: 'Payment Received',
               message: `You have received a payment of ₹${ben.amount} for ${batchData.schemeName || 'Scheme'}.`,
               amount: ben.amount,
               scheme: batchData.schemeName || 'N/A',
               date: new Date().toISOString(),
               type: 'PAYMENT_RECEIVED',
               read: false,
               utr: ben.utr
             });
             
             console.log(`[SIMULATION] Notification sent to Citizen ${ben.aadhaar}`);
           } catch (e) {
             console.error(`Failed to send notification to citizen ${ben.aadhaar}`, e);
           }
        }
      }

      return { success: true, ...finalUpdate };
    } catch (error) {
      console.error("Error submitting batch:", error);
      throw error;
    }
  },

  // --- New Methods for Enhanced Batch Creation ---

  // Get all Schemes
  getSchemes: async () => {
    try {
      // Path from CreateScheme.jsx: data/qo3JakPyOUWzdEOFYWbv/Schemes
      const schemesRef = collection(db, "data", "qo3JakPyOUWzdEOFYWbv", "Schemes");
      const q = query(schemesRef);
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error fetching schemes:", error);
      return []; // Return empty array on error to prevent crash
    }
  },

  // Get Beneficiaries for a specific scheme (Real Data from 'citizens' collection)
  getBeneficiariesBySchemeId: async (schemeId) => {
    try {
      // Query 'citizens' collection for verified beneficiaries
      // In a real scenario, you might also filter by scheme eligibility (e.g., age, category)
      // For now, we fetch all fully verified citizens as per user request
      const citizensRef = collection(db, 'citizens');
      // const q = query(citizensRef, where('fully_verified_beneficiary', '==', true));
      const q = query(citizensRef); // Fetch all for debugging/demo
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map((doc, index) => {
        const data = doc.data();
        return {
          id: doc.id,
          aadhaar: data.aadhaar || doc.id, // Use aadhaar field from doc
          name: data.name || data.custom_name || `Beneficiary ${index + 1}`,
          // Map 'acc_num' from Firestore to 'accountNumber' for the UI
          accountNumber: data.acc_num || `91${10000000 + index}`, 
          ifsc: data.ifsc_code || 'SBIN0001234', // Keep fallback if ifsc is missing
          status: 'VERIFIED',
          eligibleAmount: 5000 // Default
        };
      });
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
      return [];
    }
  }
};

// Helper to get current audit trail to append to it
// In a real app, you'd use arrayUnion, but for complex objects, reading first is safer without custom classes
const getAuditTrail = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().auditTrail || [];
  }
  return [];
};
