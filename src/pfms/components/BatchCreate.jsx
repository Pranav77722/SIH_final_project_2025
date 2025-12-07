import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePFMSStore } from '../store/pfmsStore.jsx';
import { pfmsApi } from '../services/pfmsApi';
import Button from '../../components/Button';
import { validateBatchData } from '../utils/validators';
import { formatCurrency } from '../utils/formatters';

const BatchCreate = () => {
    const navigate = useNavigate();
    const { dispatch } = usePFMSStore();

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        schemeId: '',
        schemeName: '',
        beneficiaries: []
    });

    // UI State
    const [schemes, setSchemes] = useState([]);
    const [availableBeneficiaries, setAvailableBeneficiaries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingSchemes, setFetchingSchemes] = useState(true);
    const [fetchingBeneficiaries, setFetchingBeneficiaries] = useState(false);

    // Fetch Schemes on Load
    useEffect(() => {
        const loadSchemes = async () => {
            const data = await pfmsApi.getSchemes();
            setSchemes(data);
            setFetchingSchemes(false);
        };
        loadSchemes();
    }, []);

    // Handle Scheme Selection
    const handleSchemeChange = async (e) => {
        const schemeId = e.target.value;
        const scheme = schemes.find(s => s.id === schemeId);

        setFormData(prev => ({
            ...prev,
            schemeId: schemeId,
            schemeName: scheme ? scheme.title : '',
            beneficiaries: [] // Clear beneficiaries when scheme changes
        }));

        if (schemeId) {
            setFetchingBeneficiaries(true);
            try {
                const bens = await pfmsApi.getBeneficiariesBySchemeId(schemeId);
                setAvailableBeneficiaries(bens);
            } catch (error) {
                console.error("Failed to fetch beneficiaries", error);
            } finally {
                setFetchingBeneficiaries(false);
            }
        } else {
            setAvailableBeneficiaries([]);
        }
    };

    // Add Beneficiary to Batch
    const addBeneficiary = (ben) => {
        // Check if already added
        if (formData.beneficiaries.find(b => b.id === ben.id)) return;

        setFormData(prev => ({
            ...prev,
            beneficiaries: [...prev.beneficiaries, { ...ben, amount: ben.eligibleAmount }]
        }));
    };

    // Remove Beneficiary from Batch
    const removeBeneficiary = (id) => {
        setFormData(prev => ({
            ...prev,
            beneficiaries: prev.beneficiaries.filter(b => b.id !== id)
        }));
    };

    // Update Amount for a Beneficiary
    const updateAmount = (id, amount) => {
        setFormData(prev => ({
            ...prev,
            beneficiaries: prev.beneficiaries.map(b =>
                b.id === id ? { ...b, amount: Number(amount) } : b
            )
        }));
    };

    const handleSave = async () => {
        const { errors } = validateBatchData(formData);
        if (errors.length > 0) {
            alert(`Validation Failed:\n${errors.join('\n')}`);
            return;
        }

        setLoading(true);
        try {
            const newBatch = await pfmsApi.createBatch({
                ...formData,
                totalAmount: formData.beneficiaries.reduce((sum, b) => sum + b.amount, 0)
            });
            dispatch({ type: 'ADD_BATCH', payload: newBatch });
            navigate('/pfms');
        } catch (error) {
            console.error("Failed to create batch", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-12">
            {/* Header */}
            <div className="bg-govt-blue-dark shadow-md sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigate('/pfms')} className="text-blue-100 hover:text-white transition-colors flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Back
                        </button>
                        <h1 className="text-lg font-bold text-white">Create Disbursement Batch</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs text-blue-200 uppercase tracking-wide">Total Disbursement</p>
                            <p className="text-lg font-bold text-white leading-none">
                                {formatCurrency(formData.beneficiaries.reduce((sum, b) => sum + b.amount, 0))}
                            </p>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={loading || formData.beneficiaries.length === 0}
                            className="bg-white text-govt-blue-dark hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : 'Create Batch'}
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Configuration */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <h3 className="text-lg font-bold text-govt-text mb-4">Batch Details</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Batch Name</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-govt-blue-light focus:ring-govt-blue-light p-2.5 border"
                                    placeholder="e.g., Jan 2025 Disbursement"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Select Scheme</label>
                                <select
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-govt-blue-light focus:ring-govt-blue-light p-2.5 border"
                                    value={formData.schemeId}
                                    onChange={handleSchemeChange}
                                    disabled={fetchingSchemes}
                                >
                                    <option value="">-- Select a Scheme --</option>
                                    {schemes.map(scheme => (
                                        <option key={scheme.id} value={scheme.id}>
                                            {scheme.title} ({scheme.scheme_id || 'No ID'})
                                        </option>
                                    ))}
                                </select>
                                {fetchingSchemes && <p className="text-xs text-gray-500 mt-1">Loading schemes...</p>}
                            </div>
                        </div>
                    </div>

                    {/* Available Beneficiaries List */}
                    {formData.schemeId && (
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
                            <div className="p-4 border-b border-gray-200 bg-gray-50">
                                <h3 className="text-sm font-bold text-gray-800">Available Beneficiaries</h3>
                                <p className="text-xs text-gray-500">Select to add to batch</p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                                {fetchingBeneficiaries ? (
                                    <div className="flex justify-center items-center h-full text-gray-500 text-sm">Loading...</div>
                                ) : availableBeneficiaries.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500 text-sm">No beneficiaries found.</div>
                                ) : (
                                    availableBeneficiaries.map(ben => {
                                        const isAdded = formData.beneficiaries.some(b => b.id === ben.id);
                                        return (
                                            <div
                                                key={ben.id}
                                                onClick={() => !isAdded && addBeneficiary(ben)}
                                                className={`p-3 rounded-lg border cursor-pointer transition-all ${isAdded
                                                    ? 'bg-blue-50 border-blue-200 opacity-50 cursor-default'
                                                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">{ben.name}</p>
                                                        <p className="text-xs text-gray-500">{ben.accountNumber}</p>
                                                    </div>
                                                    {isAdded ? (
                                                        <span className="text-xs font-bold text-blue-600">Added</span>
                                                    ) : (
                                                        <span className="text-xs font-bold text-gray-400">+ Add</span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Selected Beneficiaries (The Batch) */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                            <div>
                                <h3 className="text-lg font-bold text-govt-text">Batch Beneficiaries</h3>
                                <p className="text-sm text-gray-500">{formData.beneficiaries.length} selected</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase">Total</p>
                                <p className="text-xl font-bold text-govt-blue-dark">
                                    {formatCurrency(formData.beneficiaries.reduce((sum, b) => sum + b.amount, 0))}
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Account</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount (₹)</th>
                                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {formData.beneficiaries.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-20 text-center">
                                                <div className="flex flex-col items-center justify-center text-gray-400">
                                                    <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                                    <p className="text-base font-medium">No beneficiaries added yet</p>
                                                    <p className="text-sm mt-1">Select a scheme and add beneficiaries from the list</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        formData.beneficiaries.map((b) => (
                                            <tr key={b.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{b.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <p className="text-sm text-gray-600 font-mono">{b.accountNumber}</p>
                                                    <p className="text-xs text-gray-400">{b.ifsc}</p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="number"
                                                        value={b.amount}
                                                        onChange={(e) => updateAmount(b.id, e.target.value)}
                                                        className="w-32 rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm font-bold text-right"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <button
                                                        onClick={() => removeBeneficiary(b.id)}
                                                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default BatchCreate;
