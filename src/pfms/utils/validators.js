export const validateBatchData = (batch) => {
  const errors = [];
  const warnings = [];

  if (!batch.beneficiaries || batch.beneficiaries.length === 0) {
    errors.push("Batch must contain at least one beneficiary.");
  }

  const totalAmount = batch.beneficiaries.reduce((sum, b) => sum + (b.amount || 0), 0);
  if (totalAmount > 10000000) { // 1 Crore limit example
    warnings.push("Total batch amount exceeds ₹1 Crore. Additional scrutiny required.");
  }

  batch.beneficiaries.forEach((b, index) => {
    if (!b.accountNumber || b.accountNumber.length < 9) {
      errors.push(`Beneficiary #${index + 1} (${b.name}) has invalid account number.`);
    }
    if (!b.ifsc || b.ifsc.length !== 11) {
      errors.push(`Beneficiary #${index + 1} (${b.name}) has invalid IFSC code.`);
    }
  });

  return { errors, warnings };
};
