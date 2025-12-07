export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatStatus = (status) => {
  switch (status) {
    case 'DRAFT': return 'Draft';
    case 'VALIDATED': return 'Validated';
    case 'PENDING_APPROVAL_1': return 'Pending Approval 1';
    case 'PENDING_APPROVAL_2': return 'Pending Approval 2';
    case 'APPROVED': return 'Approved';
    case 'SUBMITTED': return 'Submitted';
    case 'PROCESSED': return 'Processed';
    case 'FAILED': return 'Failed';
    default: return status;
  }
};
