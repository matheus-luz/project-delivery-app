class CustomError extends Error {
  _status;

  constructor(status, message) {
    super(message);
    this._status = status;
  }

  get status() {
    return this._status;
  }
}

module.exports = CustomError;
