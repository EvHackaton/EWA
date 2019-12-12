/* tslint:disable:no-implicit-dependencies no-any */
/**
 * CustomError tests
 */
import test from "ava";
import { CustomError } from "..";
test("constructor", t => {
    let customError = new CustomError();
    t.deepEqual(customError.name, "");
    t.deepEqual(customError.message, "");
    customError = new CustomError({ name: "test" });
    t.deepEqual(customError.name, "test");
    t.deepEqual(customError.message, "");
    customError = new CustomError({ message: "test" });
    t.deepEqual(customError.name, "");
    t.deepEqual(customError.message, "test");
    customError = new CustomError({ name: "test1", message: "test2" });
    t.deepEqual(customError.name, "test1");
    t.deepEqual(customError.message, "test2");
});
//# sourceMappingURL=customError.spec.js.map