type LogLevel = "debug" | "info" | "warn" | "error";

interface LogMetadata {
  userId?: string;
  requestId?: string;
  path?: string;
  method?: string;
  [key: string]: unknown;
}

class Logger {
  private static instance: Logger;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    metadata?: LogMetadata,
  ): string {
    const timestamp = new Date().toISOString();
    const metadataStr = metadata ? ` ${JSON.stringify(metadata)}` : "";
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metadataStr}`;
  }

  private log(level: LogLevel, message: string, metadata?: LogMetadata): void {
    const formattedMessage = this.formatMessage(level, message, metadata);

    switch (level) {
      case "debug":
        console.debug(formattedMessage);
        break;
      case "info":
        console.info(formattedMessage);
        break;
      case "warn":
        console.warn(formattedMessage);
        break;
      case "error":
        console.error(formattedMessage);
        break;
    }

    // Here you would typically send logs to your logging service
    // Example: await sendToLoggingService(level, message, metadata);
  }

  debug(message: string, metadata?: LogMetadata): void {
    this.log("debug", message, metadata);
  }

  info(message: string, metadata?: LogMetadata): void {
    this.log("info", message, metadata);
  }

  warn(message: string, metadata?: LogMetadata): void {
    this.log("warn", message, metadata);
  }

  error(message: string, metadata?: LogMetadata): void {
    this.log("error", message, metadata);
  }

  // Performance monitoring
  async trackPerformance<T>(
    name: string,
    fn: () => Promise<T>,
    metadata?: LogMetadata,
  ): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.info(`Performance: ${name}`, { ...metadata, duration_ms: duration });
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.error(`Performance Error: ${name}`, {
        ...metadata,
        duration_ms: duration,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  }
}

export const logger = Logger.getInstance();
