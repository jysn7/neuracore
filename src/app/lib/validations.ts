import { z } from "zod";

// Base schemas
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string().min(3).max(50),
  fullName: z.string().min(2).max(100).optional(),
  avatarUrl: z.string().url().optional(),
  bio: z.string().max(500).optional(),
});

export const ideaSchema = z.object({
  title: z.string().min(5).max(200),
  summary: z.string().min(10).max(500),
  content: z.string().min(50),
  category: z.string().min(2).max(50),
  tags: z.array(z.string()).min(1).max(10),
});

export const commentSchema = z.object({
  content: z.string().min(1).max(1000),
  ideaId: z.string().uuid(),
});

export const notificationSchema = z.object({
  type: z.enum(["like", "comment", "follow", "achievement"]),
  content: z.string().max(500),
  userId: z.string().uuid(),
});

// Request validation schemas
export const createIdeaSchema = ideaSchema.extend({
  coverImg: z.any().optional(),
});

export const updateIdeaSchema = ideaSchema.partial();

export const createCommentSchema = commentSchema;

export const updateCommentSchema = commentSchema.pick({ content: true });

export const toggleLikeSchema = z.object({
  ideaId: z.string().uuid(),
});

export const updateNotificationSchema = z.object({
  notificationIds: z.array(z.string().uuid()),
});

// Error handling helpers
export type ValidationError = {
  field: string;
  message: string;
  code?: string;
};

export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
  errorMessage?: string;
};

export function validateRequest<T>(
  schema: z.Schema<T>,
  data: unknown,
  options: { stripUnknown?: boolean } = {}
): ValidationResult<T> {
  try {
    const validatedData = options.stripUnknown 
      ? schema.parse(data)
      : schema.parse(data);

    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.map((issue) => ({
        field: issue.path.join(".") || "unknown",
        message: issue.message,
        code: issue.code
      }));

      const errorMessage = formattedErrors
        .map((err: ValidationError) => `${err.field}: ${err.message}`)
        .join("; ");

      return {
        success: false,
        errors: formattedErrors,
        errorMessage: `Validation failed: ${errorMessage}`
      };
    }

    // Handle unexpected errors
    console.error("Unexpected validation error:", error);
    return {
      success: false,
      errors: [{ 
        field: "unknown", 
        message: "An unexpected error occurred during validation",
        code: "VALIDATION_ERROR"
      }],
      errorMessage: "An unexpected error occurred during validation"
    };
  }
}
