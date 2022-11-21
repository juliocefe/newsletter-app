export const showErrors = (errorList) => {
  if (errorList) {
    const errors = errorList.non_field_errors || errorList
    return {
      error: true,
      helperText: errors.join(". "),
    };
  }
  return null;
};
