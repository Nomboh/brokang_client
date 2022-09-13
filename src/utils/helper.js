export const truncate = (str, words) => {
  const strArray = str.split(" ");
  if (strArray.length > words) {
    return `${str.split(" ").slice(0, words).join(" ")} ...`;
  } else {
    return str;
  }
};
