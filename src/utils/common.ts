export const getSelectOptionList = (
  optionList: { [key: string]: string }[],
  labelKey: string,
  valueKey: string,
) => {
  const options = optionList.map((o) => ({
    label: o[labelKey],
    value: o[valueKey],
  }));
  return options;
};
