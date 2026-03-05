import { AeroflyMission } from "./AeroflyMission.js";

import { strict as assert } from "node:assert";
import fs from "node:fs";
import { assertIncludes, assertValidAeroflyStructure } from "../check/TestHelpers.js";
import { describe, it } from "node:test";
import { AeroflyLocalizedText } from "./AeroflyLocalizedText.js";
import { AeroflyMissionCheckpoint } from "./AeroflyMissionCheckpoint.js";
import { AeroflyMissionConditions } from "./AeroflyMissionConditions.js";
import { AeroflyMissionConditionsCloud } from "./AeroflyMissionConditionsCloud.js";
import { AeroflyMissionsList } from "./AeroflyMissionsList.js";
import { AeroflyMissionTargetPlane } from "./AeroflyMissionTargetPlane.js";

describe("AeroflyMission", () => {
    const mission = new AeroflyMission("Title", {
        origin: {
            icao: "XXXX",
            longitude: 0,
            latitude: 0,
            dir: 0,
            alt: 0,
        },
        destination: {
            icao: "XXXX",
            longitude: 0,
            latitude: 0,
            dir: 0,
            alt: 0,
        },
    });

    it("should correctly map constructor values", () => {
        assert.strictEqual(mission.title, "Title");
    });

    it("should create a valid Aerofly mission", () => {
        assertValidAeroflyStructure(mission.toString());
    });

    it("should create a valid XML mission", () => {
        assertValidAeroflyStructure(mission.getElement().toXmlString());
    });

    it("should create AeroflyMissionConditions correctly", () => {
        const conditions = new AeroflyMissionConditions({
            time: new Date(Date.UTC(2024, 5, 14, 13, 15, 38)),
            wind: {
                direction: 190,
                speed: 11,
                gusts: 22,
            },
            turbulenceStrength: 1,
            temperature: 21,
            visibility: 14484.096000000001,
            clouds: [
                AeroflyMissionConditionsCloud.createInFeet(0.1, 5000),
                AeroflyMissionConditionsCloud.createInFeet(0.2, 7500),
                AeroflyMissionConditionsCloud.createInFeet(0.1, 9500),
            ],
        });

        assert.strictEqual(conditions.wind.direction, 190);
        assert.strictEqual(conditions.wind.speed, 11);
        assert.strictEqual(conditions.wind.gusts, 22);
        assert.strictEqual(conditions.turbulenceStrength, 1);
        assert.strictEqual(conditions.temperature, 21);
        assert.strictEqual(conditions.visibility, 14484.096000000001);

        const checkpoints = [
            new AeroflyMissionCheckpoint("KCCR", "origin", -122.057, 37.9897, {
                altitude: 8,
            }),
            new AeroflyMissionCheckpoint("19L", "departure_runway", -122.05504061196366, 37.993168229891225, {
                length: 844.2959729825288,
            }),
            new AeroflyMissionCheckpoint("24", "destination_runway", -70.60730234370952, 41.399093035543366, {
                altitude: 20,
                length: 1677.6191463161874,
                frequency: 108700000,
            }),
            new AeroflyMissionCheckpoint("KMVY", "destination", -70.6139, 41.3934, {
                altitude: 20,
                flyOver: false,
            }),
        ];

        const mission = new AeroflyMission("KCCR #1: Concord / Buchanan Field", {
            checkpoints,
            conditions,
            description: `It is a gusty, clear early morning, and you are 8 NM to the north of the towered airport Concord / Buchanan Field (27ft). As the wind is 11 kts from 190°, the main landing runway is 19L (191° / 844m). Fly the pattern and land safely.

- Local tower / CTAF frequency: 123.90
- Local navigational aids: VOR/DME CCR (117.00) 3.4 NM to the north`,
            flightSetting: "cruise",
            aircraft: {
                name: "c172",
                livery: "default",
                icao: "C172",
            },
            callsign: "N51911",
            origin: {
                icao: "KCCR",
                longitude: -122.0736009331662,
                latitude: 38.122300745843944,
                dir: 174.37511511143452,
                alt: 1066.799965862401,
            },
            destination: {
                icao: "KMVY",
                longitude: -70.6139,
                latitude: 41.3934,
                dir: 221,
                alt: 20,
            },
        });

        const missionList = new AeroflyMissionsList([mission]);

        assert.strictEqual(missionList.missions.length, 1);
        assert.strictEqual(missionList.missions[0].aircraft.name, "c172");
        assert.strictEqual(missionList.missions[0].aircraft.icao, "C172");

        let missionListString = missionList.toString();

        assert.strictEqual(missionListString, missionList.toString());
        assertIncludes(missionListString, "[origin]");
        assertIncludes(missionListString, "[tmmission_definition]");
        assertIncludes(missionListString, "[list_tmmission_checkpoint]");
        assertIncludes(missionListString, "[tmmission_checkpoint]");
        assertIncludes(missionListString, "[departure_runway]");
        assertIncludes(missionListString, "[cloud_cover]");
        assertIncludes(missionListString, "[cirrus_cover]");
        assertIncludes(missionListString, "[tmmission_checkpoint][element][0]");
        assertIncludes(missionListString, "[tmmission_checkpoint][element][1]");
        assertIncludes(missionListString, "[tmmission_checkpoint][element][2]");
        assertIncludes(missionListString, "[tmmission_checkpoint][element][3]");
        assertIncludes(missionListString, "<[float64][length][844.2959729825288]>");
        assert.ok(!missionListString.includes("[tags]"));
        assert.ok(!missionListString.includes("[difficulty]"));
        assert.ok(!missionListString.includes("[is_featured]"));
        assert.ok(!missionListString.includes("[tmmission_definition_localized]"));
        assert.ok(!missionListString.includes("[distance]"));
        assert.ok(!missionListString.includes("[duration]"));
        assert.ok(!missionListString.includes("[alt_cst]"));
        assertValidAeroflyStructure(missionListString);

        //console.log(missionListString);

        mission.difficulty = 1.0;
        mission.isFeatured = true;
        mission.localizedTexts.push(new AeroflyLocalizedText("de", "Landeübung #1", "Probier die Landung"));
        mission.distance = 1400;
        mission.duration = 2 * 60 * 60;
        mission.tags.push("approach");
        mission.tags.push("pattern");
        mission.finish = new AeroflyMissionTargetPlane(0, 1, 2);
        mission.tutorialName = "c172";
        mission.isScheduled = true;
        missionListString = missionList.toString();

        assertIncludes(missionListString, "[tags]");
        assertIncludes(missionListString, "[difficulty]");
        assertIncludes(missionListString, "[is_featured]");
        assertIncludes(missionListString, "true");
        assertIncludes(missionListString, "[tmmission_definition_localized]");
        assertIncludes(missionListString, "Landeübung");
        assertIncludes(missionListString, "[distance]");
        assertIncludes(missionListString, "[duration]");
        assertIncludes(missionListString, "[finish]");
        assertIncludes(missionListString, "[tutorial_name]");
        assertIncludes(missionListString, "[is_scheduled]");
        assertValidAeroflyStructure(missionListString);

        //console.dir(missionList.missions[0], { depth: null });
        //console.log(missionListString);
        //console.log(missionList.getElement().toXmlString());

        const file = new AeroflyMissionsList([mission]);
        const fileContent = file.toString();
        fs.writeFileSync("docs/custom_missions_user.tmc", fileContent);

        const xmlContent = file.toXmlString();
        fs.writeFileSync("docs/custom_missions_user.xml", xmlContent);
    });
});
