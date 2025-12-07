import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OfficerDashboard = () => {
    const navigate = useNavigate();
    const [officerData] = useState({
        firstName: 'Rajesh',
        lastName: 'Kumar',
        designation: 'Field Officer',
        region: 'Pune District',
        email: 'rajesh.k@gov.in',
        lastLogin: 'Today, 09:30 AM',
        age: 34,
        gender: 'Male',
        location: 'Ahilyanagar',
        contact: '+91 9876543210',
        registrationId: 'SJO-AN-007',
    });

    const handleLogout = () => {
        navigate('/officer/login');
    };

    const quickActions = [
        {
            title: 'Document Verification',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            description: 'Verify pending applicant documents',
            path: '/officer/dashboard/verification',
            color: 'bg-blue-50 text-blue-600'
        },
        {
            title: 'Field Enumeration',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            description: 'Manage field visits and offline data',
            path: '/officer/dashboard/field-visit',
            color: 'bg-green-50 text-green-600'
        },
        {
            title: 'Beneficiary Profiling',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            description: 'View analytics and beneficiary insights',
            path: '/officer/dashboard/profiling',
            color: 'bg-purple-50 text-purple-600'
        },
        {
            title: 'PFMS Disbursement',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            description: 'Manage DBT batches and disbursements',
            path: '/pfms',
            color: 'bg-indigo-50 text-indigo-600'
        }
    ];

    const kpiData = [
        { label: 'Total Beneficiaries', value: '1,250', color: 'text-blue-600', icon: 'users' },
        { label: 'Active Training', value: '300', color: 'text-green-600', icon: 'chart' },
        { label: 'Total Registrations', value: '2,500', color: 'text-orange-600', icon: 'clipboard' },
        { label: 'Funds Available', value: '₹ 5,00,000', color: 'text-indigo-600', icon: 'rupee' },
    ];

    const renderIcon = (icon) => {
        switch (icon) {
            case 'users':
                return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.28-1.255-.743-1.67a5.002 5.002 0 00-6.514 0A2.99 2.99 0 007 18v2M12 14a4 4 0 100-8 4 4 0 000 8z" /></svg>;
            case 'chart':
                return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
            case 'clipboard':
                return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
            case 'rupee':
                return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-4 4h4m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
            default:
                return null;
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img src="/gov.svg" alt="Emblem" className="h-12 w-auto" />
                            <div className="border-l-2 border-gray-200 pl-4">
                                <h1 className="text-lg font-bold text-govt-text leading-tight">Officer Portal</h1>
                                <p className="text-xs text-gray-500 font-medium">Ministry of Social Justice and Empowerment</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-semibold text-govt-text">{officerData.firstName} {officerData.lastName}</p>
                                <p className="text-xs text-gray-500">{officerData.designation}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-govt-blue-light hover:bg-govt-blue-dark text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-2xl font-bold text-govt-text">Welcome, {officerData.firstName}</h1>
                    <p className="text-gray-600 mt-1">Here's what's happening in your region today.</p>
                </motion.div>

                {/* Officer Details Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                    <h2 className="text-xl font-bold text-govt-text mb-4">Officer Details</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500 font-medium">Name</p>
                            <p className="text-govt-text font-semibold">{officerData.firstName} {officerData.lastName}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">Registration ID</p>
                            <p className="text-govt-text font-semibold">{officerData.registrationId}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">Age</p>
                            <p className="text-govt-text font-semibold">{officerData.age}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">Gender</p>
                            <p className="text-govt-text font-semibold">{officerData.gender}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">Location</p>
                            <p className="text-govt-text font-semibold">{officerData.location}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">Contact</p>
                            <p className="text-govt-text font-semibold">{officerData.contact}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">Email</p>
                            <p className="text-govt-text font-semibold">{officerData.email}</p>
                        </div>
                    </div>
                </motion.div>
                {/* KPI Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-govt-text">District-Level Statistics (Ahilyanagar)</h2>
                        <p className="text-sm text-gray-500 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {kpiData.map((kpi, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-6"
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${kpi.color.replace('text-', 'bg-').replace('-600', '-100')} ${kpi.color}`}>
                                    {renderIcon(kpi.icon)}
                                </div>
                                <div>
                                    <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
                                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{kpi.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {quickActions.map((action, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            onClick={() => navigate(action.path)}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-govt-blue-light transition-all cursor-pointer group"
                        >
                            <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${action.color} group-hover:scale-110 transition-transform`}>
                                {action.icon}
                            </div>
                            <h3 className="text-lg font-bold text-govt-text mb-2 group-hover:text-govt-blue-dark transition-colors">
                                {action.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {action.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default OfficerDashboard;
