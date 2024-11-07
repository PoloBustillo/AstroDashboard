interface INormalizedError {
  /**
   * Original error.
   */
  err: unknown;

  /**
   * Is error instance?
   */
  isError: boolean;

  /**
   * Error object.
   */
  error?: Error;

  /**
   * Call stack.
   */
  stack?: Error["stack"];

  /**
   * Error message.
   */
  message: string;

  toString(): string;
}

export const res = (
  body: string,
  {
    status,
    statusText,
    headers,
  }: { status?: number; statusText?: string; headers?: Headers },
) => new Response(body, { status, statusText, headers });

export function normalizeError(err: unknown): Readonly<INormalizedError> {
  const result: INormalizedError = {
    err,
    message: "",
    isError: false,
    toString() {
      return this.message;
    },
  };

  if (err instanceof Error) {
    result.error = err;
    result.message = err.message;
    result.stack = err.stack;
    result.isError = true;
    result.toString = () => err.toString();
  } else if (typeof err === "string") {
    result.error = new Error(err);
    result.message = err;
    result.stack = result.error.stack;
  } else {
    const aErr = err as any;

    if (typeof err === "object") {
      result.message = aErr?.message ? aErr.message : String(aErr);
      result.toString = () => {
        const m =
          err && typeof err.toString === "function"
            ? err.toString()
            : result.message;
        return m === "[object Object]" ? result.message : m;
      };
    } else if (typeof err === "function") {
      return normalizeError(err());
    } else {
      result.message = String(`[${typeof err}] ${aErr}`);
    }

    result.error = new Error(result.message);
    result.stack = aErr?.stack ? aErr.stack : result.error.stack;
  }

  return result;
}
