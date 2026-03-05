import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { assertValidAeroflyStructure } from "../check/TestHelpers.js";

import { AeroflySettingsFlight } from "./AeroflySettingsFlight.js";

describe("AeroflySettingsFlight", () => {
    it("should create a valid AeroflySettingsFlight structure", () => {
        const flight = new AeroflySettingsFlight(-122.3088, 47.4502, 1000, 90, 150, {
            gear: 1,
            throttle: 0.5,
            flaps: 0.25,
            flighConfiguration: "Keep",
            onGround: false,
            airport: "KSEA",
            runway: "16L",
        });
        assert.strictEqual(flight.longitude, -122.3088, `Expected longitude to be -122.3088, got ${flight.longitude}`);
        assert.strictEqual(flight.latitude, 47.4502, `Expected latitude to be 47.4502, got ${flight.latitude}`);
        assert.strictEqual(
            flight.altitude_meter,
            1000,
            `Expected altitude_meter to be 1000, got ${flight.altitude_meter}`,
        );
        assert.strictEqual(flight.heading_degree, 90, `Expected heading_degree to be 90, got ${flight.heading_degree}`);
        assert.strictEqual(flight.speed_kts, 150, `Expected speed_kts to be 150, got ${flight.speed_kts}`);
        assert.strictEqual(flight.gear, 1, `Expected gear to be 1, got ${flight.gear}`);
        assert.strictEqual(flight.throttle, 0.5, `Expected throttle to be 0.5, got ${flight.throttle}`);
        assert.strictEqual(flight.flaps, 0.25, `Expected flaps to be 0.25, got ${flight.flaps}`);
        assert.strictEqual(
            flight.flighConfiguration,
            "Keep",
            `Expected flighConfiguration to be Keep, got ${flight.flighConfiguration}`,
        );
        assert.strictEqual(flight.onGround, false, `Expected onGround to be false, got ${flight.onGround}`);
        assert.strictEqual(flight.airport, "KSEA", `Expected airport to be KSEA, got ${flight.airport}`);
        assert.strictEqual(flight.runway, "16L", `Expected runway to be 16L, got ${flight.runway}`);
        assertValidAeroflyStructure(flight.toString());
    });
});
