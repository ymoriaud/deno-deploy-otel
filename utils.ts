// Code from Luca Casonato & Andy Jiang article on https://deno.com/blog/zero-config-debugging-deno-opentelemetry
import { type Span, SpanStatusCode, trace } from "@opentelemetry/api";
import Deno from "./deno.json" with { type: "json" };

const tracer = trace.getTracer(Deno.name, Deno.version);

export function withSpan<Args extends unknown[], T>(
  name: string,
  cb: (span: Span, ...args: Args) => Promise<T>,
): (...args: Args) => Promise<T> {
  return (...args: Args) => {
    return tracer.startActiveSpan(name, async (span) => {
      try {
        return await cb(span, ...args);
      } catch (err) {
        span.setStatus({ code: SpanStatusCode.ERROR, message: String(err) });
        span.recordException(err as Error);
        throw err;
      } finally {
        span.end();
      }
    });
  };
}
