"use strict";
/* tslint:disable:no-implicit-dependencies no-any */
/**
 * CustomError tests
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = tslib_1.__importDefault(require("ava"));
var __1 = require("..");
ava_1.default("constructor", function (t) {
    var customError = new __1.CustomError();
    t.deepEqual(customError.name, "");
    t.deepEqual(customError.message, "");
    customError = new __1.CustomError({ name: "test" });
    t.deepEqual(customError.name, "test");
    t.deepEqual(customError.message, "");
    customError = new __1.CustomError({ message: "test" });
    t.deepEqual(customError.name, "");
    t.deepEqual(customError.message, "test");
    customError = new __1.CustomError({ name: "test1", message: "test2" });
    t.deepEqual(customError.name, "test1");
    t.deepEqual(customError.message, "test2");
});
//# sourceMappingURL=customError.spec.js.map