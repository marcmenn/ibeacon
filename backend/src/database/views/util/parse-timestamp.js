export default (...args) => {
  for (const x of args) {
    try {
      return new Date(x)
    } catch (e) {
      // ignore
    }
  }
  return 0
}
