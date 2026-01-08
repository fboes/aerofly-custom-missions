import { AeroflyLocalizedText } from "./AeroflyLocalizedText.js";
import { strict as assert } from "node:assert";
import { assertValidAeroflyStructure } from "../check/TestHelpers.js";
import { describe, it } from "node:test";
describe("AeroflyLocalizedText", () => {
    const localizedText = new AeroflyLocalizedText("de", "Test", "Test2");
    it("should correctly map constructor values", () => {
        assert.deepStrictEqual(localizedText.language, "de");
        assert.deepStrictEqual(localizedText.title, "Test");
        assert.deepStrictEqual(localizedText.description, "Test2");
        assertValidAeroflyStructure(localizedText.toString());
    });
    it("should create a valid Aerofly mission", () => {
        assertValidAeroflyStructure(localizedText.toString());
    });
});
