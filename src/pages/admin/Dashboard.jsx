import { auth } from '../../firebase/client'
import { signOut } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { motion } from 'framer-motion'
import { useState } from 'react'
import GovtLayout from '../../components/layout/GovtLayout'

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
        <GovtLayout
            userRole="admin"
            userName={`${adminData.firstName} ${adminData.lastName}`}
            userDesignation={adminData.designation}
            onLogout={handleLogout}
        >
            <div className="space-y-8">
                {/* Welcome & Context */}
                <div className="bg-gradient-to-r from-govt-blue-light/10 to-transparent p-6 rounded-l border-l-4 border-govt-blue-dark">
                    <h2 className="text-2xl font-bold text-govt-text">Welcome, Administrator</h2>
                    <p className="mt-1 text-gray-600">State Control Center for <span className="font-semibold text-govt-blue-dark">Maharashtra</span></p>
                </div>

                {/* KPI Cards */}
                <section>
                    <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                        <h2 className="text-lg font-bold text-govt-text flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            Live Statistics
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
                </section>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Admin Profile */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="font-bold text-govt-text">Profile Details</h3>
                                <button className="text-xs text-govt-blue-dark font-semibold hover:underline">Edit</button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-sm text-gray-500">Registration ID</span>
                                    <span className="text-sm font-semibold text-gray-900">{adminData.registrationId}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-sm text-gray-500">Location</span>
                                    <span className="text-sm font-semibold text-gray-900">{adminData.location}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="text-sm text-gray-500">Contact</span>
                                    <span className="text-sm font-semibold text-gray-900">{adminData.contact}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Last Login</span>
                                    <span className="text-sm font-semibold text-green-600">Today, 10:00 AM</span>
                                </div>
                            </div>
                        </div>

                        {/* Notifications / Alerts Block */}
                        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-yellow-50 px-6 py-3 border-b border-yellow-100 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <h3 className="font-bold text-yellow-800 text-sm">Action Required</h3>
                            </div>
                            <div className="p-4">
                                <ul className="space-y-3">
                                    <li className="text-sm text-gray-600 border-l-2 border-red-400 pl-3">
                                        <span className="block font-semibold text-gray-800">5 New Fund Requests</span>
                                        <Link to="/admin/release-funds" className="text-blue-600 hover:underline text-xs">Review Now &rarr;</Link>
                                    </li>
                                    <li className="text-sm text-gray-600 border-l-2 border-orange-400 pl-3">
                                        <span className="block font-semibold text-gray-800">Scheme "Adarsh Gram" Expiring</span>
                                        <span className="text-xs text-gray-400">In 3 days</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Quick Actions */}
                    <section className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full p-6">
                            <h2 className="text-lg font-bold text-govt-text mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-govt-blue-light rounded-full"></span>
                                Administrative Actions
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Create Scheme Card */}
                                <Link to="/admin/create-scheme" className="group relative block rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all hover:bg-white hover:border-govt-blue-light hover:shadow-md">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="h-10 w-10 flex items-center justify-center rounded bg-blue-100 text-govt-blue-dark group-hover:bg-govt-blue-dark group-hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-govt-text group-hover:text-govt-blue-dark">Create Scheme</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 pl-14">Define new welfare schemes, allocate budget, and set eligibility criteria.</p>
                                </Link>

                                {/* Release Funds Card */}
                                <Link to="/admin/release-funds" className="group relative block rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all hover:bg-white hover:border-govt-blue-light hover:shadow-md">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="h-10 w-10 flex items-center justify-center rounded bg-blue-100 text-govt-blue-dark group-hover:bg-govt-blue-dark group-hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.075 60.075 0 0 1 15.794 0L20.25 10.5M2.25 18.75a3.75 3.75 0 0 0 4.867 0M2.25 18.75V7.5A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5v11.25m-18 0h18" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-govt-text group-hover:text-govt-blue-dark">Release Funds</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 pl-14">Review pending applications and authorize fund disbursement.</p>
                                </Link>

                                {/* Add Skill Courses Card */}
                                <Link to="/admin/add-skill-courses" className="group relative block rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all hover:bg-white hover:border-govt-blue-light hover:shadow-md">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="h-10 w-10 flex items-center justify-center rounded bg-blue-100 text-govt-blue-dark group-hover:bg-govt-blue-dark group-hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 12 21a8.987 8.987 0 0 1 9-6.738V6.552a8.967 8.967 0 0 0-6-2.79Z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-govt-text group-hover:text-govt-blue-dark">Add Skill Courses</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 pl-14">Manage skill development inventory and update course details.</p>
                                </Link>

                                {/* Analytics Card (Placeholder) */}
                                <div className="group relative block rounded-lg border border-gray-200 bg-gray-50 p-6 opacity-60 cursor-not-allowed">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="h-10 w-10 flex items-center justify-center rounded bg-gray-200 text-gray-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-500">Analytics (Coming Soon)</h3>
                                    </div>
                                    <p className="text-sm text-gray-500 pl-14">Detailed reports and trend analysis for scheme performance.</p>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </GovtLayout>
    )
}
