'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const order_service_1 = require('./order.service');
const postOrder = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId =
      (_a = req === null || req === void 0 ? void 0 : req.user) === null ||
      _a === void 0
        ? void 0
        : _a.userId;
    const result = yield order_service_1.OrderService.postOrder(
      req.body,
      userId
    );
    (0, sendResponse_1.default)(res, {
      statusCode: 200,
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  })
);
const getALLOrderFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const userId =
      (_b = req === null || req === void 0 ? void 0 : req.user) === null ||
      _b === void 0
        ? void 0
        : _b.userId;
    const role =
      (_c = req === null || req === void 0 ? void 0 : req.user) === null ||
      _c === void 0
        ? void 0
        : _c.role;
    const result = yield order_service_1.OrderService.getALLOrderFromDB(
      userId,
      role
    );
    (0, sendResponse_1.default)(res, {
      statusCode: 200,
      success: true,
      message: 'Orders retrieved successfully',
      data: result,
    });
  })
);
const getOrderByIdFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const { id } = req.params;
    const userId =
      (_d = req === null || req === void 0 ? void 0 : req.user) === null ||
      _d === void 0
        ? void 0
        : _d.userId;
    const role =
      (_e = req === null || req === void 0 ? void 0 : req.user) === null ||
      _e === void 0
        ? void 0
        : _e.role;
    const result = yield order_service_1.OrderService.getOrderByIdFromDB(
      id,
      userId,
      role
    );
    (0, sendResponse_1.default)(res, {
      statusCode: 200,
      success: true,
      message: 'Order fetched successfully',
      data: result,
    });
  })
);
exports.OrderController = {
  postOrder,
  getALLOrderFromDB,
  getOrderByIdFromDB,
};
