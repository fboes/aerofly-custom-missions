import { AeroflyMissionTargetPlane } from "../index.js";
import { assertValidAeroflyStructure } from "../check/TestHelpers.js";
import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

describe("Lots of tests for AeroflyMission and related classes", () => {
    it("should create AeroflyMissionTargetPlane correctly", () => {
        const targetPlane = new AeroflyMissionTargetPlane(0, 1, 2, "Test2");
        assert.deepStrictEqual(targetPlane.longitude, 0);
        assert.deepStrictEqual(targetPlane.latitude, 1);
        assert.deepStrictEqual(targetPlane.dir, 2);
        assert.deepStrictEqual(targetPlane.name, "Test2");
        assertValidAeroflyStructure(targetPlane.toString());
    });
});
