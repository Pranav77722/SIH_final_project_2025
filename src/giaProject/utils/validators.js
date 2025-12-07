export const validateProjectInfo = (data) => {
    const errors = {};
    if (!data.titleOfProject) errors.titleOfProject = "Project Title is required";
    if (!data.description) errors.description = "Description is required";
    if (!data.targetMinimum || data.targetMinimum < 1) errors.targetMinimum = "Minimum target must be at least 1";
    return errors;
};

export const validateSkillDevelopment = (data) => {
    const errors = {};
    if (!data.typeOfSkill) errors.typeOfSkill = "Skill Type is required";
    if (!data.numberOfBeneficiaries || data.numberOfBeneficiaries <= 0) errors.numberOfBeneficiaries = "Beneficiaries must be greater than 0";
    return errors;
};

// Add other validators as needed
