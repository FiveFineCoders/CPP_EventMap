"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8080;
//process.env.PORT
app.get("/api/assignment3/johnsalinas", (req, res) => {
    res.send("HTTP API for John Salinas -> working");
});
app.get("/api/assignment3/vunguyen", (req, res) => {
    res.send("Hello Worlddddddddddddddddddd");
});
app.get("/", (req, res) => {
    res.send("Server is running!");
});
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
