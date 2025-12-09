import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GovtLayout from '../../../components/layout/GovtLayout';

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
            title: 'Applied Schemes Registry',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
            description: 'View all citizen scheme applications',
            path: '/officer/applied-schemes',
            color: 'bg-yellow-50 text-yellow-600'
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
        <GovtLayout
            userRole="officer"
            userName={`${officerData.firstName} ${officerData.lastName}`}
            userDesignation={officerData.designation}
            onLogout={handleLogout}
        >
            <div className="space-y-8">
                {/* Welcome & Context */}
                <div className="bg-gradient-to-r from-govt-blue-light/10 to-transparent p-6 rounded-l border-l-4 border-govt-blue-dark">
                    <h2 className="text-2xl font-bold text-govt-text">Welcome, {officerData.firstName}</h2>
                    <p className="mt-1 text-gray-600">Field Operations Dashboard for <span className="font-semibold text-govt-blue-dark">{officerData.region}</span></p>
                </div>

                {/* KPI Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                        <h2 className="text-lg font-bold text-govt-text flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            District Statistics
                        </h2>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Last updated: {new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {kpiData.map((kpi, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    {renderIcon(kpi.icon)}
                                </div>
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-md ${kpi.color.replace('text-', 'bg-').replace('-600', '-50')}`}>
                                        {renderIcon(kpi.icon)}
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.color.replace('text-', 'bg-').replace('-600', '-50')} ${kpi.color}`}>
                                        View
                                    </span>
                                </div>
                                <h3 className="text-3xl font-extrabold text-gray-800 mb-1">{kpi.value}</h3>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{kpi.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Officer Profile */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="font-bold text-govt-text">Officer Profile</h3>
                                <button className="text-xs text-govt-blue-dark font-semibold hover:underline">Edit</button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-sm text-gray-500">Registration ID</span>
                                    <span className="text-sm font-semibold text-gray-900">{officerData.registrationId}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-sm text-gray-500">Location</span>
                                    <span className="text-sm font-semibold text-gray-900">{officerData.location}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-sm text-gray-500">Email</span>
                                    <span className="text-sm font-semibold text-gray-900">{officerData.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Last Login</span>
                                    <span className="text-sm font-semibold text-green-600">Today, 09:30 AM</span>
                                </div>
                            </div>
                        </div>

                        {/* Pending Actions Block */}
                        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-blue-50 px-6 py-3 border-b border-blue-100 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                </svg>
                                <h3 className="font-bold text-blue-800 text-sm">Tasks for Today</h3>
                            </div>
                            <div className="p-4">
                                <ul className="space-y-3">
                                    <li className="text-sm text-gray-600 flex justify-between items-center">
                                        <span>Document Verifications</span>
                                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-bold">12 Pending</span>
                                    </li>
                                    <li className="text-sm text-gray-600 flex justify-between items-center">
                                        <span>Field Visits</span>
                                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full font-bold">3 Scheduled</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Quick Actions Grid */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full p-6">
                            <h2 className="text-lg font-bold text-govt-text mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-govt-blue-light rounded-full"></span>
                                Officer Tools
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {quickActions.map((action, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        onClick={() => navigate(action.path)}
                                        className="bg-gray-50 rounded-lg p-5 shadow-sm border border-gray-200 hover:bg-white hover:shadow-md hover:border-govt-blue-light transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className={`w-12 h-12 rounded flex items-center justify-center ${action.color.replace('text-', 'bg-').replace('-600', '-100')} ${action.color} group-hover:scale-110 transition-transform`}>
                                                {action.icon}
                                            </div>
                                            <h3 className="text-lg font-bold text-govt-text group-hover:text-govt-blue-dark transition-colors">
                                                {action.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-gray-500 pl-16">
                                            {action.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GovtLayout>
    );
};

export default OfficerDashboard;
