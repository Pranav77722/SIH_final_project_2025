
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const GovtLayout = ({ children, userRole = 'common', userName, userDesignation, onLogout }) => {
    const [fontSize, setFontSize] = useState(1); // 1 = normal
    const [lang, setLang] = useState('English');
    const navigate = useNavigate();
    const location = useLocation();

    // Font size handler
    const handleFontSize = (action) => {
        if (action === 'reset') setFontSize(1);
        if (action === 'increase' && fontSize < 1.2) setFontSize(prev => prev + 0.1);
        if (action === 'decrease' && fontSize > 0.8) setFontSize(prev => prev - 0.1);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans" style={{ fontSize: `${fontSize}rem` }}>
            {/* 1. Accessibility Strip */}
            <div className="bg-[#333333] text-white text-xs py-1 px-4 lg:px-8 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <span className="hover:underline cursor-pointer">Government of India</span>
                    <span className="h-3 w-[1px] bg-gray-500"></span>
                    <span className="hover:underline cursor-pointer">Ministry of Social Justice and Empowerment</span>
                </div>
                <div className="flex items-center gap-4">
                    <a href="#main-content" className="hover:underline hidden sm:block">Skip to Main Content</a>
                    <span className="h-3 w-[1px] bg-gray-500 hidden sm:block"></span>
                    <div className="flex items-center gap-2">
                        <button onClick={() => handleFontSize('decrease')} className="hover:text-blue-300 font-bold">A-</button>
                        <button onClick={() => handleFontSize('reset')} className="hover:text-blue-300 font-bold">A</button>
                        <button onClick={() => handleFontSize('increase')} className="hover:text-blue-300 font-bold">A+</button>
                    </div>
                    <span className="h-3 w-[1px] bg-gray-500"></span>
                    <button
                        onClick={() => setLang(prev => prev === 'English' ? 'Hindi' : 'English')}
                        className="hover:underline flex items-center gap-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                        {lang === 'English' ? 'English' : 'हिंदी'}
                    </button>
                </div>
            </div>

            {/* 2. Main Header */}
            <header className="bg-white shadow-md border-b-4 border-govt-blue-dark relative z-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
                    {/* Left: Emblem & Ministry */}
                    <div className="flex items-center gap-4">
                        <img src="/gov.svg" alt="Satyamev Jayate" className="h-16 w-auto" />
                        <div className="flex flex-col justify-center">
                            <h1 className="text-xl md:text-2xl font-bold text-govt-text leading-tight">
                                {lang === 'English' ? 'SAKSHAM' : 'सक्षम'}
                            </h1>
                            <p className="text-xs md:text-sm text-gray-600 font-medium">
                                Pradhan Mantri Anusuchit Jaati Abhyuday Yojana (PM-AJAY)
                            </p>
                            <p className="text-[10px] md:text-xs text-gray-500">
                                Ministry of Social Justice and Empowerment, Govt. of India
                            </p>
                        </div>
                    </div>

                    {/* Right: Logos & Profile */}
                    <div className="flex items-center gap-6">
                        {/* Gov Logos (Hidden on mobile) */}
                        <div className="hidden lg:flex items-center gap-4 opacity-90">
                            <img src="/swachh-bharat.png" alt="Swachh Bharat" className="h-12 w-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                            <img src="/g20.png" alt="G20" className="h-10 w-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                            <img src="/digital-india.png" alt="Digital India" className="h-10 w-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-govt-text">{userName || 'User'}</p>
                                <p className="text-xs text-govt-blue-dark font-medium uppercase tracking-wider">{userDesignation || 'Officer'}</p>
                            </div>
                            <button
                                onClick={onLogout}
                                className="bg-white border border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 px-4 py-2 rounded shadow-sm text-sm font-semibold transition-all flex items-center gap-2"
                                title="Logout"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* 3. Navigation Bar (Optional - based on role) */}
            <nav className="bg-govt-blue-dark text-white shadow-lg sticky top-0 z-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-12 gap-1 overflow-x-auto text-sm font-medium">
                        <Link to="/" className="px-4 h-full flex items-center hover:bg-white/10 transition-colors whitespace-nowrap">Home</Link>
                        {userRole === 'admin' && (
                            <>
                                <Link to="/admin/dashboard" className={`px-4 h-full flex items-center hover:bg-white/10 transition-colors whitespace-nowrap ${location.pathname === '/admin/dashboard' ? 'bg-white/20' : ''}`}>Dashboard</Link>
                                <Link to="/admin/create-scheme" className={`px-4 h-full flex items-center hover:bg-white/10 transition-colors whitespace-nowrap ${location.pathname === '/admin/create-scheme' ? 'bg-white/20' : ''}`}>Schemes</Link>
                                <Link to="/admin/release-funds" className={`px-4 h-full flex items-center hover:bg-white/10 transition-colors whitespace-nowrap ${location.pathname === '/admin/release-funds' ? 'bg-white/20' : ''}`}>Funds</Link>
                                <Link to="/admin/add-skill-courses" className={`px-4 h-full flex items-center hover:bg-white/10 transition-colors whitespace-nowrap ${location.pathname === '/admin/add-skill-courses' ? 'bg-white/20' : ''}`}>Skill Courses</Link>
                            </>
                        )}
                        {userRole === 'officer' && (
                            <>
                                <Link to="/officer/dashboard" className={`px-4 h-full flex items-center hover:bg-white/10 transition-colors whitespace-nowrap ${location.pathname === '/officer/dashboard' ? 'bg-white/20' : ''}`}>Dashboard</Link>
                                <Link to="/officer/dashboard/verification" className={`px-4 h-full flex items-center hover:bg-white/10 transition-colors whitespace-nowrap ${location.pathname.includes('verification') ? 'bg-white/20' : ''}`}>Verification</Link>
                                <Link to="/officer/dashboard/field-visit" className={`px-4 h-full flex items-center hover:bg-white/10 transition-colors whitespace-nowrap ${location.pathname.includes('field-visit') ? 'bg-white/20' : ''}`}>Field Visit</Link>
                                <Link to="/officer/dashboard/profiling" className={`px-4 h-full flex items-center hover:bg-white/10 transition-colors whitespace-nowrap ${location.pathname.includes('profiling') ? 'bg-white/20' : ''}`}>Profiling</Link>
                                <Link to="/pfms" className={`px-4 h-full flex items-center hover:bg-white/10 transition-colors whitespace-nowrap ${location.pathname.includes('pfms') ? 'bg-white/20' : ''}`}>PFMS</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>


            {/* 4. Main Content Area */}
            <main id="main-content" className="flex-grow mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {children}
                </motion.div>
            </main>

            {/* 5. Footer */}
            <footer className="bg-[#1b1b1b] text-white py-8 border-t-4 border-yellow-500 mt-auto">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h4 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2 inline-block">Address</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Ministry of Social Justice & Empowerment,<br />
                                Shastri Bhawan, C-Wing,<br />
                                Dr. Rajendra Prasad Road,<br />
                                New Delhi - 110001
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2 inline-block">Quick Links</h4>
                            <ul className="text-gray-400 text-sm space-y-2">
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">Digital India</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">National Portal of India</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">PM-AJAY Guidelines</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2 inline-block">Policies</h4>
                            <ul className="text-gray-400 text-sm space-y-2">
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">Website Policies</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">Help</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="text-center md:text-right">
                            <img src="/nic.png" alt="NIC Logo" className="h-10 mx-auto md:ml-auto mb-2 opacity-80 filter grayscale hover:grayscale-0 transition-all" onError={(e) => e.target.style.display = 'none'} />
                            <p className="text-xs text-gray-500">Designed, Developed and Hosted by National Informatics Centre (NIC)</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
                        <p>Last Updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p className="mt-1">&copy; 2024 Ministry of Social Justice and Empowerment. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default GovtLayout;
