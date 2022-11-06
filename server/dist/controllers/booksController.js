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
exports.getBookByName = exports.removeBook = exports.newBook = exports.getBooks = void 0;
const book_1 = __importDefault(require("../models/book"));
const user_1 = __importDefault(require("../models/user"));
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.user) {
        res.status(400);
        throw new Error("Not logged in");
    }
    const books = yield book_1.default.find().where("_id").in(res.locals.user.books).exec();
    res.status(200).json(books);
});
exports.getBooks = getBooks;
const newBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.user) {
        res.status(400);
        throw new Error("Not logged in");
    }
    const { name, author } = req.body;
    const check = yield book_1.default.findOne({ name });
    try {
        let book;
        if (!check) {
            book = yield book_1.default.create({ name, author });
            if (res.locals.user.books.includes(book)) {
                res.status(400);
                res.send("Book already in list");
            }
        }
        else
            book = check;
        yield user_1.default.findByIdAndUpdate(res.locals.user._id, {
            $push: { books: book },
        });
        res.status(201).json(book);
    }
    catch (error) {
        res.status(404);
        throw new Error("Invalid input");
    }
});
exports.newBook = newBook;
const removeBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_1.default.findById(req.params.id);
    if (!book) {
        res.status(400);
        throw new Error("Book not found");
    }
    try {
        const user = yield user_1.default.findByIdAndUpdate(res.locals.user._id, {
            $pull: { books: book._id },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(401);
        throw new Error("Error");
    }
});
exports.removeBook = removeBook;
// get book by name
const getBookByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.locals.user) {
        res.status(400);
        throw new Error("Not logged in");
    }
    const book = yield book_1.default.find({ name: req.params.name });
    res.status(200).json(book);
});
exports.getBookByName = getBookByName;
