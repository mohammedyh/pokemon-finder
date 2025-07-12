function useDebounce(callback, wait) {
  let timeout = null;
  return (...args) => {
    clearTimeout(timeout);
    setTimeout(() => callback.apply(null, args), wait);
  };
}

export default useDebounce;
