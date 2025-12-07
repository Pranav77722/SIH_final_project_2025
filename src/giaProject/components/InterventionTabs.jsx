import React from 'react';
import { useProjectStore } from '../store/ProjectContext';
import Tabs from './ui/Tabs';

const InterventionTabs = () => {
    const { state, setField } = useProjectStore();

    const tabs = [
        { id: 'SKILL_DEVELOPMENT', label: 'Skill Development' },
        { id: 'INFRASTRUCTURE_DEVELOPMENT', label: 'Infrastructure Development' },
        { id: 'INCOME_GENERATION', label: 'Income Generation Activity' }
    ];

    return (
        <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">3. Intervention Type</h3>
            <Tabs
                tabs={tabs}
                activeTab={state.interventionType}
                onTabChange={(id) => setField('interventionType', id)}
            />
        </div>
    );
};

export default InterventionTabs;
