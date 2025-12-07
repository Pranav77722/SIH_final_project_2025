import React from 'react';
import { useProjectStore } from '../store/ProjectContext';
import Card from './ui/Card';
import Input from './ui/Input';
import Select from './ui/Select';

const IncomeGenerationForm = () => {
    const { state, setField } = useProjectStore();
    const { incomeGeneration } = state;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setField(`incomeGeneration.${name}`, type === 'checkbox' ? checked : value);
    };

    return (
        <Card title="6. Income Generation Activity Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                    label="Domain"
                    name="domain"
                    value={incomeGeneration.domain}
                    onChange={handleChange}
                    options={[
                        { value: 'AGRICULTURE', label: 'Agriculture' },
                        { value: 'HANDICRAFTS', label: 'Handicrafts' },
                        { value: 'SMALL_BUSINESS', label: 'Small Business' }
                    ]}
                />

                <Input
                    label="Sub-Domain"
                    name="subDomain"
                    value={incomeGeneration.subDomain}
                    onChange={handleChange}
                />

                <div className="col-span-2 flex items-center mb-2">
                    <input
                        type="checkbox"
                        name="isExistingAgencyIdentified"
                        checked={incomeGeneration.isExistingAgencyIdentified}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                        Is Existing Agency Identified?
                    </label>
                </div>

                <Input
                    label="Cost Per Beneficiary (₹)"
                    name="costPerBeneficiary"
                    type="number"
                    value={incomeGeneration.costPerBeneficiary}
                    onChange={handleChange}
                />

                <Input
                    label="Number of Beneficiaries"
                    name="numberOfBeneficiaries"
                    type="number"
                    value={incomeGeneration.numberOfBeneficiaries}
                    onChange={handleChange}
                />

                <Input
                    label="Loan Amount from Bank (₹)"
                    name="loanAmountBank"
                    type="number"
                    value={incomeGeneration.loanAmountBank}
                    onChange={handleChange}
                />

                <Input
                    label="Own Source Contribution (₹)"
                    name="ownSourceContribution"
                    type="number"
                    value={incomeGeneration.ownSourceContribution}
                    onChange={handleChange}
                />

                <Input
                    label="Stree Nidhi Funds (₹)"
                    name="streeFunds"
                    type="number"
                    value={incomeGeneration.streeFunds}
                    onChange={handleChange}
                />

                <Input
                    label="Financial Assistance / Subsidy (₹)"
                    name="financialAssistanceSubsidy"
                    type="number"
                    value={incomeGeneration.financialAssistanceSubsidy}
                    onChange={handleChange}
                />

                <Input
                    label="Grant from PMAGY (₹)"
                    name="grantFromPMAGY"
                    type="number"
                    value={incomeGeneration.grantFromPMAGY}
                    onChange={handleChange}
                />

                <Input
                    label="Amount from Other Sources (₹)"
                    name="amountFromOtherSources"
                    type="number"
                    value={incomeGeneration.amountFromOtherSources}
                    onChange={handleChange}
                />

                <div className="col-span-2 mt-4 p-4 bg-blue-50 rounded-lg">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Total Proposed Cost (Income Gen)</label>
                    <Input
                        name="totalProposedCostIncome"
                        type="number"
                        value={incomeGeneration.totalProposedCostIncome}
                        onChange={handleChange}
                        placeholder="Auto-calculated or Manual Override"
                    />
                </div>
            </div>
        </Card>
    );
};

export default IncomeGenerationForm;
