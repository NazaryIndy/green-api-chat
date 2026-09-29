export const normalizePhone = (value: string) => {
  const digits = value.replace(/\D/g, '');

  if (digits.startsWith('8') && digits.length === 11) {
    return `7${digits.slice(1)}`;
  }

  return digits;
};

export const isValidPhone = (value: string) => {
  const phone = normalizePhone(value);

  return phone.length >= 10 && phone.length <= 15;
};
