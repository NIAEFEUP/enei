export function lazy<T>(fn: () => T) {
  const lazyObj = {
    state: { valid: false } as { valid: false } | { valid: true; value: T },

    get: function () {
      if (this.state.valid) {
        return this.state.value;
      }

      this.state = { valid: true, value: fn() };

      return this.state.value;
    },
  };

  Object.defineProperty(lazyObj.get, "name", { value: fn.name, writable: true });
  return lazyObj;
}
