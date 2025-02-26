import { isString } from "lodash-es";

class SjUIError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "SjUIError";
  }
}
function createSjUIError(scope: string, msg: string) {
  return new SjUIError(`[${scope}]:${msg}`);
}

export function throwError(scope: string, msg: string) {
  throw createSjUIError(scope, msg);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? createSjUIError(scope, msg!) : scope;
    console.warn(err);
  }
}