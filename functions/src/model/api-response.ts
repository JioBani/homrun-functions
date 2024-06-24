import { HttpError } from "../error/http.error";

export class ApiResponse {
    status: number;
    data?: any;
    error? : HttpError;

    constructor({ status, data, error }: { status: number; data?: any; error?: HttpError }) {
      this.status = status;
      this.data = data;
      this.error = error;
  }

  toJSON() {
    return {
      status: this.status,
      data: this.data,
      error: this.error ? this.error.toJSON() : undefined,
    };
  }
}