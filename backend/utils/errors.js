class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.message = message;
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.message = message;
    this.statusCode = 404;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);

    this.message = message;
    this.statusCode = 403;
  }
}

module.exports = { BadRequestError, NotFoundError, ForbiddenError };
