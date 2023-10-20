"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// import cors from 'cors';
// import compression from 'compression';
// import helmet from 'helmet';
// import morgan from 'morgan';
const error_middleware_js_1 = __importDefault(require("./middlewares/error.middleware.js"));
class App {
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.connectToDatabase();
        this.initializeErrorHandling();
        this.listen();
    }
    initializeMiddlewares() {
        this.express.use(express_1.default.json());
        // this.express.use(cors());
        // this.express.use(compression());
        // this.express.use(helmet());
        // this.express.use(morgan('dev'));
        this.express.use(express_1.default.urlencoded({ extended: true }));
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.express.use('/', controller.router);
        });
    }
    connectToDatabase() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        mongoose_1.default.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }
    initializeErrorHandling() {
        this.express.use(error_middleware_js_1.default);
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}
exports.App = App;
