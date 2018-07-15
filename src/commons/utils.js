export const isEmpty = (value) => {
  // Null value is empty
  if (value === null) {
    return true;
  }
  // Undefined value is empty
  if (value === undefined) {
    return true;
  }
  // Arrays and strings are empty if they have a length of zero
  if (Array.isArray(value) || typeof value === "string" || typeof value.splice === "function") {
    return !value.length;
  }

  // Objects are empty if they don't have any keys
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
};

export const parseError = (error) => {
  const { response } = error;
  const validationCodes = response.data.length ? response.data : [];
  // eslint-disable-next-line no-throw-literal
  throw {
    response,
    status: response.status,
    validationCodes,
    statusText: response.statusText
  };
};
