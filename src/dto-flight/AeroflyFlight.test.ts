import { describe, it } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { strict as assert } from "node:assert";
import { assertValidAeroflyStructure } from "../check/TestHelpers.js";

import { AeroflyFlight } from "./AeroflyFlight.js";
import { AeroflySettingsAircraft } from "./AeroflySettingsAircraft.js";
import { AeroflySettingsFlight } from "./AeroflySettingsFlight.js";
import { AeroflyTimeUtc } from "./AeroflyTimeUtc.js";
import { AeroflyNavigationConfig } from "./AeroflyNavigationConfig.js";
import { AeroflySettingsWind } from "./AeroflySettingsWind.js";
import { AeroflySettingsCloud } from "./AeroflySettingsCloud.js";
import { AeroflyNavRouteWaypoint } from "./AeroflyNavRouteWaypoint.js";
import { AeroflySettingsFuelLoad } from "./AeroflySettingsFuelLoad.js";
import { AeroflyNavRouteDestination, AeroflyNavRouteOrigin } from "./AeroflyNavRouteAirports.js";
import { AeroflyNavRouteDepartureRunway, AeroflyNavRouteDestinationRunway } from "./AeroflyNavRouteRunway.js";
import { AeroflyNavRouteApproach } from "./AeroflyNavRouteTransition.js";

describe("AeroflyFlight", () => {
    it("should create a valid AeroflyFlight structure", () => {
        const flight = new AeroflyFlight(
            new AeroflySettingsAircraft("c172", "highway_patrol"),
            AeroflySettingsFlight.createInCartesian(
                [-1548480.29141299, -4793879.34075889, 3903092.08870457],
                [0, 0, 0],
                [
                    -0.449510470601295, -0.541223404385256, -0.710645877610949, 0.868733701939534, -0.450067862031944,
                    -0.206738179058507, -0.207947329711721, -0.710293000184874, 0.672489228132418,
                ],
                {
                    airport: "KTEX",
                },
            ),
            AeroflyTimeUtc.createFromComponents(2026, 3, 1, 21.343333),
            AeroflySettingsWind.createWithNormalizedValues(0.672604, 70, 0.15, 0.72),
            [
                new AeroflySettingsCloud(0.02, 0.25),
                new AeroflySettingsCloud(0.53, 0.43),
                new AeroflySettingsCloud(0.7, 0.53),
            ],
            new AeroflyNavigationConfig(9753.6, [
                new AeroflyNavRouteOrigin("KEYW", 0, 0, {
                    uid: 5033935394767185920n,
                    elevation: 0.9144,
                }).setPosition([831962.247339588, -5744690.22431113, 2634431.8120698]),
                new AeroflyNavRouteDepartureRunway("09", 0, 0, {
                    elevation: 0.9144,
                    runwayLength: 1463.3448,
                    uid: 5033564859348430848n,
                }).setPosition([831239.612180703, -5744797.54517434, 2634425.9351001]),
                new AeroflyNavRouteWaypoint("MTH", -122.3088, 47.4502, {
                    navaidFrequency: 260000,
                }),
                new AeroflyNavRouteWaypoint("MNATE", -122.3088, 47.4502),
                new AeroflyNavRouteWaypoint("HST", -122.3088, 47.4502, {
                    navaidFrequency: 108200000,
                }),
                new AeroflyNavRouteApproach("L08L", "KMIA", {
                    uid: 5109231054766956544n,
                    elevation: 2.4384,
                }),
                new AeroflyNavRouteDestinationRunway("08L", 0, 0, {
                    elevation: 2.4384,
                    runwayLength: 2621.28,
                    uid: 5108645015094833152n,
                }).setPosition([967964.184496183, -5663741.31044038, 2759419.16214225]),
                new AeroflyNavRouteDestination("KMIA", 0, 0, {
                    elevation: 2.7432,
                    uid: 5109231054766614528n,
                }).setPosition([969155.370025469, -5663906.24032616, 2758667.49173681]),
            ]),
            {
                fuelLoadSetting: new AeroflySettingsFuelLoad("c172", 80, 90, "Keep"),
                visibility: 0.533333,
                _missionTitle: "Mission title",
                _missionBriefing: "Additional text, which will only be visible internally",
            },
        );

        assert.ok(flight._missionTitle);
        assert.ok(flight._missionBriefing);

        const fileContent = flight.toString();
        fs.writeFileSync(path.join(import.meta.dirname, "../..", "docs/flight.mcf"), fileContent);

        const xmlContent = flight.toXmlString();
        fs.writeFileSync(path.join(import.meta.dirname, "../..", "docs/flight.xml"), xmlContent);

        fs.writeFileSync(path.join(import.meta.dirname, "../..", "docs/flight.json"), JSON.stringify(flight, null, 2));

        assertValidAeroflyStructure(fileContent);
        assert.ok(fileContent.includes("c172"));
    });
});
