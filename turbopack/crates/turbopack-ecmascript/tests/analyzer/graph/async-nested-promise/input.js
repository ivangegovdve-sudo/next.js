// An async function that returns a promise-returning call without awaiting it resolves to the
// inner value, not to a promise. `Promise<Promise<T>>` is not representable, so the modelled
// value must collapse to `Promise<T>` and awaiting it must not look truthy.

async function findRow() {
  return null;
}

// The wrapper returns the promise from `findRow` without awaiting it.
async function findRowWrapped() {
  return findRow();
}

async function findRowWrappedTwice() {
  return findRowWrapped();
}

// Same, but each branch of the returned expression is a promise.
async function findRowConditional(useFirst) {
  return useFirst ? findRow() : findRowWrapped();
}

export const awaited = await findRowWrapped();
export const awaitedTwice = await findRowWrappedTwice();
export const awaitedConditional = await findRowConditional(true);

// Not awaited, so this one really is a promise.
export const notAwaited = findRowWrapped();
