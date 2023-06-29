const consoleLog = (...args) => {
  console.log(...args);
  if (process.env.NODE_ENV === "productions") return;
};

export default consoleLog;
