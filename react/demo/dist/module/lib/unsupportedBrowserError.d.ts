import { BrowserCompatibility } from "./browserCompatibility";
import { CustomError } from "./customError";
/**
 * @hidden
 */
export declare class UnsupportedBrowserError extends CustomError {
    readonly data?: BrowserCompatibility;
    constructor(browserCompatibility: BrowserCompatibility);
}
