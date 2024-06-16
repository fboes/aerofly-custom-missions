import { AeroflyMissionsList, AeroflyMission, AeroflyMissionConditions, AeroflyMissionConditionsCloud, AeroflyMissionCheckpoint, } from "./index.js";
import { strict as assert } from "node:assert";
{
    const mission = new AeroflyMission("Title");
    assert.deepStrictEqual(mission.title, "Title");
    console.log("✅ AeroflyMission test successful");
}
{
    const conditions = new AeroflyMissionConditions();
    conditions.visibility = 15000;
    assert.deepStrictEqual(conditions.visibility, 15000);
    console.log("✅ AeroflyMissionConditions test successful");
}
{
    const cloud = new AeroflyMissionConditionsCloud(0, 0);
    assert.deepStrictEqual(cloud.cover, 0);
    assert.deepStrictEqual(cloud.base, 0);
    console.log("✅ AeroflyMissionConditionsCloud test successful");
}
{
    const cloud = new AeroflyMissionConditionsCloud(1, 1000);
    assert.deepStrictEqual(cloud.cover, 1);
    assert.deepStrictEqual(cloud.base, 1000);
    console.log("✅ AeroflyMissionConditionsCloud test successful");
}
{
    const conditions = new AeroflyMissionConditions({
        time: new Date(Date.UTC(2024, 5, 14, 13, 15, 38)),
        wind: {
            direction: 190,
            speed: 11,
            gusts: 22,
        },
        turbulenceStrength: 1,
        thermalStrength: 0.31200000000000006,
        visibility: 14484.096000000001,
        clouds: [
            AeroflyMissionConditionsCloud.createInFeet(0.1, 5000),
            AeroflyMissionConditionsCloud.createInFeet(0.2, 7500),
        ],
    });
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
            livery: "",
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
    console.dir(missionList.missions[0], { depth: null });
    const missionListString = missionList.toString();
    console.log(missionListString);
    assert.ok(missionListString.includes("[origin]"));
    assert.ok(missionListString.includes("[tmmission_definition]"));
    assert.ok(missionListString.includes("[list_tmmission_checkpoint]"));
    assert.ok(missionListString.includes("[tmmission_checkpoint]"));
    assert.ok(missionListString.includes("[departure_runway]"));
    assert.ok(missionListString.includes("[cloud_cover]"));
    assert.ok(missionListString.includes("[cloud_cover2]"));
    assert.ok(missionListString.includes("[tmmission_checkpoint][element][0]"));
    assert.ok(missionListString.includes("[tmmission_checkpoint][element][1]"));
    assert.ok(missionListString.includes("[tmmission_checkpoint][element][2]"));
    assert.ok(missionListString.includes("[tmmission_checkpoint][element][3]"));
    assert.ok(missionListString.includes("<[float64][length][844.2959729825288]>"));
    console.log("✅ AeroflyMissionsList test successful");
}
