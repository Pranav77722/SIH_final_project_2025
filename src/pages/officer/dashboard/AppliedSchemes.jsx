import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getApplications, submitApplicationForFunds, getCitizenDocuments, approveSchemeApplication } from '../../../api/applications';
import GovtLayout from '../../../components/layout/GovtLayout';
import { useAuth } from '../../../hooks/useAuth';

const AppliedSchemes = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [selectedApp, setSelectedApp] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [citizenDocs, setCitizenDocs] = useState([]);
    const [docsLoading, setDocsLoading] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await getApplications();
            setApplications(data);
        } catch (error) {
            console.error("Failed to load applications", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        navigate('/officer/login');
    };

    // Open Modal and Fetch Docs
    const handleViewDocs = async (app) => {
        setSelectedApp(app);
        setShowModal(true);
        setDocsLoading(true);
        try {
            const docs = await getCitizenDocuments(app.citizenId);
            setCitizenDocs(docs);
        } catch (error) {
            console.error("Error fetching docs", error);
        } finally {
            setDocsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedApp(null);
        setCitizenDocs([]);
    };

    // Approve the Application Logic
    const handleApprove = async () => {
        if (!selectedApp) return;
        if (!window.confirm(`Are you sure you want to APPROVE ${selectedApp.schemeName} for ${selectedApp.applicantName}?`)) return;

        const result = await approveSchemeApplication(selectedApp.citizenId, selectedApp.id);
        if (result.success) {
            alert("Application Approved Successfully!");

            // Update local state
            setApplications(prev => prev.map(app =>
                app.id === selectedApp.id ? { ...app, approvedBy: 'Officer', status: 'Approved', steps: { ...app.steps, officerVerified: true } } : app
            ));

            handleCloseModal();
        } else {
            alert("Failed to approve application.");
        }
    };

    const handleSubmit = async (app) => {
        if (!window.confirm(`Submit ${app.schemeName} application for ${app.applicantName} (₹${app.cost}) to Admin?`)) return;

        const result = await submitApplicationForFunds(app);
        if (result.success) {
            alert("Application submitted successfully!");
            // Refresh local state to reflect change
            setApplications(prev => prev.map(item =>
                item.id === app.id ? { ...item, status: 'Submitted for Funds' } : item
            ));
        } else {
            alert("Failed to submit application.");
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const filteredApps = applications.filter(app =>
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.citizenId.includes(searchTerm) ||
        app.schemeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <GovtLayout
            userRole="officer"
            userName={user ? `${user.firstName || 'Officer'} ${user.lastName || ''}` : 'Officer'}
            userDesignation="Field Verifier"
            onLogout={handleLogout}
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-govt-text flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-govt-blue-dark rounded-full"></span>
                            Applied Schemes Registry
                        </h1>
                        <p className="text-gray-600 mt-1 pl-4">Review applications, verify documents, and submit for funds.</p>
                    </div>
                    <button
                        onClick={() => navigate('/officer/dashboard')}
                        className="self-start md:self-auto bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2"
                    >
                        &larr; Back to Dashboard
                    </button>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by Name, Aadhaar ID, or Scheme..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-govt-blue-dark focus:border-govt-blue-dark sm:text-sm transition duration-150 ease-in-out"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                                <tr>
                                    <th className="p-4 pl-6">Applicant Name</th>
                                    <th className="p-4">Aadhaar (ID)</th>
                                    <th className="p-4">Applied Scheme</th>
                                    <th className="p-4">Est. Cost</th>
                                    <th className="p-4">Application Progress</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="p-12 text-center">
                                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-govt-blue-dark"></div>
                                            <p className="mt-2 text-gray-500">Loading records...</p>
                                        </td>
                                    </tr>
                                ) : filteredApps.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="p-12 text-center text-gray-500">
                                            No records found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredApps.map((app, index) => (
                                        <motion.tr
                                            key={app.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.03 }}
                                            className="hover:bg-blue-50/50 transition-colors"
                                        >
                                            <td className="p-4 pl-6 font-semibold text-gray-900">
                                                {app.applicantName}
                                            </td>
                                            <td className="p-4 font-mono text-gray-600">
                                                {app.citizenId}
                                            </td>
                                            <td className="p-4">
                                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-200">
                                                    {app.schemeName}
                                                </span>
                                            </td>
                                            <td className="p-4 font-mono font-medium text-gray-700">
                                                {formatCurrency(app.cost)}
                                            </td>
                                            <td className="p-4 min-w-[250px]">
                                                {/* Progress Bar */}
                                                <div className="relative flex items-center justify-between w-full max-w-xs">
                                                    {/* Connecting Line */}
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-0"></div>

                                                    {/* Step 1: Submitted */}
                                                    <div className="relative z-10 flex flex-col items-center group">
                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${app.steps?.submitted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>
                                                            {app.steps?.submitted && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                                        </div>
                                                        <div className="absolute -bottom-6 text-[10px] font-medium text-gray-600 whitespace-nowrap">Submitted</div>
                                                    </div>

                                                    {/* Line Fill 1 */}
                                                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 transition-all duration-500 -z-0 ${app.steps?.digiVerified ? 'bg-green-500 w-1/2' : 'bg-green-500 w-0'}`}></div>

                                                    {/* Step 2: DigiVerified */}
                                                    <div className="relative z-10 flex flex-col items-center group">
                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${app.steps?.digiVerified ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>
                                                            {app.steps?.digiVerified && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                                        </div>
                                                        <div className="absolute -bottom-6 text-[10px] font-medium text-gray-600 whitespace-nowrap">DigiVerified</div>
                                                    </div>

                                                    {/* Line Fill 2 */}
                                                    <div className={`absolute left-1/2 top-1/2 -translate-y-1/2 h-1 transition-all duration-500 -z-0 ${app.steps?.officerVerified ? 'bg-green-500 w-1/2' : 'bg-green-500 w-0'}`}></div>

                                                    {/* Step 3: Officer Verified */}
                                                    <div className="relative z-10 flex flex-col items-center group">
                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${app.steps?.officerVerified ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300'}`}>
                                                            {app.steps?.officerVerified && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                                        </div>
                                                        <div className="absolute -bottom-6 text-[10px] font-medium text-gray-600 whitespace-nowrap">Officer Verified</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-600">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${app.status === 'Submitted for Funds' ? 'bg-blue-100 text-blue-800' :
                                                    app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="p-4 flex flex-col gap-2">
                                                {/* Submit Button */}
                                                {app.steps?.officerVerified && app.status !== 'Submitted for Funds' && app.status !== 'Funds Disbursed' ? (
                                                    <button
                                                        onClick={() => handleSubmit(app)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded shadow-sm transition-colors flex items-center justify-center gap-1 w-full"
                                                    >
                                                        Submit Funds
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                                    </button>
                                                ) : app.status === 'Submitted for Funds' ? (
                                                    <span className="text-blue-600 font-bold text-xs flex items-center gap-1 w-full justify-center">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                        Funds Submitted
                                                    </span>
                                                ) : null}

                                                {/* View Docs Button - Always show if not fully done, or if you want review capability */}
                                                <button
                                                    onClick={() => handleViewDocs(app)}
                                                    className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold px-3 py-2 rounded shadow-sm transition-colors flex items-center justify-center gap-1 w-full"
                                                >
                                                    View & Verify
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-500 flex justify-between">
                        <span>Showing {filteredApps.length} records</span>
                        <span>Generated from System Registry</span>
                    </div>
                </div>
            </div>

            {/* Document Verification Modal */}
            <AnimatePresence>
                {showModal && selectedApp && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Document Verification</h2>
                                    <p className="text-sm text-gray-600">Review documents for <span className="font-semibold text-gray-800">{selectedApp.applicantName}</span> - {selectedApp.schemeName}</p>
                                </div>
                                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                                {docsLoading ? (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-govt-blue-dark"></div>
                                        <p className="mt-4 text-gray-500">Fetching documents...</p>
                                    </div>
                                ) : citizenDocs.length === 0 ? (
                                    <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                                        <p className="text-gray-500">No documents found for this applicant.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {citizenDocs.map((doc, idx) => (
                                            <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-blue-50 p-2 rounded text-blue-600">
                                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 truncate max-w-[150px]" title={doc.name}>{doc.name}</p>
                                                            <p className="text-xs text-gray-500 uppercase">{doc.type}</p>
                                                        </div>
                                                    </div>
                                                    <a
                                                        href={doc.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-700 text-xs font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors"
                                                    >
                                                        View
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-3">
                                <button
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                {!selectedApp.steps?.officerVerified && (
                                    <button
                                        onClick={handleApprove}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-bold shadow-sm transition-colors flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        Approve & Verify Scheme
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </GovtLayout>
    );
};

export default AppliedSchemes;
