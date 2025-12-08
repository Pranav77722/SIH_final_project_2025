import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getApplications, approveApplication, rejectApplication, getCitizenDocuments, updateDocumentStatus } from '../../../api/applications';
import GovtLayout from '../../../components/layout/GovtLayout';
import { useAuth } from '../../../hooks/useAuth';

const DocumentVerification = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [modalType, setModalType] = useState(null); // 'approve' | 'reject' | 'check'
    const [discrepancy, setDiscrepancy] = useState('');
    const [documents, setDocuments] = useState([]);
    const [loadingDocs, setLoadingDocs] = useState(false);
    const [previewDoc, setPreviewDoc] = useState(null);

    // State for document rejection
    const [rejectingDocId, setRejectingDocId] = useState(null);
    const [docRejectionReason, setDocRejectionReason] = useState('');

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = () => {
        getApplications({ status: 'pending' }).then(setApplications);
    };

    const handleAction = async (app, type) => {
        setSelectedApp(app);
        setModalType(type);
        setDiscrepancy('');

        if (type === 'check') {
            setLoadingDocs(true);
            const docs = await getCitizenDocuments(app.id);
            setDocuments(docs);
            setLoadingDocs(false);
        }
    };

    const handleCloseModal = () => {
        setModalType(null);
        setSelectedApp(null);
        setDiscrepancy('');
        setDocuments([]);
        setPreviewDoc(null);
        setRejectingDocId(null);
        setDocRejectionReason('');
    };

    const handleApprove = async () => {
        if (!selectedApp) return;
        await approveApplication(selectedApp.id, {});
        alert(t('messages.approved_success'));
        handleCloseModal();
        loadApplications();
    };

    const handleReject = async () => {
        if (!selectedApp || !discrepancy.trim()) {
            alert('Please enter the discrepancy found');
            return;
        }
        await rejectApplication(selectedApp.id, { reason: discrepancy });
        alert(t('messages.rejected_success'));
        handleCloseModal();
        loadApplications();
    };

    const handleDocumentAction = async (docId, status, reason = '') => {
        if (!selectedApp) return;

        const success = await updateDocumentStatus(selectedApp.id, docId, status, reason);
        if (success) {
            // Update local state
            setDocuments(prevDocs => prevDocs.map(doc =>
                doc.id === docId
                    ? { ...doc, status: status, rejectionReason: reason }
                    : doc
            ));

            if (status === 'rejected') {
                setRejectingDocId(null);
                setDocRejectionReason('');
            }
        } else {
            alert('Failed to update document status');
        }
    };

    const handleLogout = () => {
        navigate('/officer/login');
    };

    return (
        <GovtLayout
            userRole="officer"
            userName={user ? `${user.firstName || 'Officer'} ${user.lastName || ''}` : 'Officer'}
            userDesignation="Field Verifier"
            onLogout={handleLogout}
        >
            <div className="space-y-6">
                {/* Header & Breadcrumb */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-govt-text flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-govt-blue-dark rounded-full"></span>
                            {t('actions.verify_docs')}
                        </h1>
                        <p className="text-gray-600 mt-1 pl-4">Review pending citizen applications and verify uploaded proofs.</p>
                    </div>
                    <button
                        onClick={() => navigate('/officer/dashboard')}
                        className="self-start md:self-auto bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2"
                    >
                        &larr; Back to Dashboard
                    </button>
                </div>

                {/* Applications Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-bold text-govt-text">Pending Queue</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">{applications.length} Applications</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                                <tr>
                                    <th className="p-4 pl-6">Application ID</th>
                                    <th className="p-4">Applicant</th>
                                    <th className="p-4">Scheme Type</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Location</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <AnimatePresence>
                                    {applications.map((app, index) => (
                                        <motion.tr
                                            key={app.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-blue-50/50 transition-colors"
                                        >
                                            <td className="p-4 pl-6 font-mono text-gray-600">#{app.id.substring(0, 8)}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-govt-blue-light/10 text-govt-blue-dark flex items-center justify-center font-bold text-xs">
                                                        {app.applicantName.charAt(0)}
                                                    </div>
                                                    <span className="font-semibold text-gray-900">{app.applicantName}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {app.type}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-500">{app.submissionDate}</td>
                                            <td className="p-4 text-gray-500">{app.location}</td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleAction(app, 'check')}
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded border border-transparent hover:border-blue-200 transition-all text-xs font-semibold flex items-center gap-1"
                                                        title="View Documents"
                                                    >
                                                        Review
                                                    </button>
                                                    <div className="h-4 w-[1px] bg-gray-300 mx-1"></div>
                                                    <button
                                                        onClick={() => handleAction(app, 'approve')}
                                                        className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                                                        title="Approve"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(app, 'reject')}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                        title="Reject"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                                {applications.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="p-12 text-center text-gray-500">
                                            <p className="text-lg">No pending applications</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {/* Approve Confirmation Modal */}
                {modalType === 'approve' && selectedApp && (
                    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
                                onClick={handleCloseModal}
                            ></motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                            >
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Approve Application</h3>
                                            <div className="mt-2 text-sm text-gray-500">
                                                <p>Are you sure you want to approve the application for <strong>{selectedApp.applicantName}</strong>?</p>
                                                <p className="mt-2 text-green-700 bg-green-50 p-2 rounded border border-green-100">
                                                    This will authorize the release of benefits.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                        onClick={handleApprove}
                                    >
                                        Authorize & Approve
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={handleCloseModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}

                {/* Reject Modal */}
                {modalType === 'reject' && selectedApp && (
                    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
                                onClick={handleCloseModal}
                            ></motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                            >
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Reject Application</h3>
                                            <div className="mt-2 w-full">
                                                <p className="text-sm text-gray-500 mb-2">Please specify the reason for rejection (required).</p>
                                                <textarea
                                                    className="w-full text-sm p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                                                    rows="4"
                                                    placeholder="Enter discrepancy details..."
                                                    value={discrepancy}
                                                    onChange={(e) => setDiscrepancy(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={handleReject}
                                    >
                                        Reject Application
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={handleCloseModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}

                {/* Check Documents Modal */}
                {modalType === 'check' && selectedApp && (
                    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm transition-opacity"
                                onClick={handleCloseModal}
                            ></motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative transform overflow-hidden rounded-xl bg-gray-50 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-5xl flex flex-col max-h-[90vh]"
                            >
                                <div className="bg-white px-4 py-3 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
                                    <div>
                                        <h3 className="text-lg font-bold text-govt-text">Digital Document Verification</h3>
                                        <p className="text-sm text-gray-500">Applicant: <strong>{selectedApp.applicantName}</strong></p>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-gray-400 hover:text-gray-600"
                                        onClick={handleCloseModal}
                                    >
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="p-6 overflow-y-auto bg-gray-50">
                                    {loadingDocs ? (
                                        <div className="flex justify-center p-12">
                                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-govt-blue-dark"></div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-4">
                                            {documents.map((doc, index) => (
                                                <div key={doc.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded flex items-center justify-center ${doc.status === 'rejected' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800 capitalize">{doc.name.replace(/_/g, ' ')}</p>
                                                            <div className="flex gap-2 text-xs mt-1">
                                                                <span className="text-gray-500">{doc.uploadDate}</span>
                                                                {doc.status === 'verified' && <span className="text-green-600 font-bold flex items-center gap-1"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Verified</span>}
                                                                {doc.status === 'rejected' && <span className="text-red-600 font-bold">Rejected</span>}
                                                            </div>
                                                            {doc.status === 'rejected' && <p className="text-xs text-red-500 mt-1">Note: {doc.rejectionReason}</p>}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                                                        <button
                                                            onClick={() => setPreviewDoc(doc)}
                                                            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded font-medium transition-colors"
                                                        >
                                                            Preview
                                                        </button>
                                                        <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>
                                                        {rejectingDocId === doc.id ? (
                                                            <div className="flex gap-1 animate-fadeIn">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Reason..."
                                                                    className="text-sm px-2 py-1 border rounded w-32"
                                                                    value={docRejectionReason}
                                                                    onChange={(e) => setDocRejectionReason(e.target.value)}
                                                                />
                                                                <button onClick={() => handleDocumentAction(doc.id, 'rejected', docRejectionReason)} className="bg-red-600 text-white px-2 rounded text-sm">Save</button>
                                                                <button onClick={() => setRejectingDocId(null)} className="text-gray-500 px-1">&times;</button>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <button onClick={() => handleDocumentAction(doc.id, 'verified')} className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Mark Valid">
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                                </button>
                                                                <button onClick={() => setRejectingDocId(doc.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Mark Invalid">
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            {documents.length === 0 && <p className="text-center text-gray-500 py-8">No documents uploaded yet.</p>}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}


                {/* Full Screen Document Preview */}
                {previewDoc && (
                    <div className="fixed inset-0 z-[60] overflow-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" onClick={() => setPreviewDoc(null)}></div>

                        <div className="absolute inset-4 md:inset-10 flex flex-col bg-[#222] rounded-lg shadow-2xl overflow-hidden">
                            {/* Preview Header */}
                            <div className="h-14 bg-[#111] flex justify-between items-center px-6 border-b border-gray-800">
                                <h3 className="text-gray-200 font-mono text-sm truncate">{previewDoc.name}</h3>
                                <div className="flex items-center gap-4">
                                    <a href={previewDoc.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                                        Download
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    </a>
                                    <button onClick={() => setPreviewDoc(null)} className="text-gray-400 hover:text-white">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            </div>

                            {/* Preview Content */}
                            <div className="flex-1 bg-[#333] relative flex items-center justify-center p-0">
                                {['jpg', 'jpeg', 'png', 'gif', 'webp'].some(ext => previewDoc.url.toLowerCase().endsWith(ext) || previewDoc.url.toLowerCase().includes('image')) ? (
                                    <img
                                        src={previewDoc.url}
                                        alt="Preview"
                                        className="max-w-full max-h-full object-contain"
                                    />
                                ) : (
                                    /* Use Google Docs Viewer for everything else (PDFs, Docs, etc.) */
                                    <iframe
                                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(previewDoc.url)}&embedded=true`}
                                        className="w-full h-full border-0"
                                        title="Document Viewer"
                                    ></iframe>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </GovtLayout>
    );
};

export default DocumentVerification;
