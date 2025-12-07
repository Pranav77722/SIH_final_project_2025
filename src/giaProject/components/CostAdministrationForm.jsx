import React, { useEffect } from 'react';
import { useProjectStore } from '../store/ProjectContext';
import Card from './ui/Card';
import Input from './ui/Input';

const CostAdministrationForm = () => {
    const { state, setField } = useProjectStore();
    const { adminExpenses } = state;

    // We can display the breakdown here if needed, but for now just the total
    return (
        <Card title="7. Administrative Expenses (4%)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">
                        Administrative expenses are automatically calculated as 4% of the total project cost (Skill + Infrastructure + Income Generation).
                    </p>
                    <div className="flex items-center justify-between mt-4">
                        <span className="font-bold text-gray-700">Total Admin Expenses:</span>
                        <span className="text-xl font-bold text-blue-600">
                            ₹ {Number(adminExpenses.totalAdminExpenses).toLocaleString('en-IN')}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CostAdministrationForm;
