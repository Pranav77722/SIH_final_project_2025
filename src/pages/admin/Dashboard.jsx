import { auth } from '../../firebase/client'
import { signOut } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function AdminDashboard() {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [adminData] = useState({
        firstName: 'Sanjay',
        lastName: 'Patil',
        designation: 'State Administrator',
        age: 45,
        gender: 'Male',
        location: 'Mumbai, Maharashtra',
        contact: '+91 9988776655',
        registrationId: 'SJO-MH-001',
    });

    const handleLogout = async () => {
        await signOut(auth)
        navigate('/admin/login')
    }
    const kpiData = [
        { label: 'Total Beneficiaries', value: '1,50,250', color: 'text-blue-600', icon: 'users' },
        { label: 'Active Training', value: '45,300', color: 'text-green-600', icon: 'chart' },
        { label: 'Total Registrations', value: '3,25,000', color: 'text-orange-600', icon: 'clipboard' },
        { label: 'Funds Available', value: '₹ 85,00,000', color: 'text-indigo-600', icon: 'rupee' },
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
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <img src="/gov.svg" alt="Emblem" className="h-10 w-auto" />
                            <div className="border-l border-gray-300 pl-3">
                                <h1 className="text-lg font-bold text-govt-blue-dark">Admin Panel</h1>
                                <p className="text-xs text-gray-600">Ministry of Social Justice and Empowerment</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-govt-blue-light hover:bg-govt-blue-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold text-govt-text">Welcome, Administrator</h2>
                    <p className="mt-2 text-gray-600">System Control Center for Maharashtra State</p>
                </motion.div>
                {/* admin Details Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                    <h2 className="text-xl font-bold text-govt-text mb-4">Admin Details</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500 font-medium">Name</p>
                            <p className="text-govt-text font-semibold">{adminData.firstName} {adminData.lastName}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">Registration ID</p>
                            <p className="text-govt-text font-semibold">{adminData.registrationId}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">Age</p>
                            <p className="text-govt-text font-semibold">{adminData.age}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">Gender</p>
                            <p className="text-govt-text font-semibold">{adminData.gender}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">Location</p>
                            <p className="text-govt-text font-semibold">{adminData.location}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium">Contact</p>
                            <p className="text-govt-text font-semibold">{adminData.contact}</p>
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
                        <h2 className="text-xl font-bold text-govt-text">State-Level Statistics (Maharashtra)</h2>
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

                {/* Admin Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8"
                >
                    <h2 className="text-xl font-bold text-govt-blue-dark mb-6 flex items-center gap-2">
                        <span className="w-1 h-6 bg-govt-blue-light rounded-full"></span>
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Create Scheme Card */}
                        <Link to="/admin/create-scheme" className="group relative block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-govt-blue-light hover:shadow-md">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-blue-50 text-govt-blue-light group-hover:bg-govt-blue-light group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-govt-text group-hover:text-govt-blue-dark">Create Scheme</h3>
                            <p className="mt-1 text-sm text-gray-600">Define new welfare schemes with allocated funds and eligibility criteria.</p>
                        </Link>

                        {/* Release Funds Card */}
                        <Link to="/admin/release-funds" className="group relative block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-govt-blue-light hover:shadow-md">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-blue-50 text-govt-blue-light group-hover:bg-govt-blue-light group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.075 60.075 0 0 1 15.794 0L20.25 10.5M2.25 18.75a3.75 3.75 0 0 0 4.867 0M2.25 18.75V7.5A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5v11.25m-18 0h18" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-govt-text group-hover:text-govt-blue-dark">Release Funds</h3>
                            <p className="mt-1 text-sm text-gray-600">Review and release funds for approved applications.</p>
                        </Link>

                        {/* Add Skill Courses Card */}
                        <Link to="/admin/add-skill-courses" className="group relative block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-govt-blue-light hover:shadow-md">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-blue-50 text-govt-blue-light group-hover:bg-govt-blue-light group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 12 21a8.987 8.987 0 0 1 9-6.738V6.552a8.967 8.967 0 0 0-6-2.79Z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-govt-text group-hover:text-govt-blue-dark">Add Skill Courses</h3>
                            <p className="mt-1 text-sm text-gray-600">Manage and add new skill development courses for beneficiaries.</p>
                        </Link>


                    </div>
                </motion.div>
            </main>
        </div>
    )
}
