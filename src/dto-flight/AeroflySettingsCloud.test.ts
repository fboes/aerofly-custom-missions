import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { assertValidAeroflyStructure } from "../check/TestHelpers.js";

import { AeroflySettingsCloud } from "./AeroflySettingsCloud.js";

describe("AeroflySettingsCloud", () => {
    it("should create a valid AeroflySettingsCloud structure", () => {
        const cloud = new AeroflySettingsCloud(0.5, 0.25);
        assert.strictEqual(cloud.density, 0.5, `Expected density to be 0.5, got ${cloud.density}`);
        assert.strictEqual(cloud.height, 0.25, `Expected height to be 0.25, got ${cloud.height}`);
        assertValidAeroflyStructure(cloud.toString());
    });

    it("should convert height from feet to meters correctly", () => {
        const cloud = AeroflySettingsCloud.createInFeet(0.5, 5000);
        assert.strictEqual(cloud.height, 0.5, `Expected height to be 0.5, got ${cloud.height}`);
        assertValidAeroflyStructure(cloud.toString());
    });

    it("should convert height from meters to feet correctly", () => {
        const cloud = new AeroflySettingsCloud(0.5, 0.25);
        assert.strictEqual(cloud.height_ft, 2500, `Expected height_ft to be 2500, got ${cloud.height_ft}`);
        assertValidAeroflyStructure(cloud.toString());
    });

    it("should set height in feet correctly", () => {
        const cloud = new AeroflySettingsCloud(0.5, 0.25);
        cloud.height_ft = 3000;
        assert.strictEqual(cloud.height, 0.3, `Expected height to be 0.3, got ${cloud.height}`);
        assertValidAeroflyStructure(cloud.toString());
    });

    it("should return correct density code", () => {
        const cloud1 = new AeroflySettingsCloud(0.1, 0.25);
        assert.strictEqual(cloud1.density_code, "CLR", `Expected density_code to be CLR, got ${cloud1.density_code}`);

        const cloud2 = new AeroflySettingsCloud(0.2, 0.25);
        assert.strictEqual(cloud2.density_code, "FEW", `Expected density_code to be FEW, got ${cloud2.density_code}`);

        const cloud3 = new AeroflySettingsCloud(0.4, 0.25);
        assert.strictEqual(cloud3.density_code, "SCT", `Expected density_code to be SCT, got ${cloud3.density_code}`);

        const cloud4 = new AeroflySettingsCloud(0.6, 0.25);
        assert.strictEqual(cloud4.density_code, "BKN", `Expected density_code to be BKN, got ${cloud4.density_code}`);

        const cloud5 = new AeroflySettingsCloud(0.9, 0.25);
        assert.strictEqual(cloud5.density_code, "OVC", `Expected density_code to be OVC, got ${cloud5.density_code}`);
    });

    it("should set density based on density code correctly", () => {
        const cloud = new AeroflySettingsCloud(0, 0.25);
        cloud.density_code = "FEW";
        assert.strictEqual(cloud.density, 1 / 8, `Expected density to be 1/8, got ${cloud.density}`);

        cloud.density_code = "SCT";
        assert.strictEqual(cloud.density, 3 / 8, `Expected density to be 3/8, got ${cloud.density}`);

        cloud.density_code = "BKN";
        assert.strictEqual(cloud.density, 5 / 8, `Expected density to be 5/8, got ${cloud.density}`);

        cloud.density_code = "OVC";
        assert.strictEqual(cloud.density, 1, `Expected density to be 1, got ${cloud.density}`);

        cloud.density_code = "CLR";
        assert.strictEqual(cloud.density, 0, `Expected density to be 0, got ${cloud.density}`);
    });
});
