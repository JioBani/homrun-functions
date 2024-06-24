export class HttpError extends Error {
    status: number;
    code: number;
    message: string;
  
    constructor(status: number, code: number, message: string) {
      super(message);
      this.status = status;
      this.code = code;
      this.message = message;
    }

    toJSON() {
      return {
        status: this.status,
        code: this.code,
        message: this.message,
      };
    }
  }
  
  export class BadRequestError extends HttpError {
    constructor({ code = 40000, message = 'Bad Request' }: { code?: number; message?: string } = {}) {
      super(400, code, message);
    }
  }
  
  export class UnauthorizedError extends HttpError {
    constructor({ code = 40100, message = 'Unauthorized' }: { code?: number; message?: string } = {}) {
      super(401, code, message);
    }
  }
  
  export class ForbiddenError extends HttpError {
    constructor({ code = 40300, message = 'Forbidden' }: { code?: number; message?: string } = {}) {
      super(403, code, message);
    }
  }
  
  export class NotFoundError extends HttpError {
    constructor({ code = 40400, message = 'Not Found' }: { code?: number; message?: string } = {}) {
      super(404, code, message);
    }
  }
  
  export class InternalServerError extends HttpError {
    constructor({ code = 50000, message = 'Internal Server Error' }: { code?: number; message?: string } = {}) {
      super(500, code, message);
    }
  }
  