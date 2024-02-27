class HttpError extends Error {
    constructor(message, Errcode) {
        super(message);
        this.code = Errcode;
    }
}

module.exports = HttpError;