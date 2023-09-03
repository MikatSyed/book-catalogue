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
exports.OrderService = void 0;
/* @typescript-eslint/no-explicit-any */
const client_1 = require('@prisma/client');
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const postOrder = (payload, userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const orderData = Object.assign({}, payload);
    orderData.userId = userId;
    const result = yield prisma_1.default.order.create({
      data: orderData,
    });
    return result;
  });
const getALLOrderFromDB = (userId, role) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (role === client_1.Role.admin) {
      result = yield prisma_1.default.order.findMany();
    }
    if (role === client_1.Role.customer) {
      result = yield prisma_1.default.order.findMany({
        where: {
          userId,
        },
      });
    }
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Orders Not Found!'
      );
    }
    return result;
  });
const getOrderByIdFromDB = (id, userId, role) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (role === client_1.Role.admin) {
      result = yield prisma_1.default.order.findUnique({
        where: {
          id,
        },
      });
    }
    if (role === client_1.Role.customer) {
      result = yield prisma_1.default.order.findUnique({
        where: Object.assign(
          { id },
          role === client_1.Role.customer && { userId }
        ),
      });
    }
    if (!result) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Order Not Found!'
      );
    }
    return result;
  });
exports.OrderService = {
  postOrder,
  getALLOrderFromDB,
  getOrderByIdFromDB,
};
