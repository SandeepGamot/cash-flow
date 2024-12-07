export const normalise = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s_-]/g, "__");
};

export const denormalise = (value: string) => {
  return value
    .split(/__/)
    .map((v) => toTitleCase(v))
    .join(" ");
};

export const toTitleCase = (value: string) => {
  return 0 < value.length
    ? value[0].toUpperCase() + value.substring(1).toLowerCase()
    : value;
};
