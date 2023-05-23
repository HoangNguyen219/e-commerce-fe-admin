export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};

export const capitalize = (str) => {
  const arr = str.split(' ');
  const capitalizedArr = arr.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedArr.join(' ');
};

export const addAll = (arr) => {
  return [{ id: 'all', name: 'All' }, ...arr];
};

export const toInt = (number) => {
  const parsedInt = parseInt(number);
  return isNaN(parsedInt) || parsedInt.toString() != number ? 'NaN' : parsedInt;
};

export const dateToString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
