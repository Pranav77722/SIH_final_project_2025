import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import CreateScheme from './pages/admin/CreateScheme'
import ReleaseFunds from './pages/admin/ReleaseFunds'
import OfficerLogin from './pages/officer/Login'
import OfficerDashboard from './pages/officer/dashboard/Dashboard'
import DocumentVerification from './pages/officer/dashboard/DocumentVerification'
import FieldEnumerator from './pages/officer/dashboard/FieldEnumerator'
import BeneficiaryProfiling from './pages/officer/dashboard/BeneficiaryProfiling'
import AppliedSchemes from './pages/officer/dashboard/AppliedSchemes'
import PrivateRoute from './protected/PrivateRoute'
import Unauthorized from './pages/Unauthorized'

// PFMS Module Imports
import { PFMSProvider } from './pfms/store/pfmsStore.jsx'
import PFMSDashboard from './pfms/pages/PFMSDashboard'
import BatchDetails from './pfms/pages/BatchDetails'
import BatchCreate from './pfms/components/BatchCreate'

import React, { Suspense } from 'react';

// Lazy load the new module
const CreateProjectPage = React.lazy(() => import('./giaProject/pages/CreateProjectPage'));

function App() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <Routes>
                {/* Landing Page with Role Selection */}
                <Route path="/" element={<Landing />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/create-scheme" element={<CreateScheme />} />
                    <Route path="/admin/release-funds" element={<ReleaseFunds />} />
                    <Route path="/admin/add-skill-courses" element={<CreateProjectPage />} />
                </Route>

                {/* Officer Routes */}
                <Route path="/officer/login" element={<OfficerLogin />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/officer/dashboard" element={<OfficerDashboard />} />
                    <Route path="/officer/dashboard/verification" element={<DocumentVerification />} />
                    <Route path="/officer/dashboard/field-visit" element={<FieldEnumerator />} />
                    <Route path="/officer/dashboard/profiling" element={<BeneficiaryProfiling />} />
                    <Route path="/officer/applied-schemes" element={<AppliedSchemes />} />

                    {/* PFMS Routes - Protected under Officer */}
                    <Route path="/pfms/*" element={
                        <PFMSProvider>
                            <Routes>
                                <Route path="/" element={<PFMSDashboard />} />
                                <Route path="/create" element={<BatchCreate />} />
                                <Route path="/batch/:id" element={<BatchDetails />} />
                            </Routes>
                        </PFMSProvider>
                    } />
                </Route>

                {/* Unauthorized Route */}
                <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
        </Suspense>
    )
}

export default App
