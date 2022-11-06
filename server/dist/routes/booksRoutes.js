"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const booksController_1 = require("../controllers/booksController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.get("/", authMiddleware_1.default, (0, express_async_handler_1.default)(booksController_1.getBooks));
router.get("/name/:name", authMiddleware_1.default, (0, express_async_handler_1.default)(booksController_1.getBookByName));
router.post("/new", authMiddleware_1.default, (0, express_async_handler_1.default)(booksController_1.newBook));
router.delete("/:id", authMiddleware_1.default, (0, express_async_handler_1.default)(booksController_1.removeBook));
exports.default = router;
