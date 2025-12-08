import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Landing = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showLoginDropdown, setShowLoginDropdown] = useState(false);
    const [showStatesModal, setShowStatesModal] = useState(false);
    const [showSchemeModal, setShowSchemeModal] = useState(false);
    const [selectedState, setSelectedState] = useState(null);
    const [whoWithUsSlide, setWhoWithUsSlide] = useState(0);
    const [ourServicesSlide, setOurServicesSlide] = useState(0);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { t, i18n } = useTranslation();

    const stateSchemes = {
        delhi: [
            { name: 'landing.stateSchemes.delhi.1.name', description: 'landing.stateSchemes.delhi.1.desc' },
            { name: 'landing.stateSchemes.delhi.2.name', description: 'landing.stateSchemes.delhi.2.desc' },
        ],
        gujarat: [
            { name: 'landing.stateSchemes.gujarat.1.name', description: 'landing.stateSchemes.gujarat.1.desc' },
        ],
        haryana: [
            { name: 'landing.stateSchemes.haryana.1.name', description: 'landing.stateSchemes.haryana.1.desc' },
        ],
        maharashtra: [
            { name: 'landing.stateSchemes.maharashtra.1.name', description: 'landing.stateSchemes.maharashtra.1.desc' },
        ],
    };

    const slides = [
        {
            title: '',
            description: '',
            image: '/parliament.png',
        },
        {
            title: '',
            description: '',
            image: '/sc.png',
        },
        {
            title: '',
            description: '',
            image: '/punjab.jpeg',
        },
        {
            title: '',
            description: '',
            image: '/app.png',
        },
        {
            title: '',
            description: '',
            image: '/meri.png',
        },
    ];

    const statesList = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
        'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
        'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
        'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Lakshadweep', 'Puducherry', 'Jammu and Kashmir', 'Ladakh'
    ];

    const whoWithUsPartners = [
        { logo: '/Aadhar-Color.svg', name: 'Aadhaar' },
        { logo: '/Beti-Bachao-Beti-Padhao-Color.svg', name: 'Beti Bachao Beti Padhao' },
        { logo: '/Buyer-Seller-mKisan-Color.svg', name: 'mKisan' },
        { logo: '/Digi-Sevak-Color.svg', name: 'Digi Sevak' },
        { logo: '/Digital-India-Color.svg', name: 'Digital India' },
        { logo: '/Government-of-Telangana-Color.svg', name: 'Government of Telangana' },
        { logo: '/India-Post-Payments-Bank-Color.svg', name: 'India Post Payments Bank' },
        { logo: '/J-and-K-Employment-Exchange-Color.svg', name: 'J&K Employment Exchange' },
        { logo: '/National-Rural-Health-Mission-Black.svg', name: 'National Rural Health Mission' },
        { logo: '/NPS-Black.svg', name: 'National Pension System' },
        { logo: '/PMKVY-Black.svg', name: 'PMKVY' },
        { logo: '/Pradhan-Mantri-Aawas-Yojna-Black.svg', name: 'Pradhan Mantri Awas Yojana' },
        { logo: '/Revenue-Department-Delhi-Black.svg', name: 'Revenue Department Delhi' },
        { logo: '/Skill-India-Black.svg', name: 'Skill India' },
        { logo: '/Tamilnadu-Government-Color.svg', name: 'Tamil Nadu Government' },
        { logo: '/UPI-Color.svg', name: 'UPI' },
        { logo: '/Uttar-Pradesh-Sarkar-Black.svg', name: 'Uttar Pradesh Sarkar' },
        { logo: '/Uttarakhand-Rajya-Color.svg', name: 'Uttarakhand Government' },
        { logo: '/aaplesarkar.png', name: 'Aaple Sarkar' }
    ];

    const ourServicesData = [
        { logo: '/Aadhar-Color.svg', name: 'Aadhaar Services' },
        { logo: '/Digital-India-Color.svg', name: 'Digital India Services' },

        { logo: '/NPS-Black.svg', name: 'Pension Services' },
        { logo: '/PMKVY-Black.svg', name: 'Skill Development' },
        { logo: '/Pradhan-Mantri-Aawas-Yojna-Black.svg', name: 'Housing Services' },
        { logo: '/Skill-India-Black.svg', name: 'Employment Services' },
        { logo: '/UPI-Color.svg', name: 'Payment Services' },
        { logo: '/Beti-Bachao-Beti-Padhao-Color.svg', name: 'Women Empowerment' },
        { logo: '/National-Rural-Health-Mission-Black.svg', name: 'Healthcare Services' }
    ];

    const itemsPerSlide = 4;
    const totalWhoWithUsSlides = Math.ceil(whoWithUsPartners.length / itemsPerSlide);
    const totalOurServicesSlides = Math.ceil(ourServicesData.length / itemsPerSlide);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000); // Change slide every 3 seconds
        return () => clearInterval(timer);
    }, [slides.length]);

    useEffect(() => {
        const timer = setInterval(() => {
            setWhoWithUsSlide((prev) => (prev + 1) % totalWhoWithUsSlides);
        }, 4000);
        return () => clearInterval(timer);
    }, [totalWhoWithUsSlides]);

    useEffect(() => {
        const timer = setInterval(() => {
            setOurServicesSlide((prev) => (prev + 1) % totalOurServicesSlides);
        }, 4000);
        return () => clearInterval(timer);
    }, [totalOurServicesSlides]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleStateClick = (state) => {
        setSelectedState(state);
        setShowSchemeModal(true);
    };

    return (
        <div className="min-h-screen bg-hero-gradient font-sans text-dark-text">
            {/* Top Dark Blue Bar */}
            <div className="w-full bg-primary-blue text-white text-xs py-1 px-12 flex justify-between items-center" style={{ height: '1.2cm' }}>
                <div className="flex items-center space-x-4">
                    <img src="/gov.svg" alt="Government of India" className="h-10 ml-4" />
                    <div className="flex flex-col">
                        <span className="font-bold text-sm">{t('landing.ministry')}</span>
                        <span className="text-gray-200 text-sm font-medium">{t('landing.department')}</span>
                    </div>
                    <img src="/digi.svg" alt="Digital India" className="h-10 ml-4 bg-white p-1 rounded" />
                </div>
                <div className="flex items-center space-x-4 pr-8">
                    <select
                        className="border border-white text-white bg-primary-blue rounded p-1 text-sm"
                        value={i18n.language}
                        onChange={(e) => changeLanguage(e.target.value)}
                    >
                        <option value="en">{t('language.english')}</option>
                        <option value="hi">{t('language.hindi')}</option>
                        <option value="mr">{t('language.marathi')}</option>
                        <option value="bn">{t('language.bengali')}</option>
                        <option value="ta">{t('language.tamil')}</option>
                        <option value="te">{t('language.telugu')}</option>
                        <option value="kn">{t('language.kannada')}</option>
                    </select>
                    <button className="text-white text-xs flex items-center border border-white p-1 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.488 1.107 1.488 2.09 0 1.077-.71 1.954-1.7 2.39L18.425 15l1.246 1.731a5.955 5.955 0 01-1.489 2.19c-.482.382-1.07.675-1.725.868l-.29.083m-5.423-1.006l1.229 2.124m0 0a.44.44 0 00.113.114.457.457 0 00.124.06.466.466 0 00.16.03l.112-.008.01-.002.003-.002A.53.53 0 0014 21.5c.198 0 .385-.045.53-.124l.002-.003.002-.01l.008-.112a.466.466 0 00.03-.16.457.457 0 00.06-.124.44.44 0 00.114-.113h0zM14 12h.01M12 21.25V1.75M17.616 10.74l-2.039 1.104l.002.016m-.576.81l-2.124 1.229.016.002m.81-.576l-.8-.465" />
                        </svg>
                        {t('landing.voiceAgent')}
                    </button>
                </div>
            </div>

            {/* Main Header */}
            <div className="w-full bg-white flex justify-between items-center px-12 sticky top-0 z-50" style={{ height: '2cm' }}>
                <div className="flex items-center space-x-4">
                    <img src="/sakshamlogo.png" alt="Saksham Logo" className="h-20 w-20" />
                    <div className="font-bold text-2xl text-dark-text">
                        {t('landing.saksham')}
                    </div>
                </div>
                <div className="flex items-center space-x-8 ml-auto">
                    <nav className="flex items-center text-dark-text font-bold text-lg space-x-8">
                        <Link to="/" className="hover:text-primary-blue">{t('landing.home')}</Link>
                        <a href="#schemes-section" className="hover:text-primary-blue cursor-pointer">{t('landing.schemes')}</a>
                        <Link to="/digilocker" className="hover:text-primary-blue">{t('landing.digilocker')}</Link>
                        <a href="https://heatmap-jade.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-blue">{t('landing.heatmap')}</a>
                        {/* Search Icon */}
                        <button onClick={() => setShowSearchModal(true)} className="text-dark-text hover:text-primary-blue">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </nav>
                    {/* Login Button with Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                            className="bg-primary-blue text-white px-8 py-3 rounded-lg shadow-md hover:bg-primary-hover transition-colors font-semibold text-base"
                        >
                            {t('landing.login')}
                        </button>
                        {showLoginDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                <Link
                                    to="/admin/login"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setShowLoginDropdown(false)}
                                >
                                    {t('landing.adminLogin')}
                                </Link>
                                <Link
                                    to="/officer/login"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setShowLoginDropdown(false)}
                                >
                                    {t('landing.officerLogin')}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <main>
                {/* HERO CAROUSEL SECTION */}
                <section className="relative w-full overflow-hidden shadow-xl" style={{ backgroundColor: 'var(--light-blue-accent)' }}>
                    <div className="relative h-auto min-h-[400px] md:min-h-[500px]">
                        <AnimatePresence initial={false} custom={currentSlide}>
                            {slides.map((slide, index) => (
                                currentSlide === index && (
                                    <motion.div
                                        key={index}
                                        initial={{ x: 100 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -100 }}
                                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                        className="absolute inset-0 flex items-center p-0 md:p-0"
                                    >
                                        <div className="grid grid-cols-1 items-center h-full w-full">
                                            {/* Illustration Right */}
                                            <div className="flex justify-center items-center h-full w-full">
                                                <img
                                                    src={slide.image}
                                                    alt={slide.title}
                                                    className={`w-full h-full shadow-lg ${slide.image === '/app.png' || slide.image === '/meri.png' ? 'object-fill' : 'object-contain'}`}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>
                        {/* Navigation Dots */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${currentSlide === index ? 'bg-primary-blue' : 'bg-gray-300 hover:bg-gray-400'}`}
                                ></button>
                            ))}
                        </div>
                        {/* Navigation Arrows */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-primary-blue hover:text-primary-hover focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-primary-blue hover:text-primary-hover focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </div>
                </section>

                {/* STATS SECTION */}
                <section className="mx-[2cm] px-4 -mt-8 py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-light-blue-accent p-4 rounded-xl border border-border-light shadow-card-shadow flex flex-col items-center justify-center"
                        >
                            <div className="flex items-center mb-2">
                                <img src="/departmenticon.png" alt="Department Icon" className="h-16 w-16 mr-4" />
                                <h3 className="text-lg font-bold text-primary-blue">{t('landing.departmentEntities')}</h3>
                            </div>
                            <div className="flex flex-col items-center text-black">
                                <span className="text-sm font-normal">{t('landing.central')}: XX</span>
                                <span className="text-sm font-normal">{t('landing.state')}: XX</span>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-light-blue-accent p-4 rounded-xl border border-border-light shadow-card-shadow flex flex-col items-center justify-center"
                        >
                            <div className="flex items-center mb-2">
                                <img src="/schemesicon.png" alt="Schemes Icon" className="h-16 w-16 mr-4" />
                                <h3 className="text-lg font-bold text-primary-blue">{t('landing.activeSchemes')}</h3>
                            </div>
                            <div className="flex flex-col items-center text-black">
                                <span className="text-sm font-normal">{t('landing.central')}: XX</span>
                                <span className="text-sm font-normal">{t('landing.state')}: XX</span>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-light-blue-accent p-4 rounded-xl border border-border-light shadow-card-shadow flex flex-col items-center justify-center"
                        >
                            <div className="flex items-center mb-2">
                                <img src="/registrationicon.png" alt="Registrations Icon" className="h-16 w-16 mr-4" />
                                <h3 className="text-lg font-bold text-primary-blue">{t('landing.registrations')}</h3>
                            </div>
                            <div className="flex flex-col items-center text-black">
                                <span className="text-sm font-normal">{t('landing.central')}: XX</span>
                                <span className="text-sm font-normal">{t('landing.state')}: XX</span>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-light-blue-accent p-4 rounded-xl border border-border-light shadow-card-shadow flex flex-col items-center justify-center"
                        >
                            <div className="flex items-center mb-2">
                                <img src="/fundsicon.png" alt="Funds Icon" className="h-16 w-16 mr-4" />
                                <h3 className="text-lg font-bold text-primary-blue">{t('landing.totalFundsReleased')}</h3>
                            </div>
                            <div className="flex flex-col items-center text-black">
                                <span className="text-sm font-normal">{t('landing.central')}: XX</span>
                                <span className="text-sm font-normal">{t('landing.state')}: XX</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* WHO'S WITH US SECTION */}
                <section className="mx-[2cm] px-4 py-12">
                    <h2 className="text-3xl font-bold text-dark-text text-left mb-8">{t('landing.whosWithUs')}</h2>
                    <div className="relative">
                        {/* Navigation Arrows */}
                        <button
                            onClick={() => setWhoWithUsSlide((prev) => (prev - 1 + totalWhoWithUsSlides) % totalWhoWithUsSlides)}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-3 rounded-full shadow-lg text-primary-blue hover:bg-primary-blue hover:text-white transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setWhoWithUsSlide((prev) => (prev + 1) % totalWhoWithUsSlides)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-3 rounded-full shadow-lg text-primary-blue hover:bg-primary-blue hover:text-white transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        {/* Carousel Container */}
                        <div className="overflow-hidden py-4">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${whoWithUsSlide * 100}%)` }}
                            >
                                {Array.from({ length: totalWhoWithUsSlides }).map((_, slideIndex) => (
                                    <div key={slideIndex} className="min-w-full flex-shrink-0">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
                                            {whoWithUsPartners
                                                .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                                .map((partner, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-3 flex flex-col items-center justify-between h-[140px] w-full"
                                                        whileHover={{ y: -8, scale: 1.02 }}
                                                    >
                                                        <div className="h-20 w-20 flex items-center justify-center mb-2 flex-shrink-0">
                                                            <img
                                                                src={partner.logo}
                                                                alt={partner.name}
                                                                className="max-h-full max-w-full object-contain"
                                                            />
                                                        </div>
                                                        <p className="text-center text-xs font-semibold text-dark-text px-1 line-clamp-2">
                                                            {partner.name}
                                                        </p>
                                                    </motion.div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Dot Indicators */}
                        <div className="flex justify-center mt-6 gap-2">
                            {Array.from({ length: totalWhoWithUsSlides }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setWhoWithUsSlide(index)}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${whoWithUsSlide === index ? 'bg-primary-blue w-8' : 'bg-[#cfd8dc] w-2.5'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
                {/* SCHEMES BY STATES SECTION */}
                <section id="schemes-section" className="w-full bg-white py-12">
                    <div className="max-w-7xl ml-auto px-4 pr-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left Column: Staggered Cards */}
                        <div className="bg-[#e9f1f8] p-6 rounded-[24px] flex flex-col items-center justify-center w-[512px] h-[472px] -mt-12">
                            <div className="grid grid-cols-2 gap-6">
                                <div onClick={() => handleStateClick('delhi')} className="w-[220px] h-[200px] bg-white rounded-xl shadow-md border border-[#edf2f7] flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:bg-primary-blue group">
                                    <div className="w-40 h-40 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-2 group-hover:bg-white transition-all duration-300">
                                        <img src="/delhi.png" alt="Delhi" className="h-30 w-30 object-contain" />
                                    </div>
                                </div>
                                <div onClick={() => handleStateClick('gujarat')} className="w-[220px] h-[200px] bg-white rounded-xl shadow-md border border-[#edf2f7] flex flex-col items-center justify-center p-4 mt-8 cursor-pointer transition-all duration-300 hover:bg-primary-blue group">
                                    <div className="w-40 h-40 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-2 group-hover:bg-white transition-all duration-300">
                                        <img src="/gujarat.png" alt="Gujarat" className="h-30 w-30 object-contain" />
                                    </div>
                                </div>
                                <div onClick={() => handleStateClick('haryana')} className="w-[220px] h-[200px] bg-white rounded-xl shadow-md border border-[#edf2f7] flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:bg-primary-blue group">
                                    <div className="w-40 h-40 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-2 group-hover:bg-white transition-all duration-300">
                                        <img src="/haryana.png" alt="Haryana" className="h-30 w-30 object-contain" />
                                    </div>
                                </div>
                                <div onClick={() => handleStateClick('maharashtra')} className="w-[220px] h-[200px] bg-white rounded-xl shadow-md border border-[#edf2f7] flex flex-col items-center justify-center p-4 mt-8 cursor-pointer transition-all duration-300 hover:bg-primary-blue group">
                                    <div className="w-40 h-40 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-2 group-hover:bg-white transition-all duration-300">
                                        <img src="/maharashtra.png" alt="Maharashtra" className="h-30 w-30 object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Text and Button */}
                        <div className="flex flex-col justify-center lg:items-start items-center text-center lg:text-left">
                            <h2 className="text-4xl font-bold text-[#0b3b70] leading-tight mb-4">{t('landing.schemesByStates')}</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                {t('landing.exploreSchemes')}
                            </p>
                            <button
                                onClick={() => setShowStatesModal(true)}
                                className="bg-[#0052a3] text-white px-6 py-2.5 rounded-md shadow-md hover:bg-[#003f82] transition-colors font-semibold"
                            >
                                {t('landing.exploreStates')}
                            </button>
                        </div>
                    </div>
                </section>

                {/* BENEFITS OF SAKSHAM SECTION */}
                <section className="w-full bg-[#055a8f] py-9 md:py-16 relative overflow-hidden">
                    {/* Background Accent Circle */}
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="container mx-auto px-4 md:px-12 relative z-10 flex flex-col lg:flex-row items-center">
                        {/* Left Column: Content */}
                        <div className="w-full lg:w-3/5 text-left mb-12 lg:mb-0">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('landing.benefitsOfSaksham')}</h2>
                            <p className="text-lg text-white/90 mb-10 max-w-2xl">
                                {t('landing.benefitsDescription')}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                                {[
                                    {
                                        icon: <img src="/cd1.png" alt="All Schemes" className="w-full h-full object-contain" />,
                                        title: t('landing.allSchemesOnePlace'),
                                        tags: [t('landing.centralGovernment'), t('landing.stateGovernment'), t('landing.schemesTag')]
                                    },
                                    {
                                        icon: <img src="/cd2.png" alt="All Engagements" className="w-full h-full object-contain" />,
                                        title: t('landing.allEngagementsOnePlace'),
                                        tags: [t('landing.feedbackRating'), t('landing.notifications'), t('landing.customerSupport'), t('landing.aiBot')]
                                    },
                                    {
                                        icon: <img src="/cd3.png" alt="All Transactions" className="w-full h-full object-contain" />,
                                        title: t('landing.allTransactionsOnePlace'),
                                        tags: [t('landing.status'), t('landing.bills'), t('landing.applications'), t('landing.manyMore')]
                                    },
                                    {
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#055a8f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                            </svg>
                                        ),
                                        title: t('landing.supportsEveryone'),
                                        tags: [t('landing.mobileAccess'), t('landing.webAccess')]
                                    }
                                ].map((card, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -6 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-white rounded-2xl p-5 shadow-lg flex flex-col items-start"
                                    >
                                        <div className="h-16 w-16 rounded-lg bg-blue-50 flex items-center justify-center mb-4 p-2">
                                            {card.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {card.tags.map((tag, i) => (
                                                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-md border border-gray-200">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Hero Image */}
                        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end relative -ml-[4cm]">
                            <motion.img
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                src="/appss.jpg"
                                alt="Smiling person using Saksham app"
                                className="max-h-[600px] object-contain relative z-10 drop-shadow-2xl rounded-2xl"
                            />
                        </div>
                    </div>
                </section>

                {/* HELP BANNER SECTION */}
                <section className="container mx-auto px-4 md:px-12 py-12">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
                        {/* Left Section: Text */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-start">
                            <h3 className="text-3xl font-bold text-[#0052A3] mb-4">{t('landing.needHelp')}</h3>
                            <div className="text-gray-600 text-lg mb-6 space-y-1">
                                <p>{t('landing.available24x7')}</p>
                                <p className="font-medium">24x7</p>
                            </div>
                            <button className="bg-[#0052A3] text-white px-6 py-2 rounded-full font-bold text-lg hover:bg-[#003f82] transition-colors">
                                {t('landing.contactSupport')}
                            </button>
                        </div>

                        {/* Right Section: Image Placeholder */}
                        <div className="w-full md:w-1/2 bg-blue-50/30 relative min-h-[300px] flex items-center justify-center overflow-hidden">
                            {/* Abstract Background Shape */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl"></div>

                            {/* Customer Care Image */}
                            <img
                                src="/customer-care.png"
                                alt="Customer Care Support"
                                className="relative z-10 max-h-[300px] object-contain"
                            />
                        </div>
                    </div>
                </section>
                {/* NEED HELP SECTION */}
                <section className="mx-[2cm] px-4 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-light-blue p-8 rounded-2xl shadow-card-shadow flex flex-col md:flex-row items-center justify-between text-center md:text-left"
                    >
                        <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-blue mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15.75l4-4.5 4 4.5M12 18.75h.008v.008H12v-.008z" />
                            </svg>
                            <div>
                                <h3 className="text-2xl font-bold text-dark-text">{t('landing.needAssistance')}</h3>
                                <p className="text-medium-text">{t('landing.contactGramPanchayat')}</p>
                            </div>
                        </div>

                        {/* Converted to motion.button so whileHover / whileTap work */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary-blue text-white px-8 py-3 rounded-lg shadow-md hover:bg-primary-hover transition-colors font-semibold"
                        >
                            {t('landing.knowMore')}
                        </motion.button>
                    </motion.div>
                </section>

                {/* DOWNLOAD APP SECTION */}
                <section className="mx-[2cm] px-4 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-light-blue rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-card-shadow"
                    >
                        {/* Left Column: Text and Badges */}
                        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary-blue leading-tight mb-4">
                                {t('landing.downloadApp')}
                            </h2>
                            <p className="text-lg text-medium-text mb-6">
                                {t('landing.downloadAppDescription')}
                            </p>
                            <div className="flex justify-center md:justify-start space-x-4">
                                {/* Google Play Badge */}
                                <a href="#" className="block" aria-label="Download on Google Play">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-12" />
                                </a>
                                {/* App Store Badge */}
                                <a href="#" className="block" aria-label="Download on Indus App Store">
                                    <img src="/indus.png" alt="Indus App Store" className="h-12 rounded-lg" />
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Phone Mockup */}
                        <div className="md:w-1/2 flex justify-center md:justify-end items-end">
                            <motion.img
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                src="/appss2.jpg"
                                alt="Phone Mockup with App Screen"
                                className="max-h-80 md:max-h-96 object-contain rounded-2xl"
                            />
                        </div>
                    </motion.div>
                </section>

            </main>


            {/* SCHEME MODAL */}
            {showSchemeModal && selectedState && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowSchemeModal(false)}>
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-primary-blue">{t('landing.schemesFor')} {selectedState.charAt(0).toUpperCase() + selectedState.slice(1)}</h2>
                            <button
                                onClick={() => setShowSchemeModal(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-4">
                            {stateSchemes[selectedState].map((scheme, index) => (
                                <div key={index} className="bg-light-blue-accent p-4 rounded-lg">
                                    <h3 className="font-bold text-lg text-dark-text">{t(scheme.name)}</h3>
                                    <p className="text-medium-text">{t(scheme.description)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* STATES MODAL */}
            {showStatesModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowStatesModal(false)}>
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-primary-blue">{t('landing.selectState')}</h2>
                            <button
                                onClick={() => setShowStatesModal(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {statesList.map((state, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        console.log(`Selected state: ${state}`);
                                        // Add navigation logic here
                                    }}
                                    className="bg-light-blue-accent hover:bg-primary-blue hover:text-white text-dark-text p-4 rounded-lg border border-border-light shadow-sm transition-all duration-300 text-left font-semibold"
                                >
                                    {state}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* FOOTER */}
            <footer className="bg-gradient-to-br from-[#0b3b70] to-[#0052a3] text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        {/* Column 1: Team Logo and Description */}
                        <div className="lg:col-span-1">
                            <img src="/MargVedha-logo.png" alt="MargVedha Logo" className="h-20 mb-4 rounded-md" style={{ backgroundColor: 'white' }} />
                            <p className="text-sm text-gray-200 leading-relaxed">
                                {t('landing.empoweringCitizens')}
                            </p>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold mb-4 border-b-2 border-white pb-2 inline-block">{t('landing.quickLinks')}</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-sm text-gray-200 hover:text-white transition-colors hover:translate-x-1 inline-block">{t('landing.home')}</a></li>
                                <li><a href="#" className="text-sm text-gray-200 hover:text-white transition-colors hover:translate-x-1 inline-block">{t('landing.services')}</a></li>
                                <li><a href="#" className="text-sm text-gray-200 hover:text-white transition-colors hover:translate-x-1 inline-block">{t('landing.schemes')}</a></li>
                                <li><a href="#" className="text-sm text-gray-200 hover:text-white transition-colors hover:translate-x-1 inline-block">{t('landing.aboutUs')}</a></li>
                                <li><a href="#" className="text-sm text-gray-200 hover:text-white transition-colors hover:translate-x-1 inline-block">{t('landing.contact')}</a></li>
                            </ul>
                        </div>

                        {/* Column 3: Resources & Support */}
                        <div>
                            <h3 className="text-lg font-bold mb-4 border-b-2 border-white pb-2 inline-block">{t('landing.resourcesSupport')}</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-sm text-gray-200 hover:text-white transition-colors hover:translate-x-1 inline-block">{t('landing.helpCenter')}</a></li>
                                <li><a href="#" className="text-sm text-gray-200 hover:text-white transition-colors hover:translate-x-1 inline-block">{t('landing.faqs')}</a></li>
                                <li><a href="#" className="text-sm text-gray-200 hover:text-white transition-colors hover:translate-x-1 inline-block">{t('landing.documentation')}</a></li>
                                <li><a href="#" className="text-sm text-gray-200 hover:text-white transition-colors hover:translate-x-1 inline-block">{t('landing.privacyPolicy')}</a></li>
                                <li><a href="#" className="text-sm text-gray-200 hover:text-white transition-colors hover:translate-x-1 inline-block">{t('landing.termsOfService')}</a></li>
                            </ul>
                        </div>

                        {/* Column 4: Team Members */}
                        <div>
                            <h3 className="text-lg font-bold mb-4 border-b-2 border-white pb-2 inline-block">{t('landing.teamMembers')}</h3>
                            <ul className="space-y-2">
                                <li className="text-sm text-gray-200">{t('landing.adityaAkolkar')}</li>
                                <li className="text-sm text-gray-200">{t('landing.adityaPatil')}</li>
                                <li className="text-sm text-gray-200">{t('landing.pranavKhaire')}</li>
                                <li className="text-sm text-gray-200">{t('landing.suhaniPatil')}</li>
                                <li className="text-sm text-gray-200">{t('landing.vaishnaviDunde')}</li>
                                <li className="text-sm text-gray-200">{t('landing.chaitanyaPatil')}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Section: Social Media & Copyright */}
                    <div className="border-t border-white/30 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            {/* Social Media Icons */}
                            <div className="flex space-x-6">
                                <a href="#" className="text-white hover:text-gray-300 transition-colors transform hover:scale-110" aria-label="Facebook">
                                    <svg fill="currentColor" viewBox="0 0 24 24" className="h-7 w-7">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-white hover:text-gray-300 transition-colors transform hover:scale-110" aria-label="Instagram">
                                    <svg fill="currentColor" viewBox="0 0 24 24" className="h-7 w-7">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-white hover:text-gray-300 transition-colors transform hover:scale-110" aria-label="X (Twitter)">
                                    <svg fill="currentColor" viewBox="0 0 24 24" className="h-7 w-7">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a href="#" className="text-white hover:text-gray-300 transition-colors transform hover:scale-110" aria-label="LinkedIn">
                                    <svg fill="currentColor" viewBox="0 0 24 24" className="h-7 w-7">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a href="https://www.youtube.com/@codeverse48" className="text-white hover:text-gray-300 transition-colors transform hover:scale-110" aria-label="YouTube">
                                    <svg fill="currentColor" viewBox="0 0 24 24" className="h-7 w-7">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                            </div>

                            {/* Copyright */}
                            <div className="text-sm text-gray-200">
                                {t('landing.copyright', { year: new Date().getFullYear() })}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* SEARCH MODAL */}
            {showSearchModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20" onClick={() => setShowSearchModal(false)}>
                    <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-primary-blue">Search</h2>
                            <button
                                onClick={() => setShowSearchModal(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for schemes, services, or information..."
                                className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-blue text-lg"
                                autoFocus
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        {searchQuery && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-600">Search results for: <span className="font-semibold text-primary-blue">{searchQuery}</span></p>
                                <p className="text-sm text-gray-500 mt-2">Search functionality coming soon...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Landing;
