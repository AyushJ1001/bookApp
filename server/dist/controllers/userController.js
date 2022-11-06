"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.getUser = exports.allUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.default.find();
        res
            .status(200)
            .json(result.map((obj) => ({ name: obj.name, email: obj.email })));
    }
    catch (error) {
        res.status(400);
        throw new Error("Error" + error.message);
    }
});
exports.allUsers = allUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    let id = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    // check if id is a payload
    if (typeof id === "object") {
        id = id.id;
    }
    try {
        const user = yield user_1.default.findById(id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404);
            throw new Error("User not found");
        }
    }
    catch (error) {
        res.status(400);
        throw new Error("Error: " + error.message);
    }
});
exports.getUser = getUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    const user = yield user_1.default.findOne({ email: userData.email });
    if (user) {
        res.status(400);
        throw new Error("User with this email already exists");
    }
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, salt);
    try {
        const user = yield user_1.default.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        res.status(201).send({
            id: user._id,
            name: user.name,
            email: user.email,
            books: user.books,
            token: generateToken(user._id),
        });
    }
    catch (error) {
        res.status(400);
        throw new Error("Invalid Data");
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    }
    const isValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isValid) {
        res.status(401);
        throw new Error("Invalid credentials");
    }
    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        books: user.books,
        token: generateToken(user._id),
    });
});
exports.loginUser = loginUser;
// Generate JWT Token
const generateToken = (id) => jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
});
