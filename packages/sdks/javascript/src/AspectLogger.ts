
export type Log = {
    level: LogLevel;
    message?: string;
    timestamp: Date;
    context: Record<string, any>;
}

/** @internal */
export const LogLevel = Object.freeze({
    CRITICAL: 'critical',
    ERROR: 'error',
    WARNING: 'warn',
    INFORMATIONAL: 'info',
    DEBUG: 'debug',
    TRACE: 'trace',
    OFF: 'off'
} as const);

/** @internal */
export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

export type Loggable = string | LogConvertible

export type LogConvertible = {
    toLog(): Record<string, any>;
}
export function isLogConvertible(obj: any): obj is LogConvertible {
    return obj.toLog !== undefined && typeof obj.toLog === 'function';
}

export type LogDestination = {
    write(log: Log): PromiseLike<unknown> | unknown;
}

export type LoggerOptions = {
    logDestination: LogDestination;
}

export class AspectLogger {
    private readonly logDestination: LogDestination;

    constructor(private readonly options: LoggerOptions) {
        this.logDestination = options.logDestination;
    }

    public critical = this.log.bind(this, LogLevel.CRITICAL);
    public error = this.log.bind(this, LogLevel.ERROR);
    public warn = this.log.bind(this, LogLevel.WARNING);
    public info = this.log.bind(this, LogLevel.INFORMATIONAL);
    public debug = this.log.bind(this, LogLevel.DEBUG);
    public trace = this.log.bind(this, LogLevel.TRACE);

    private willLog(level: LogLevel) {
        if (level === LogLevel.OFF) return false;
        return true;
    }

    private log(level: LogLevel, message: Loggable) {
        if (!this.willLog(level)) return;

        let logMessage: Log = { timestamp: new Date(), level: level, context: {} };
        if (typeof message === 'string') {
            logMessage.message = message;
        }
        else if (typeof message === 'object' && isLogConvertible(message)) {
            logMessage = { ...logMessage, ...message.toLog() };
        }
        this.logDestination.write(logMessage);
    }
}
