import { AeroflyMissionConditions } from "./AeroflyMissionConditions.js";
import { strict as assert } from "node:assert";
import { assertValidAeroflyStructure } from "../check/TestHelpers.js";
import { describe, it } from "node:test";
describe("AeroflyMissionConditions", () => {
    it("should handle visibility in meters correctly when set via property", () => {
        const conditions = new AeroflyMissionConditions();
        conditions.visibility = 15000;
        assert.deepStrictEqual(conditions.visibility, 15000);
    });
    it("should handle visibility in statute miles correctly when set via property", () => {
        const conditions = new AeroflyMissionConditions();
        conditions.visibility_sm = 10;
        assert.notDeepStrictEqual(conditions.visibility, 10);
        assert.deepStrictEqual(Math.round(conditions.visibility_sm), 10);
        assertValidAeroflyStructure(conditions.toString());
    });
    it("should handle visibility in meters correctly when set via constructor", () => {
        const conditions = new AeroflyMissionConditions({
            visibility: 15000,
        });
        assert.deepStrictEqual(conditions.visibility, 15000);
        assertValidAeroflyStructure(conditions.toString());
    });
    it("should handle visibility in statute miles correctly when set via constructor", () => {
        const conditions = new AeroflyMissionConditions({
            visibility_sm: 10,
        });
        assert.notDeepStrictEqual(conditions.visibility, 10);
        assert.deepStrictEqual(Math.round(conditions.visibility_sm), 10);
        assertValidAeroflyStructure(conditions.toString());
    });
});
