export const calculateAdminExpenses = (skillTotal, infraTotal, incomeTotal) => {
    const total = (Number(skillTotal) || 0) + (Number(infraTotal) || 0) + (Number(incomeTotal) || 0);
    return total * 0.04; // 4% Admin Expenses
};

export const calculateProjectTotal = (skillTotal, infraTotal, incomeTotal, adminExpenses) => {
    return (Number(skillTotal) || 0) + (Number(infraTotal) || 0) + (Number(incomeTotal) || 0) + (Number(adminExpenses) || 0);
};

export const calculateSkillTotal = (data) => {
    return Number(data.totalProposedCostSkill) || 0;
};

export const calculateInfraTotal = (data) => {
    return Number(data.totalProposedCostInfrastructure) || 0;
};

export const calculateIncomeTotal = (data) => {
    return Number(data.totalProposedCostIncome) || 0;
};
