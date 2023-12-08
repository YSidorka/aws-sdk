async function sleep(time) {
  return new Promise((resolve) => setTimeout(() => resolve(), time)); // eslint-disable-line
}

module.exports = {
  sleep
};
