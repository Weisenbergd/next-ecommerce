export function transformFormValues(formData: FormData, group?: string) {
  const formValues: { [key: string]: any } = {};

  const valueMap: { [key: string]: any[] } = {};

  // Process each entry from FormData
  formData.forEach((value, key) => {
    if (!valueMap[key]) {
      valueMap[key] = [];
    }

    // Handle file values and non-file values separately
    if (value instanceof Blob) {
      valueMap[key].push(value);
    } else {
      // Convert value to array if it's not a File
      valueMap[key].push(value);
    }
  });

  // Convert valueMap to formValues with proper array handling
  for (const key in valueMap) {
    if (valueMap[key].length === 1) {
      formValues[key] = valueMap[key][0];
    } else {
      formValues[key] = valueMap[key];
    }
  }

  return formValues;
}
