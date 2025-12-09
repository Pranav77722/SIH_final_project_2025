import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getFundRequests, releaseFundRequest } from '../../api/applications';
import GovtLayout from '../../components/layout/GovtLayout';
import { useAuth } from '../../hooks/useAuth';

export default function ReleaseFunds() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'history'
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, [activeTab]);

    const fetchRequests = async () => {
        setLoading(true);
        // Map tab to status: 'pending' -> 'pending_approval', 'history' -> 'disbursed'
        const status = activeTab === 'pending' ? 'pending_approval' : 'disbursed';
        const data = await getFundRequests(status);
        console.log(`Fetched ${data.length} requests for status: ${status}`);
        setRequests(data);
        setLoading(false);
    };

    const handleRelease = async (req) => {
        if (!window.confirm(`Release ₹${req.amount} to ${req.applicantName}? This action cannot be undone.`)) return;

        setProcessingId(req.id);
        const result = await releaseFundRequest(req.id, req.schemeId, req.citizenAadhaar);

        if (result.success) {
            // Remove from list or update status
            setRequests(prev => prev.filter(r => r.id !== req.id));
            alert(`Funds Disbursed Successfully! Transaction ID generated.`);
        } else {
            alert("Failed to release funds. Please try again.");
        }
        setProcessingId(null);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <GovtLayout
            userRole="admin"
            userName={user ? `${user.firstName || 'Admin'} ${user.lastName || ''}` : 'State Administrator'}
            userDesignation="Finance Controller"
            onLogout={() => navigate('/admin/login')}
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-govt-text flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-green-600 rounded-full"></span>
                            Fund Disbursement Console
                        </h1>
                        <p className="text-gray-600 mt-1 pl-4">Review pending requests and view payment history.</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={fetchRequests}
                            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            Refresh
                        </button>
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2"
                        >
                            &larr; Back to Dashboard
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`${activeTab === 'pending'
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Pending Requests
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`${activeTab === 'history'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                            Disbursement History
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        <p className="mt-4 text-gray-500">
                            {activeTab === 'pending' ? 'Fetching pending requests...' : 'Loading transaction history...'}
                        </p>
                    </div>
                ) : requests.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${activeTab === 'pending' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                            {activeTab === 'pending' ? (
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            ) : (
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">
                            {activeTab === 'pending' ? 'No Pending Requests' : 'No Payment History'}
                        </h3>
                        <p className="text-gray-500 mt-2 max-w-md mx-auto">
                            {activeTab === 'pending'
                                ? "Great job! All fund requests have been processed."
                                : "No funds have been disbursed yet."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        <AnimatePresence mode='popLayout'>
                            {requests.map((req, index) => (
                                <motion.div
                                    key={req.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-shadow ${activeTab === 'history' ? 'border-gray-200' : 'border-green-100'}`}
                                >
                                    <div className={`px-6 py-4 border-b flex justify-between items-center ${activeTab === 'history' ? 'bg-gray-50 border-gray-200' : 'bg-green-50/50 border-green-100'}`}>
                                        <span className="text-xs font-mono text-gray-500">REF: {req.id.slice(0, 8).toUpperCase()}</span>
                                        {activeTab === 'pending' ? (
                                            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">PENDING APPROVAL</span>
                                        ) : (
                                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                DISBURSED
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{req.applicantName}</h3>
                                                <p className="text-sm text-gray-500">{req.citizenAadhaar}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-green-700">{formatCurrency(req.amount)}</p>
                                                <p className="text-xs text-gray-500">Requested Amount</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Scheme:</span>
                                                <span className="font-medium text-gray-900 truncate max-w-[180px]" title={req.schemeName}>{req.schemeName}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Submitted By:</span>
                                                <span className="font-medium text-gray-900">{req.submittedBy}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Req. Date:</span>
                                                <span className="font-medium text-gray-900">{req.submittedAt}</span>
                                            </div>
                                            {activeTab === 'history' && (
                                                <div className="flex justify-between text-sm border-t border-dashed pt-2 mt-2">
                                                    <span className="text-gray-500">Paid On:</span>
                                                    <span className="font-bold text-gray-900">{req.disbursedAt}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bank Details Card */}
                                        <div className="bg-blue-50 rounded-lg p-3 mb-6 border border-blue-100">
                                            <p className="text-xs font-bold text-blue-800 mb-2 uppercase tracking-wide">Beneficiary Bank Details</p>
                                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                                                <div>
                                                    <span className="block text-blue-400 text-xs">Bank Name</span>
                                                    <span className="font-semibold text-blue-900">{req.bankDetails?.bank_name}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-blue-400 text-xs">IFSC Code</span>
                                                    <span className="font-mono font-semibold text-blue-900">{req.bankDetails?.ifsc}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action or Status Info */}
                                        {activeTab === 'pending' ? (
                                            <button
                                                onClick={() => handleRelease(req)}
                                                disabled={processingId === req.id}
                                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 rounded-lg shadow transition-all flex justify-center items-center gap-2"
                                            >
                                                {processingId === req.id ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                        Authorize Disbursement
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <div className="bg-gray-50 rounded border border-gray-200 p-2 text-center">
                                                <p className="text-xs text-gray-500">Transaction Reference ID</p>
                                                <p className="font-mono font-bold text-gray-800">{req.transactionId || 'TXN-PENDING'}</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </GovtLayout>
    );
}
