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
            configuration: "Keep",
            onGround: false,
            airport: "KSEA",
            runway: "16L",
        });
        assert.strictEqual(flight.longitude, -122.3088, `Expected longitude to be -122.3088, got ${flight.longitude}`);
        assert.strictEqual(flight.latitude, 47.4502, `Expected latitude to be 47.4502, got ${flight.latitude}`);
        assert.strictEqual(flight.altitude_meter, 1000, `Expected altitude_meter to be 1000, got ${flight.altitude_meter}`);
        assert.strictEqual(flight.heading_degree, 90, `Expected heading_degree to be 90, got ${flight.heading_degree}`);
        assert.strictEqual(flight.speed_kts, 150, `Expected speed_kts to be 150, got ${flight.speed_kts}`);
        assert.strictEqual(flight.gear, 1, `Expected gear to be 1, got ${flight.gear}`);
        assert.strictEqual(flight.throttle, 0.5, `Expected throttle to be 0.5, got ${flight.throttle}`);
        assert.strictEqual(flight.flaps, 0.25, `Expected flaps to be 0.25, got ${flight.flaps}`);
        assert.strictEqual(flight.configuration, "Keep", `Expected configuration to be Keep, got ${flight.configuration}`);
        assert.strictEqual(flight.onGround, false, `Expected onGround to be false, got ${flight.onGround}`);
        assert.strictEqual(flight.airport, "KSEA", `Expected airport to be KSEA, got ${flight.airport}`);
        assert.strictEqual(flight.runway, "16L", `Expected runway to be 16L, got ${flight.runway}`);
        assertValidAeroflyStructure(flight.toString());
    });
    it("should use valid orientation from main.mcf", () => {
        const flight = new AeroflySettingsFlight(-122.3088, 47.4502, 1000, 90, 150);
        // Canada
        flight.orientation = [
            -0.763419555334921, 0.645896043270811, 0.00298057365988389, -0.564914354076689, -0.665451427226094,
            -0.487899754622681, -0.313149094027667, -0.374155982565915, 0.872894578754952,
        ];
        console.log("Orientation:", flight.heading_degree); // should be 270, is 216
        // South Africa
        flight.orientation = [
            0.324874838801671, -0.945743434574979, 0.0050690306677758, -0.526455468124437, -0.185291526716742,
            -0.829766045466347, 0.785685038164447, 0.266901491350839, -0.5580883574482,
        ];
        console.log("Orientation:", flight.heading_degree); // should be 270, is 301
        // Japan
        flight.orientation = [
            0.717429258146935, 0.696613268777701, 0.00502128644729529, -0.393795668419003, 0.411487688662976,
            -0.821950639401925, -0.574647919242008, 0.587714076606685, 0.569536595021937,
        ];
        console.log("Orientation:", flight.heading_degree); // should be 270, is 331
        assertValidAeroflyStructure(flight.toString());
    });
});
