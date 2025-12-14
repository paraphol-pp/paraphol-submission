export const formatCurrency = (amount: number) => {

  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('th-TH', {
    // d/m/y time
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit',minute: '2-digit'
  }).format(date);
};
