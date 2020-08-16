export class InvalidCredentialException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'InvalidCredentialException';
  }
}
