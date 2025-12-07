import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePFMSStore } from '../store/pfmsStore.jsx';
import { pfmsApi } from '../services/pfmsApi';
import Button from '../../components/Button';
import { formatCurrency, formatDate, formatStatus } from '../utils/formatters';

const BatchDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state, dispatch } = usePFMSStore();
    const [batch, setBatch] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBatch = async () => {
            let found = state.batches.find(b => b.id === id);
            if (!found) {
                try {
                    found = await pfmsApi.getBatchById(id);
                } catch (err) {
                    console.error(err);
                }
            }
            setBatch(found);
            setLoading(false);
        };
        fetchBatch();
    }, [id, state.batches]);

    const handleAction = async (action) => {
        setLoading(true);
        try {
            let updatedBatch;
            if (action === 'validate') {
                await pfmsApi.validateBatch(id);
                updatedBatch = { ...batch, status: 'VALIDATED' };
            } else if (action === 'approve1') {
                updatedBatch = await pfmsApi.approveBatch(id, 1);
            } else if (action === 'approve2') {
                updatedBatch = await pfmsApi.approveBatch(id, 2);
            } else if (action === 'submit') {
                await pfmsApi.submitBatch(id);
                updatedBatch = { ...batch, status: 'SUBMITTED' };
            }

            dispatch({ type: 'UPDATE_BATCH', payload: updatedBatch });
            setBatch(updatedBatch);
        } catch (error) {
            console.error("Action failed", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center text-gray-500">Loading...</div>;
    if (!batch) return <div className="p-12 text-center text-red-500">Batch not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigate('/pfms')} className="text-gray-500 hover:text-gray-800">
                            ← Back
                        </button>
                        <h1 className="text-lg font-semibold text-gray-800">{batch.name} <span className="text-gray-400 font-normal">/ {batch.id}</span></h1>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${batch.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                            batch.status === 'SUBMITTED' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                        }`}>
                        {formatStatus(batch.status)}
                    </span>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <h3 className="text-base font-semibold text-gray-800 mb-4">Batch Summary</h3>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(batch.totalAmount)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Beneficiaries</p>
                                    <p className="text-xl font-bold text-gray-900 mt-1">{batch.beneficiaries?.length || 0}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Created On</p>
                                    <p className="text-lg font-medium text-gray-900 mt-1">{formatDate(batch.createdAt)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                <h3 className="text-sm font-semibold text-gray-700">Beneficiary List</h3>
                            </div>
                            <table className="min-w-full text-sm">
                                <thead className="bg-white border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-medium text-gray-500">Name</th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-500">Account</th>
                                        <th className="px-6 py-3 text-right font-medium text-gray-500">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {batch.beneficiaries?.map((b, i) => (
                                        <tr key={i}>
                                            <td className="px-6 py-3 text-gray-900">{b.name}</td>
                                            <td className="px-6 py-3 text-gray-600 font-mono">{b.accountNumber}</td>
                                            <td className="px-6 py-3 text-right font-medium text-gray-900">{formatCurrency(b.amount)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Column: Actions */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <h3 className="text-base font-semibold text-gray-800 mb-4">Actions</h3>
                            <div className="space-y-3">
                                {batch.status === 'DRAFT' && (
                                    <Button className="w-full justify-center" onClick={() => handleAction('validate')}>
                                        Validate Batch
                                    </Button>
                                )}
                                {batch.status === 'VALIDATED' && (
                                    <Button className="w-full justify-center" onClick={() => handleAction('approve1')}>
                                        Approve (Level 1)
                                    </Button>
                                )}
                                {batch.status === 'PENDING_APPROVAL_2' && (
                                    <Button className="w-full justify-center" onClick={() => handleAction('approve2')}>
                                        Approve (Level 2)
                                    </Button>
                                )}
                                {batch.status === 'APPROVED' && (
                                    <Button className="w-full justify-center" onClick={() => handleAction('submit')}>
                                        Submit to PFMS
                                    </Button>
                                )}
                                {['SUBMITTED', 'PROCESSED'].includes(batch.status) && (
                                    <div className="text-center p-3 bg-green-50 rounded text-green-700 text-sm font-medium">
                                        Batch Submitted Successfully
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <h3 className="text-base font-semibold text-gray-800 mb-4">Audit Trail</h3>
                            <div className="space-y-4">
                                {batch.auditTrail?.map((log, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="mt-1.5 w-2 h-2 rounded-full bg-gray-300 flex-shrink-0"></div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{log.action.replace(/_/g, ' ')}</p>
                                            <p className="text-xs text-gray-500">{formatDate(log.timestamp)} • {log.user}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default BatchDetails;
