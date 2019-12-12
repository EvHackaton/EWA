/* tslint:disable:no-implicit-dependencies no-any */
/**
 * Index tests
 */
import test from "ava";
import * as ScanditSDK from ".";
test("configure", async (t) => {
    // Set inside setupBrowserEnv.js
    const baseUrl = "https://example.com/";
    const baseDirectory = "file:///tmp/";
    let error = await t.throwsAsync(ScanditSDK.configure(""));
    t.is(error.name, "UnsupportedBrowserError");
    ScanditSDK.BrowserHelper.checkBrowserCompatibility = () => {
        return {
            fullSupport: true,
            scannerSupport: true,
            missingFeatures: []
        };
    };
    error = await t.throwsAsync(ScanditSDK.configure(null));
    t.is(error.name, "NoLicenseKeyError");
    error = await t.throwsAsync(ScanditSDK.configure(""));
    t.is(error.name, "NoLicenseKeyError");
    error = await t.throwsAsync(ScanditSDK.configure(" "));
    t.is(error.name, "NoLicenseKeyError");
    error = await t.throwsAsync(ScanditSDK.configure("YOUR_LICENSE_KEY_IS_NEEDED_HERE"));
    t.is(error.name, "NoLicenseKeyError");
    const fakeLicenseKey = "#".repeat(64);
    await t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey));
    t.is(ScanditSDK.userLicenseKey, fakeLicenseKey);
    t.is(ScanditSDK.scanditEngineLocation, baseUrl);
    await t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "" }));
    t.is(ScanditSDK.scanditEngineLocation, baseUrl);
    await t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "/" }));
    t.is(ScanditSDK.scanditEngineLocation, baseUrl);
    await t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "test" }));
    t.is(ScanditSDK.scanditEngineLocation, `${baseUrl}test/`);
    await t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "https://example1.com" }));
    t.is(ScanditSDK.scanditEngineLocation, "https://example1.com/");
    await t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "https://example2.com/" }));
    t.is(ScanditSDK.scanditEngineLocation, "https://example2.com/");
    Object.defineProperty(window, "location", {
        value: {
            href: `${baseDirectory}example.html`,
            origin: "null"
        }
    });
    await t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "" }));
    t.is(ScanditSDK.scanditEngineLocation, baseDirectory);
    await t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "/" }));
    t.is(ScanditSDK.scanditEngineLocation, baseDirectory);
    await t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "test" }));
    t.is(ScanditSDK.scanditEngineLocation, `${baseDirectory}test/`);
});
//# sourceMappingURL=index.spec.js.map