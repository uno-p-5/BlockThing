"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors_options = void 0;
const allowed_origins = ['http://localhost:8080'];
exports.cors_options = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowed_origins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
};
