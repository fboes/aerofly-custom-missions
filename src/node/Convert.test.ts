import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import { AeroflyMatrix3Float, Convert } from "./Convert.js";

describe("Convert", () => {
    it("should convert feet to meters correctly", () => {
        const feet = 1000;
        const expectedMeters = 304.79999024640034;
        const actualMeters = Convert.convertFeetToMeter(feet);
        assert.strictEqual(
            actualMeters,
            expectedMeters,
            `Expected ${feet} feet to be ${expectedMeters} meters, got ${actualMeters} meters`,
        );
    });

    it("should convert meters to feet correctly", () => {
        const meters = 500;
        const expectedFeet = 1640.42;
        const actualFeet = Convert.convertMeterToFeet(meters);
        assert.strictEqual(
            actualFeet,
            expectedFeet,
            `Expected ${meters} meters to be ${expectedFeet} feet, got ${actualFeet} feet`,
        );
    });

    it("should convert longitude / latitude to vector and back correctly", () => {
        const longitude = -122.3088;
        const latitude = 47.4502;
        const expectedLongitude = -122.3088;
        const expectedLatitude = 47.4502;

        const vector = Convert.convertLonLatToVector(longitude, latitude, 0);
        const lonLat = Convert.convertVectorToLonLat(vector);
        assert.strictEqual(
            lonLat.longitude.toFixed(4),
            expectedLongitude.toFixed(4),
            `Expected longitude to be ${expectedLongitude.toFixed(4)}, got ${lonLat.longitude.toFixed(4)}`,
        );
        assert.strictEqual(
            lonLat.latitude.toFixed(4),
            expectedLatitude.toFixed(4),
            `Expected latitude to be ${expectedLatitude.toFixed(4)}, got ${lonLat.latitude.toFixed(4)}`,
        );
    });

    it("should convert heading degree to orientation matrix and back correctly", () => {
        const orientationMatrix: AeroflyMatrix3Float = [0, -1, 0, 1, 0, 0, 0, 0, 1];
        const expectedHeadingDegree = 90;

        const actualHeadingDegree = Convert.convertMatrixToDegree(orientationMatrix);
        assert.strictEqual(
            actualHeadingDegree.toFixed(4),
            expectedHeadingDegree.toFixed(4),
            `Expected heading degree to be ${expectedHeadingDegree.toFixed(4)}, got ${actualHeadingDegree.toFixed(4)}`,
        );
    });

    it("should convert heading degree to orientation matrix and back correctly", () => {
        const heading_degree = 90;
        const expectedHeadingDegree = 90;

        const orientationMatrix = Convert.convertDegreeToMatrix(heading_degree);
        console.log("Orientation Matrix:", orientationMatrix);

        const actualHeadingDegree = Convert.convertMatrixToDegree(orientationMatrix);
        assert.strictEqual(
            actualHeadingDegree.toFixed(4),
            expectedHeadingDegree.toFixed(4),
            `Expected heading degree to be ${expectedHeadingDegree.toFixed(4)}, got ${actualHeadingDegree.toFixed(4)}`,
        );
    });

    it("should show the orientation at Tellruide correctly", () => {
        const orientationMatrix: AeroflyMatrix3Float = [
            -0.449510470601295, -0.541223404385256, -0.710645877610949, 0.868733701939534, -0.450067862031944,
            -0.206738179058507, -0.207947329711721, -0.710293000184874, 0.672489228132418,
        ];
        const expectedHeadingDegree = 117.3585;

        const actualHeadingDegree = Convert.convertMatrixToDegree(orientationMatrix);
        assert.strictEqual(
            actualHeadingDegree.toFixed(4),
            expectedHeadingDegree.toFixed(4),
            `Expected heading degree to be ${expectedHeadingDegree.toFixed(4)}, got ${actualHeadingDegree.toFixed(4)}`,
        );
    });
});
