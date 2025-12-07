import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePFMSStore } from '../store/pfmsStore.jsx';
import { pfmsApi } from '../services/pfmsApi';
import Button from '../../components/Button';
import { formatCurrency, formatDate, formatStatus } from '../utils/formatters';
import { motion } from 'framer-motion';

const PFMSDashboard = () => {
    const navigate = useNavigate();
    const { state, dispatch } = usePFMSStore();
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        const fetchBatches = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const data = await pfmsApi.getBatches();
                dispatch({ type: 'SET_BATCHES', payload: data });
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            }
        };
        fetchBatches();
    }, [dispatch]);

    const filteredBatches = state.batches.filter(b => {
        if (filter === 'ALL') return true;
        if (filter === 'PENDING') return ['VALIDATED', 'PENDING_APPROVAL_1', 'PENDING_APPROVAL_2'].includes(b.status);
        if (filter === 'PROCESSED') return ['PROCESSING', 'PROCESSED'].includes(b.status);
        return b.status === filter;
    });

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-12">
            {/* Header - Govt Blue Theme */}
            <div className="bg-govt-blue-dark shadow-md sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-white/10 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white leading-tight">PFMS Disbursement</h1>
                            <p className="text-xs text-blue-200 font-medium">Direct Benefit Transfer Management</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/pfms/create')}
                        className="bg-white text-govt-blue-dark hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        New Batch
                    </button>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Total Disbursed</p>
                                <p className="text-3xl font-bold text-govt-blue-dark mt-2">₹12,50,000</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-full">
                                <svg className="w-8 h-8 text-govt-blue-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-xs text-gray-500">
                            <span className="text-green-600 font-bold flex items-center mr-1">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                +12%
                            </span>
                            from last month
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Pending Approval</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">3 Batches</p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-full">
                                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-orange-600 font-medium">
                            Requires action today
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Failed Transactions</p>
                                <p className="text-3xl font-bold text-red-600 mt-2">12</p>
                            </div>
                            <div className="p-3 bg-red-50 rounded-full">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            </div>
                        </div>
                        <div className="mt-4 text-xs text-gray-500">
                            Check error logs for details
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Tabs */}
                    <div className="border-b border-gray-200 px-6 py-4 flex space-x-6 overflow-x-auto bg-gray-50/50">
                        {['ALL', 'DRAFT', 'PENDING', 'APPROVED', 'SUBMITTED', 'PROCESSED'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`pb-2 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${filter === status
                                    ? 'border-govt-blue-dark text-govt-blue-dark'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {status === 'ALL' ? 'All Batches' :
                                    status === 'PENDING' ? 'Pending Approval' :
                                        formatStatus(status)}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Batch ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {state.loading ? (
                                    <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500">Loading data...</td></tr>
                                ) : filteredBatches.length === 0 ? (
                                    <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500">No batches found.</td></tr>
                                ) : (
                                    filteredBatches.map((batch) => (
                                        <tr key={batch.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-govt-blue-dark">{batch.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{batch.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(batch.createdAt)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{formatCurrency(batch.totalAmount)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-0.5 inline-flex text-xs font-bold rounded-full border ${batch.status === 'APPROVED' || batch.status === 'PROCESSED' ? 'bg-green-100 text-green-800 border-green-200' :
                                                        batch.status === 'FAILED' ? 'bg-red-100 text-red-800 border-red-200' :
                                                            batch.status === 'SUBMITTED' || batch.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                                                'bg-yellow-100 text-yellow-800 border-yellow-200'
                                                    }`}>
                                                    {formatStatus(batch.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => navigate(`/pfms/batch/${batch.id}`)}
                                                    className="text-govt-blue-light hover:text-govt-blue-dark font-semibold hover:underline"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PFMSDashboard;
