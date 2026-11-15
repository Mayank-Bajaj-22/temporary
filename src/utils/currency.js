/**
 * Format number into Indian Rupee representation (₹)
 * Uses standard Intl.NumberFormat for India ('en-IN')
 */
export const formatCurrency = (amount, includeDecimals = false) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  }).format(amount);
};
