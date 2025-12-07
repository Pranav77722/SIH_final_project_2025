import React from 'react';
import { useProjectStore } from '../store/ProjectContext';
import Card from './ui/Card';

const TotalProjectCostSummary = () => {
    const { state } = useProjectStore();
    const { skillDevelopment, infrastructureDevelopment, incomeGeneration, adminExpenses, totalProjectCost } = state;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount || 0);
    };

    return (
        <Card title="8. Total Project Cost Summary">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Component</th>
                            <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Skill Development</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                {formatCurrency(skillDevelopment.totalProposedCostSkill)}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Infrastructure Development</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                {formatCurrency(infrastructureDevelopment.totalProposedCostInfrastructure)}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Income Generation</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                {formatCurrency(incomeGeneration.totalProposedCostIncome)}
                            </td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">Sub Total</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                                {formatCurrency(
                                    (Number(skillDevelopment.totalProposedCostSkill) || 0) +
                                    (Number(infrastructureDevelopment.totalProposedCostInfrastructure) || 0) +
                                    (Number(incomeGeneration.totalProposedCostIncome) || 0)
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Admin Expenses (4%)</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                {formatCurrency(adminExpenses.totalAdminExpenses)}
                            </td>
                        </tr>
                        <tr className="bg-blue-50">
                            <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-govt-blue-dark">Grand Total</td>
                            <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-govt-blue-dark text-right">
                                {formatCurrency(totalProjectCost.grandTotal)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default TotalProjectCostSummary;
