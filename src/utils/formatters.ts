export function formatAED(amount: number): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 0,
  }).format(amount).replace('AED', 'AED ');
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-AE').format(num);
}
