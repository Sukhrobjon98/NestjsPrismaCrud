class HttpExceptions extends Error {
    constructor(public status, public message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export default HttpExceptions;
