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

    static InvalidParameterError(name : string) : BadRequestError{
      return new BadRequestError({code : 40001 , message : `Parameter ${name} is invalid`});
    } 
  }
  
  export class UnauthorizedError extends HttpError {
    constructor({ code = 40100, message = 'Unauthorized' }: { code?: number; message?: string } = {}) {
      super(401, code, message);
    }

    static MissingTokenError() : UnauthorizedError{
      return new UnauthorizedError({code : 40101 , message : 'Authorization token is missing'});
    } 

    static InvalidTokenError() : UnauthorizedError{
      return new UnauthorizedError({code : 40102 , message : 'Authorization token is invalid'});
    } 

    static UserNotFoundError(): UnauthorizedError {
      return new UnauthorizedError({ code: 40104, message: 'User not found' });
    }
  }
  
  export class ForbiddenError extends HttpError {
    constructor({ code = 40300, message = 'Forbidden' }: { code?: number; message?: string } = {}) {
      super(403, code, message);
    }

    static UnauthorizedResourceError(): ForbiddenError {
      return new ForbiddenError({ code: 40301, message: `Unauthorized access to resource` });
    }

    
  }
  
  export class NotFoundError extends HttpError {
    constructor({ code = 40400, message = 'Not Found' }: { code?: number; message?: string } = {}) {
      super(404, code, message);
    }

    static DocumentNotFoundError(): NotFoundError {
      return new NotFoundError({ code: 40401, message: 'Document not found' });
  }
  }
  
  export class InternalServerError extends HttpError {
    constructor({ code = 50000, message = 'Internal Server Error' }: { code?: number; message?: string } = {}) {
      super(500, code, message);
    }
  }

  export class ConflictError extends HttpError {
    constructor({ code = 40900, message = 'Conflict' }: { code?: number; message?: string } = {}) {
      super(409, code, message);
    }
  
    static UserAlreadyExistsError(): ConflictError {
      return new ConflictError({ code: 40901, message: 'User already exists' });
    }

    static DisplayNameAlreadyExistsError(): ConflictError {
      return new ConflictError({ code: 40902, message: 'Display name already exists' });
    }
  }
  