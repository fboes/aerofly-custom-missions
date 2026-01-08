import { assertValidAeroflyStructure } from "../check/TestHelpers.js";
import { describe, it } from "node:test";
describe("TestHelpers", () => {
    it("should validate Aerofly structure correctly", () => {
        const validString = "<>";
        assertValidAeroflyStructure(validString);
    });
});
