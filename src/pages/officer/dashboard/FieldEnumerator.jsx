import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';
import { useOfflineQueue } from '../../../hooks/useOfflineQueue';
import { scheduleVisit, getApplications, approveApplication } from '../../../api/applications';

const FieldEnumerator = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { queue, addToQueue, sync, queueLength } = useOfflineQueue();
    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [modalType, setModalType] = useState(null); // 'schedule' | 'view' | 'approve'
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [scheduleData, setScheduleData] = useState({
        place: '',
        date: '',
        time: '',
        enumeratorName: '',
        registrationNo: '',
    });

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = () => {
        getApplications({ status: 'pending' }).then(setApplications);
    };

    const handleAction = (app, type) => {
        setSelectedApp(app);
        setModalType(type);
        setSelectedFile(null);
        setPreviewUrl(null);
        setScheduleData({ place: '', date: '', time: '', enumeratorName: '', registrationNo: '' });
    };

    const handleCloseModal = () => {
        setModalType(null);
        setSelectedApp(null);
        setSelectedFile(null);
        setPreviewUrl(null);
        setScheduleData({ place: '', date: '', time: '', enumeratorName: '', registrationNo: '' });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUploadPhoto = () => {
        if (selectedFile && selectedApp) {
            addToQueue({
                name: selectedFile.name,
                size: selectedFile.size,
                type: selectedFile.type,
                applicationId: selectedApp.id,
                applicantName: selectedApp.applicantName
            });
            alert(`Photo for ${selectedApp.applicantName} added to offline queue`);
            handleCloseModal();
        }
    };

    const handleScheduleSubmit = async () => {
        if (!selectedApp || !scheduleData.place || !scheduleData.date || !scheduleData.time || !scheduleData.enumeratorName || !scheduleData.registrationNo) {
            alert('Please fill in all fields');
            return;
        }

        const location = scheduleData.place;
        const locPrefix = location.substring(0, 3).toUpperCase();
        const timestamp = Date.now();
        const uniqueHash = `${locPrefix}${timestamp}`;

        await scheduleVisit({
            applicationId: selectedApp.id,
            ...scheduleData,
            visitId: uniqueHash
        });
        alert(`Field visit scheduled for ${selectedApp.applicantName}. Visit ID: ${uniqueHash}`);
        
        setApplications(applications.map(app =>
            app.id === selectedApp.id ? { ...app, visitId: uniqueHash, scheduled: true } : app
        ));

        handleCloseModal();
    };

    const handleApprove = async () => {
        if (!selectedApp) return;
        await approveApplication(selectedApp.id, {});
        alert(`Application ${selectedApp.id} approved successfully`);
        handleCloseModal();
        loadApplications();
    };


    const handleSync = async () => {
        await sync();
        alert('Queue synced successfully');
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
                        <button
                            onClick={() => navigate('/officer/dashboard')}
                            className="text-sm font-medium text-govt-blue-dark hover:text-blue-700 flex items-center gap-1"
                        >
                            ← Back to Dashboard
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-govt-text">{t('actions.field_visit')}</h1>
                        <p className="text-gray-600 mt-1">Manage field visits and offline data collection.</p>
                    </div>

                    {/* Offline Queue Status */}
                    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Offline Queue</p>
                                <p className="text-xs text-gray-500">{queueLength} items pending</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSync}
                            disabled={queueLength === 0}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${queueLength === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-govt-blue-light text-white hover:bg-govt-blue-dark shadow-sm'
                                }`}
                        >
                            Sync Now
                        </button>
                    </div>
                </div>

                {/* Applications Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="p-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Application ID</th>
                                    <th className="p-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Applicant Name</th>
                                    <th className="p-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="p-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="p-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Submission Date</th>
                                    <th className="p-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="p-4 text-sm font-medium text-govt-text">{app.id}</td>
                                        <td className="p-4 text-sm text-gray-700">{app.applicantName}</td>
                                        <td className="p-4 text-sm text-gray-700">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                                {app.type}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">{app.location}</td>
                                        <td className="p-4 text-sm text-gray-700">{app.submissionDate}</td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-2">
                                                {app.scheduled ? (
                                                    <span className="px-3 py-1.5 text-xs font-semibold text-gray-700">{app.visitId}</span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleAction(app, 'schedule')}
                                                        className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-semibold rounded hover:bg-gray-50 transition-colors"
                                                    >
                                                        Schedule
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleAction(app, 'view')}
                                                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition-colors shadow-sm"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleAction(app, 'approve')}
                                                    className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition-colors shadow-sm"
                                                >
                                                    Approve
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {applications.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="p-12 text-center text-gray-500">
                                            No pending field visits found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Schedule Visit Modal */}
            {modalType === 'schedule' && selectedApp && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" onClick={handleCloseModal}></div>
                        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
                            <div className="bg-govt-blue-dark px-6 py-4">
                                <h3 className="text-lg font-bold text-white">Schedule Field Visit</h3>
                            </div>
                            <div className="px-6 py-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Enumerator Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={scheduleData.enumeratorName}
                                            onChange={(e) => setScheduleData({ ...scheduleData, enumeratorName: e.target.value })}
                                            placeholder="Enter enumerator name"
                                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Registration No. <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={scheduleData.registrationNo}
                                            onChange={(e) => setScheduleData({ ...scheduleData, registrationNo: e.target.value })}
                                            placeholder="Enter registration number"
                                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Visit Location <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={scheduleData.place}
                                            onChange={(e) => setScheduleData({ ...scheduleData, place: e.target.value })}
                                            placeholder="Enter address"
                                            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Date <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                value={scheduleData.date}
                                                onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                                                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Time <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="time"
                                                value={scheduleData.time}
                                                onChange={(e) => setScheduleData({ ...scheduleData, time: e.target.value })}
                                                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
                                <button
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleScheduleSubmit}
                                    className="px-4 py-2 bg-govt-blue-light text-white font-medium rounded hover:bg-govt-blue-dark transition-colors shadow-sm"
                                >
                                    Schedule
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* View Modal */}
            {modalType === 'view' && selectedApp && (
                 <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                 <div className="flex min-h-full items-center justify-center p-4">
                     <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" onClick={handleCloseModal}></div>
                     <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
                         <div className="bg-govt-blue-dark px-6 py-4">
                             <h3 className="text-lg font-bold text-white">View Details</h3>
                         </div>
                         <div className="px-6 py-6">
                            <p>Viewing details for application: {selectedApp.id}</p>
                         </div>
                         <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
                             <button
                                 onClick={handleCloseModal}
                                 className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors"
                             >
                                 Close
                             </button>
                         </div>
                     </div>
                 </div>
             </div>
            )}

            {/* Approve Confirmation Modal */}
            {modalType === 'approve' && selectedApp && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" onClick={handleCloseModal}></div>
                        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
                            <div className="bg-green-600 px-6 py-4">
                                <h3 className="text-lg font-bold text-white">Approve After Field Visit</h3>
                            </div>
                            <div className="px-6 py-6">
                                <p className="text-gray-700 mb-4">
                                    Are you sure you want to approve the application for <span className="font-bold">{selectedApp.applicantName}</span>?
                                </p>
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                                    <p className="text-sm font-bold text-yellow-800 mb-1">Checklist:</p>
                                    <ul className="list-disc list-inside text-sm text-yellow-700">
                                        <li>Field visit completed</li>
                                        <li>Documents verified physically</li>
                                        <li>Photos uploaded</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
                                <button
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleApprove}
                                    className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors shadow-sm"
                                >
                                    Confirm Approve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FieldEnumerator;
