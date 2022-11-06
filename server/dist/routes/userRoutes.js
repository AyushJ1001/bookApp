"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get("/", (0, express_async_handler_1.default)(userController_1.allUsers));
router.get("/get", (0, express_async_handler_1.default)(userController_1.getUser));
router.post("/register", (0, express_async_handler_1.default)(userController_1.registerUser));
router.post("/login", (0, express_async_handler_1.default)(userController_1.loginUser));
exports.default = router;
