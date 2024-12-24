// ApplicationError class is a custom error class that extends the Error class.
// It takes two parameters: message and statusCode.
// The message parameter is the error message that will be displayed to the user.
// The statusCode parameter is the status code that will be sent to the client.
export default class ApplicationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
