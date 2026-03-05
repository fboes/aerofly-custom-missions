import { AeroflyMissionsList } from "./AeroflyMissionsList.js";

import { strict as assert } from "node:assert";
import { assertValidAeroflyStructure } from "../check/TestHelpers.js";
import { describe, it } from "node:test";

describe("AeroflyMissionsList", () => {
    it("should create valid Aerofly code", () => {
        const missionList = new AeroflyMissionsList();
        assert.deepStrictEqual(missionList.missions.length, 0);
        assertValidAeroflyStructure(missionList.toString());
    });

    it("should create valid XML code", () => {
        const missionList = new AeroflyMissionsList();
        assert.deepStrictEqual(missionList.missions.length, 0);
        assertValidAeroflyStructure(missionList.toXmlString());
    });
});
