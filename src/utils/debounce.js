const debouncer = (cb, waitTime) => {
  let timer;

  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, waitTime);
  };
};

export default debouncer;
