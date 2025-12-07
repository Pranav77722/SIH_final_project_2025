import React from 'react';
import { ProjectProvider, useProjectStore } from '../store/ProjectContext';
import FinancialYearSelector from '../components/FinancialYearSelector';
import ProjectInfoForm from '../components/ProjectInfoForm';
import InterventionTabs from '../components/InterventionTabs';
import SkillDevelopmentForm from '../components/SkillDevelopmentForm';
import InfrastructureDevelopmentForm from '../components/InfrastructureDevelopmentForm';
import IncomeGenerationForm from '../components/IncomeGenerationForm';
import CostAdministrationForm from '../components/CostAdministrationForm';
import TotalProjectCostSummary from '../components/TotalProjectCostSummary';
import { validateProjectInfo, validateSkillDevelopment } from '../utils/validators';

import { db, auth } from '../../firebase/client';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreateProjectContent = () => {
    const { state } = useProjectStore();
    const navigate = useNavigate();

    const handleSave = async () => {
        // Basic validation example
        const infoErrors = validateProjectInfo(state.projectInfo);
        if (Object.keys(infoErrors).length > 0) {
            alert("Please fix errors in Project Information: " + Object.values(infoErrors).join(", "));
            return;
        }

        try {
            // Construct final payload
            const payload = {
                financialYears: state.financialYears,
                projectInfo: state.projectInfo,
                interventionType: state.interventionType,
                skillDevelopment: state.skillDevelopment,
                infrastructureDevelopment: state.infrastructureDevelopment,
                incomeGeneration: state.incomeGeneration,
                administrationCost: state.adminExpenses,
                projectCost: state.totalProjectCost,
                createdAt: serverTimestamp(),
                createdBy: auth.currentUser ? auth.currentUser.email : 'anonymous',
                status: 'DRAFT'
            };

            console.log("Saving Payload:", payload);

            // Save to 'gia_projects' collection
            const docRef = await addDoc(collection(db, "gia_projects"), payload);

            alert(`Project Saved Successfully! ID: ${docRef.id}`);
            navigate('/admin/dashboard'); // Redirect to dashboard after save

        } catch (error) {
            console.error("Error saving project:", error);
            alert("Failed to save project: " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Create New Project (GIA)</h1>
                    <div className="flex space-x-4">
                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
                        >
                            Save Project
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <FinancialYearSelector />
                <ProjectInfoForm />

                <InterventionTabs />

                {state.interventionType === 'SKILL_DEVELOPMENT' && <SkillDevelopmentForm />}
                {state.interventionType === 'INFRASTRUCTURE_DEVELOPMENT' && <InfrastructureDevelopmentForm />}
                {state.interventionType === 'INCOME_GENERATION' && <IncomeGenerationForm />}

                <CostAdministrationForm />
                <TotalProjectCostSummary />
            </main>
        </div>
    );
};

const CreateProjectPage = () => {
    return (
        <ProjectProvider>
            <CreateProjectContent />
        </ProjectProvider>
    );
};

export default CreateProjectPage;
