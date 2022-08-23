class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor); // show error in command line => dev
    }
}

module.exports = AppError;
