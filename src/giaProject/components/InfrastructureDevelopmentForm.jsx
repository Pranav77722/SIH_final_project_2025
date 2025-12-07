import React from 'react';
import { useProjectStore } from '../store/ProjectContext';
import Card from './ui/Card';
import Input from './ui/Input';
import Select from './ui/Select';

const InfrastructureDevelopmentForm = () => {
    const { state, setField } = useProjectStore();
    const { infrastructureDevelopment } = state;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setField(`infrastructureDevelopment.${name}`, type === 'checkbox' ? checked : value);
    };

    return (
        <Card title="5. Infrastructure Development Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                    label="Area Type"
                    name="areaType"
                    value={infrastructureDevelopment.areaType}
                    onChange={handleChange}
                    options={[
                        { value: 'RURAL', label: 'Rural' },
                        { value: 'URBAN', label: 'Urban' },
                        { value: 'TRIBAL', label: 'Tribal' }
                    ]}
                />

                <Select
                    label="Type of Infrastructure"
                    name="typeOfInfrastructure"
                    value={infrastructureDevelopment.typeOfInfrastructure}
                    onChange={handleChange}
                    options={[
                        { value: 'NEW_CONSTRUCTION', label: 'New Construction' },
                        { value: 'RENOVATION', label: 'Renovation/Upgrade' }
                    ]}
                />

                <Input
                    label="Sub-Type Infrastructure"
                    name="subTypeInfrastructure"
                    value={infrastructureDevelopment.subTypeInfrastructure}
                    onChange={handleChange}
                />

                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Infrastructure Description</label>
                    <textarea
                        name="infrastructureDescription"
                        value={infrastructureDevelopment.infrastructureDescription}
                        onChange={handleChange}
                        rows="3"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border"
                    />
                </div>

                <Input
                    label="Cost of Construction in Financial Year (₹)"
                    name="costOfConstructionInFinancialYear"
                    type="number"
                    value={infrastructureDevelopment.costOfConstructionInFinancialYear}
                    onChange={handleChange}
                />

                <Input
                    label="Funds Proposed from Other Schemes (₹)"
                    name="fundsProposedOtherSchemes"
                    type="number"
                    value={infrastructureDevelopment.fundsProposedOtherSchemes}
                    onChange={handleChange}
                />

                <Input
                    label="Funds Proposed Under Grant (₹)"
                    name="fundsProposedUnderGrant"
                    type="number"
                    value={infrastructureDevelopment.fundsProposedUnderGrant}
                    onChange={handleChange}
                />

                <div className="col-span-2 space-y-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="siteClearDeclaration"
                            checked={infrastructureDevelopment.siteClearDeclaration}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                            Declaration: Site is clear and free from encumbrances
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="costEstimateVerifiedDeclaration"
                            checked={infrastructureDevelopment.costEstimateVerifiedDeclaration}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                            Declaration: Cost estimates verified by engineer
                        </label>
                    </div>
                </div>

                <div className="col-span-2 mt-4 p-4 bg-blue-50 rounded-lg">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Total Proposed Cost (Infrastructure)</label>
                    <Input
                        name="totalProposedCostInfrastructure"
                        type="number"
                        value={infrastructureDevelopment.totalProposedCostInfrastructure}
                        onChange={handleChange}
                        placeholder="Auto-calculated or Manual Override"
                    />
                </div>
            </div>
        </Card>
    );
};

export default InfrastructureDevelopmentForm;
