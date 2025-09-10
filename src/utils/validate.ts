export const isNull = (value = '') => {
  if (value && value !== 'null') {
    return value;
  }
  return '';
};

export const isEmpty = (value = '') => {
  return value == null || value === '' || value === undefined;
};
