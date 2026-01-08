import { AeroflyMissionConditionsCloud } from "./AeroflyMissionConditionsCloud.js";
import { strict as assert } from "node:assert";
import { assertValidAeroflyStructure } from "../check/TestHelpers.js";
import { describe, it } from "node:test";
describe("AeroflyMissionConditionsCloud", () => {
    it("should create clouds with indentation", () => {
        const cloud = new AeroflyMissionConditionsCloud(0, 0);
        assert.deepStrictEqual(cloud.cover, 0);
        assert.deepStrictEqual(cloud.base, 0);
        assertValidAeroflyStructure(cloud.toString());
        assertValidAeroflyStructure(cloud.toString(0));
        assertValidAeroflyStructure(cloud.toString(1));
        assertValidAeroflyStructure(cloud.toString(2));
        assertValidAeroflyStructure(cloud.toString(3));
    });
    it("should assign values correctly from constructor and properties", () => {
        const cloud = new AeroflyMissionConditionsCloud(1, 1000);
        assert.deepStrictEqual(cloud.cover, 1);
        assert.deepStrictEqual(cloud.base, 1000);
        cloud.base_feet = 1000;
        assert.notDeepStrictEqual(cloud.base, 1000);
        assert.deepStrictEqual(Math.round(cloud.base_feet), 1000);
        assertValidAeroflyStructure(cloud.toString());
    });
});
