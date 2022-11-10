export const truncate = (str, words) => {
  const strArray = str?.split(" ");
  if (strArray?.length > words) {
    return `${str.split(" ").slice(0, words).join(" ")} ...`;
  } else {
    return str;
  }
};

export const getProductQty = (stats, userId) => {
  let count;
  stats?.forEach(item => {
    if (item._id === userId) {
      count = item.count;
    }
  });

  return count;
};

export const replaceAt = (array, index, value) => {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
};
