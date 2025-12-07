import React from 'react';
import { useProjectStore } from '../store/ProjectContext';
import Card from './ui/Card';
import Input from './ui/Input';

const ProjectInfoForm = () => {
    const { state, setField } = useProjectStore();
    const { projectInfo } = state;

    const handleChange = (e) => {
        setField(`projectInfo.${e.target.name}`, e.target.value);
    };

    return (
        <Card title="2. Project Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                    <Input
                        label="Title of Project"
                        name="titleOfProject"
                        value={projectInfo.titleOfProject}
                        onChange={handleChange}
                        placeholder="Enter project title"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={projectInfo.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border"
                        placeholder="Brief description of the project"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Objective</label>
                    <textarea
                        name="objective"
                        value={projectInfo.objective}
                        onChange={handleChange}
                        rows="3"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border"
                        placeholder="Project objectives"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">About Target Group</label>
                    <textarea
                        name="aboutTarget"
                        value={projectInfo.aboutTarget}
                        onChange={handleChange}
                        rows="2"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border"
                        placeholder="Details about the target beneficiaries"
                    />
                </div>
                <Input
                    label="Target Minimum"
                    name="targetMinimum"
                    type="number"
                    value={projectInfo.targetMinimum}
                    onChange={handleChange}
                    min="1"
                />
                <Input
                    label="Target Maximum"
                    name="targetMaximum"
                    type="number"
                    value={projectInfo.targetMaximum}
                    onChange={handleChange}
                    min="1"
                />
            </div>
        </Card>
    );
};

export default ProjectInfoForm;
