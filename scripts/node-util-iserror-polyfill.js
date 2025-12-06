// Prisma 5.2 with Node 24 needs util.isError, which was removed. Patch it.
const util = require('node:util');

if (typeof util.isError !== 'function') {
  const fallback = util.types && typeof util.types.isNativeError === 'function'
    ? util.types.isNativeError
    : (value) => value instanceof Error;

  util.isError = fallback;
}
