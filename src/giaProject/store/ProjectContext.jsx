import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { calculateAdminExpenses, calculateProjectTotal, calculateSkillTotal, calculateInfraTotal, calculateIncomeTotal } from '../utils/calculators';

const ProjectContext = createContext();

const initialState = {
    financialYears: [],
    projectInfo: {
        titleOfProject: '',
        description: '',
        objective: '',
        aboutTarget: '',
        targetMinimum: '',
        targetMaximum: ''
    },
    interventionType: 'SKILL_DEVELOPMENT', // Default tab
    skillDevelopment: {
        isExistingAgencyIdentified: false,
        typeOfSkill: '',
        skillIdentified: '',
        courseName: '',
        numberOfBeneficiaries: '',
        expectedExpenditureUnderGrant: '',
        anticipatedExpenditureUnderGrant: '',
        declarationNSQF: false,
        declarationCourseApproved: false,
        totalProposedCostSkill: 0
    },
    infrastructureDevelopment: {
        areaType: '',
        typeOfInfrastructure: '',
        subTypeInfrastructure: '',
        infrastructureDescription: '',
        costOfConstructionInFinancialYear: '',
        fundsProposedOtherSchemes: '',
        fundsProposedUnderGrant: '',
        siteClearDeclaration: false,
        costEstimateVerifiedDeclaration: false,
        totalProposedCostInfrastructure: 0
    },
    incomeGeneration: {
        domain: '',
        subDomain: '',
        isExistingAgencyIdentified: false,
        costPerBeneficiary: '',
        numberOfBeneficiaries: '',
        loanAmountBank: '',
        ownSourceContribution: '',
        streeFunds: '',
        financialAssistanceSubsidy: '',
        grantFromPMAGY: '',
        amountFromOtherSources: '',
        totalProposedCostIncome: 0
    },
    adminExpenses: {
        totalAdminExpenses: 0
    },
    totalProjectCost: {
        grandTotal: 0
    }
};

const projectReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            // action.payload = { path: 'projectInfo.titleOfProject', value: '...' }
            const { path, value } = action.payload;
            const keys = path.split('.');

            if (keys.length === 1) {
                return { ...state, [keys[0]]: value };
            }

            // Handle nested update
            const [section, field] = keys;
            return {
                ...state,
                [section]: {
                    ...state[section],
                    [field]: value
                }
            };

        case 'UPDATE_TOTALS':
            // Recalculate all totals based on current state
            const skillTotal = calculateSkillTotal(state.skillDevelopment);
            const infraTotal = calculateInfraTotal(state.infrastructureDevelopment);
            const incomeTotal = calculateIncomeTotal(state.incomeGeneration);
            const adminTotal = calculateAdminExpenses(skillTotal, infraTotal, incomeTotal);
            const grandTotal = calculateProjectTotal(skillTotal, infraTotal, incomeTotal, adminTotal);

            return {
                ...state,
                skillDevelopment: { ...state.skillDevelopment, totalProposedCostSkill: skillTotal },
                infrastructureDevelopment: { ...state.infrastructureDevelopment, totalProposedCostInfrastructure: infraTotal },
                incomeGeneration: { ...state.incomeGeneration, totalProposedCostIncome: incomeTotal },
                adminExpenses: { totalAdminExpenses: adminTotal },
                totalProjectCost: { grandTotal }
            };

        default:
            return state;
    }
};

export const ProjectProvider = ({ children }) => {
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // Auto-calculate totals whenever cost fields change
    useEffect(() => {
        // We could optimize this to only run on specific changes, but for now run on any change for simplicity
        // dispatch({ type: 'UPDATE_TOTALS' }); 
        // Actually, better to trigger UPDATE_TOTALS explicitly or derived state. 
        // Let's keep it simple: The reducer handles specific field updates, 
        // but we might need a separate effect or just calculate derived state in render.
        // For this requirement "Auto-calculate totals live", we can do it in the reducer or here.
        // Let's do it in the reducer for 'SET_FIELD' if it's a cost field, OR just have a separate action.
        // For simplicity, let's calculate derived values in the component or use a specific action.
    }, [state.skillDevelopment, state.infrastructureDevelopment, state.incomeGeneration]);

    const setField = (path, value) => {
        dispatch({ type: 'SET_FIELD', payload: { path, value } });
        // Trigger recalc after field update
        setTimeout(() => dispatch({ type: 'UPDATE_TOTALS' }), 0);
    };

    return (
        <ProjectContext.Provider value={{ state, setField }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectStore = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProjectStore must be used within a ProjectProvider');
    }
    return context;
};
