import React from 'react';
import { useProjectStore } from '../store/ProjectContext';
import Card from './ui/Card';

const FinancialYearSelector = () => {
    const { state, setField } = useProjectStore();
    const years = ['2023-24', '2024-25', '2025-26', '2026-27'];

    const handleToggle = (year) => {
        const currentYears = state.financialYears || [];
        const newYears = currentYears.includes(year)
            ? currentYears.filter(y => y !== year)
            : [...currentYears, year];

        setField('financialYears', newYears);
    };

    return (
        <Card title="1. Financial Year Selection">
            <div className="flex flex-wrap gap-4">
                {years.map(year => (
                    <button
                        key={year}
                        onClick={() => handleToggle(year)}
                        className={`px-4 py-2 rounded-lg border font-medium transition-colors ${state.financialYears.includes(year)
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {year}
                    </button>
                ))}
            </div>
            {state.financialYears.length === 0 && (
                <p className="text-xs text-red-500 mt-2">Please select at least one financial year.</p>
            )}
        </Card>
    );
};

export default FinancialYearSelector;
