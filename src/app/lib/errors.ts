import { NextResponse } from "next/server";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function handleError(error: unknown) {
  console.error("Error:", error);

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: {
          message: error.message,
          code: error.code,
          details: error.details,
        },
      },
      { status: error.statusCode },
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        error: {
          message: error.message,
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      error: {
        message: "An unexpected error occurred",
        code: "INTERNAL_ERROR",
      },
    },
    { status: 500 },
  );
}

// Common errors
export const Errors = {
  Unauthorized: new AppError(401, "Unauthorized", "UNAUTHORIZED"),
  Forbidden: new AppError(403, "Forbidden", "FORBIDDEN"),
  NotFound: new AppError(404, "Resource not found", "NOT_FOUND"),
  ValidationError: (details: unknown) =>
    new AppError(400, "Validation error", "VALIDATION_ERROR", details),
  RateLimit: new AppError(429, "Too many requests", "RATE_LIMIT"),
  DatabaseError: (message: string) =>
    new AppError(500, message, "DATABASE_ERROR"),
  StorageError: (message: string) =>
    new AppError(500, message, "STORAGE_ERROR"),
} as const;
