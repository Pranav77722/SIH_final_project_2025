import React from 'react';
import { useProjectStore } from '../store/ProjectContext';
import Card from './ui/Card';
import Input from './ui/Input';
import Select from './ui/Select';

const SkillDevelopmentForm = () => {
    const { state, setField } = useProjectStore();
    const { skillDevelopment } = state;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setField(`skillDevelopment.${name}`, type === 'checkbox' ? checked : value);
    };

    return (
        <Card title="4. Skill Development Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2 flex items-center mb-2">
                    <input
                        type="checkbox"
                        name="isExistingAgencyIdentified"
                        checked={skillDevelopment.isExistingAgencyIdentified}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                        Is Existing Agency Identified?
                    </label>
                </div>

                <Select
                    label="Type of Skill"
                    name="typeOfSkill"
                    value={skillDevelopment.typeOfSkill}
                    onChange={handleChange}
                    options={[
                        { value: 'TECHNICAL', label: 'Technical' },
                        { value: 'VOCATIONAL', label: 'Vocational' },
                        { value: 'SOFT_SKILLS', label: 'Soft Skills' }
                    ]}
                />

                <Input
                    label="Skill Identified"
                    name="skillIdentified"
                    value={skillDevelopment.skillIdentified}
                    onChange={handleChange}
                />

                <Input
                    label="Course Name"
                    name="courseName"
                    value={skillDevelopment.courseName}
                    onChange={handleChange}
                />

                <Input
                    label="Number of Beneficiaries"
                    name="numberOfBeneficiaries"
                    type="number"
                    value={skillDevelopment.numberOfBeneficiaries}
                    onChange={handleChange}
                />

                <Input
                    label="Expected Expenditure Under Grant (₹)"
                    name="expectedExpenditureUnderGrant"
                    type="number"
                    value={skillDevelopment.expectedExpenditureUnderGrant}
                    onChange={handleChange}
                />

                <Input
                    label="Anticipated Expenditure Under Grant (₹)"
                    name="anticipatedExpenditureUnderGrant"
                    type="number"
                    value={skillDevelopment.anticipatedExpenditureUnderGrant}
                    onChange={handleChange}
                />

                <div className="col-span-2 space-y-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="declarationNSQF"
                            checked={skillDevelopment.declarationNSQF}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                            Declaration: Course aligned with NSQF
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="declarationCourseApproved"
                            checked={skillDevelopment.declarationCourseApproved}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                            Declaration: Course approved by competent authority
                        </label>
                    </div>
                </div>

                <div className="col-span-2 mt-4 p-4 bg-blue-50 rounded-lg">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Total Proposed Cost (Skill)</label>
                    <Input
                        name="totalProposedCostSkill"
                        type="number"
                        value={skillDevelopment.totalProposedCostSkill}
                        onChange={handleChange}
                        placeholder="Auto-calculated or Manual Override"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter the total cost if not auto-calculated from sub-components.</p>
                </div>
            </div>
        </Card>
    );
};

export default SkillDevelopmentForm;
