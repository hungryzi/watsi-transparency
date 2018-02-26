export function formatCurrency(amount) {
  return amount.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function toFilterString(year, month) {
  return month > 9 ? `${year}-${month}` : `${year}-0${month}`;
}
