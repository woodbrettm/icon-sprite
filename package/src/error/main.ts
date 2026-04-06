export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class MissingKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingKeyError';
  }
}
