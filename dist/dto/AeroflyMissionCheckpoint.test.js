import { AeroflyMissionCheckpoint } from "./AeroflyMissionCheckpoint.js";
import { strict as assert } from "node:assert";
import { assertValidAeroflyStructure, assertIncludes } from "../check/TestHelpers.js";
import { describe, it } from "node:test";
describe("AeroflyMissionCheckpoint", () => {
    it("should correctly map constructor values", () => {
        const checkpoint = new AeroflyMissionCheckpoint("TEST", "waypoint", 15, 20, {
            altitude_feet: 1000,
            flyOver: true,
            length_feet: 500,
        });
        assert.strictEqual(checkpoint.name, "TEST");
        assert.strictEqual(checkpoint.type, "waypoint");
        assert.strictEqual(checkpoint.longitude, 15);
        assert.strictEqual(checkpoint.latitude, 20);
        assert.strictEqual(checkpoint.flyOver, true);
        assert.strictEqual(Math.round(checkpoint.altitude_feet), 1000);
        assert.strictEqual(Math.round(checkpoint.altitude), Math.round(1000 * 0.3048));
        assert.strictEqual(Math.round(checkpoint.length_feet), 500);
        assert.strictEqual(Math.round(checkpoint.length ?? 0), Math.round(500 * 0.3048));
    });
    it("should correctly map values from properties", () => {
        const checkpoint = new AeroflyMissionCheckpoint("TEST", "waypoint", 15, 20);
        let checkpointString = checkpoint.toString();
        assertIncludes(checkpointString, "[type]");
        assertIncludes(checkpointString, "[name]");
        assertIncludes(checkpointString, "[lon_lat]");
        assertIncludes(checkpointString, "15 20");
        assertIncludes(checkpointString, "[altitude]");
        assert.ok(!checkpointString.includes("[fly_over]"));
        assert.ok(!checkpointString.includes("[alt_cst]"));
        checkpoint.altitudeConstraint = false;
        checkpoint.flyOver = false;
        checkpoint.altitude_feet = 1000;
        checkpoint.length_feet = 500;
        checkpointString = checkpoint.toString();
        assertIncludes(checkpointString, "[fly_over]");
        assertIncludes(checkpointString, "[alt_cst]");
        assertValidAeroflyStructure(checkpointString);
    });
});
