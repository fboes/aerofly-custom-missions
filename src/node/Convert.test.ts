import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

import {
    convertHeadingToOrientation,
    convertFeetToMeter,
    convertLonLatToVector,
    convertOrientationToHeading,
    convertMeterToFeet,
    convertVectorToLonLat,
} from "./Convert.js";
import { AeroflyMatrix3Float, AeroflyVector3Float } from "./AeroflyTypes.js";

describe("Convert", () => {
    it("should convert feet to meters correctly", () => {
        const feet = 1000;
        const expectedMeters = 304.8;
        const actualMeters = convertFeetToMeter(feet);
        assert.strictEqual(
            actualMeters,
            expectedMeters,
            `Expected ${feet} feet to be ${expectedMeters} meters, got ${actualMeters} meters`,
        );
    });

    it("should convert meters to feet correctly", () => {
        const meters = 500;
        const expectedFeet = 1640.4199;
        const actualFeet = convertMeterToFeet(meters);
        assert.strictEqual(
            actualFeet.toPrecision(4),
            expectedFeet.toPrecision(4),
            `Expected ${meters} meters to be ${expectedFeet} feet, got ${actualFeet} feet`,
        );
    });

    it("should convert longitude / latitude to vector and back correctly", () => {
        const longitude = -122.3088;
        const latitude = 47.4502;
        const expectedLongitude = -122.3088;
        const expectedLatitude = 47.4502;

        const vector = convertLonLatToVector(longitude, latitude, 0);
        const lonLat = convertVectorToLonLat(vector);
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

    it("should convert orientation matrix to heading degree", () => {
        const positionKEYW = new AeroflyVector3Float(831922.0452075421, -5744695.679418418, 2634432.6068597846);
        const positionYSSY = new AeroflyVector3Float(-4640429.92586909, 2553500.8064244, -3541489.45541516);

        const testCases = [
            {
                orientation: new AeroflyMatrix3Float(
                    -0.0668066264395785,
                    0.431792064197595,
                    0.899495685348041,
                    -0.98941528906399,
                    -0.145060537051883,
                    -0.00385050082983023,
                    0.128818711490931,
                    -0.890232022500988,
                    0.43691267512355,
                ),
                position: positionKEYW,
                heading: 0,
            },
            {
                orientation: new AeroflyMatrix3Float(
                    0.985978516472605,
                    0.166832368887515,
                    -0.00365044461148948,
                    -0.066064640816506,
                    0.41034317377044,
                    0.90953501470465,
                    0.153237816116869,
                    -0.896540819166301,
                    0.41561127424596,
                ),
                position: positionKEYW,
                heading: 90,
            },

            {
                orientation: new AeroflyMatrix3Float(
                    -0.465135059130883,
                    -0.885151853036744,
                    0.0124729239927332,
                    -0.489418463305539,
                    0.268872261996669,
                    0.829564508946978,
                    -0.737644185595572,
                    0.379755057628484,
                    -0.558271575187768,
                ),
                position: positionYSSY,
                heading: 90,
            },
        ];

        for (const testCase of testCases) {
            const calculatedHeading = convertOrientationToHeading(testCase.orientation, testCase.position);
            const message = `Expected heading to be ${testCase.heading.toFixed(4)}, got ${calculatedHeading.toFixed(4)}`;
            assert.strictEqual(Math.round(calculatedHeading) % 360, Math.round(testCase.heading) % 360, message);
        }
    });

    it("should convert heading degree to orientation matrix (ignoring pitch, roll, yaw, etc.)", () => {
        const positionKEYW = new AeroflyVector3Float(831922.0452075421, -5744695.679418418, 2634432.6068597846);
        const positionYSSY = new AeroflyVector3Float(-4640429.92586909, 2553500.8064244, -3541489.45541516);

        const testCases = [
            {
                orientation: new AeroflyMatrix3Float(
                    -0.0668066264395785,
                    0.431792064197595,
                    0.899495685348041,
                    -0.98941528906399,
                    -0.145060537051883,
                    -0.00385050082983023,
                    0.128818711490931,
                    -0.890232022500988,
                    0.43691267512355,
                ),
                position: positionKEYW,
                heading: 0,
            },
            {
                orientation: new AeroflyMatrix3Float(
                    0.985978516472605,
                    0.166832368887515,
                    -0.00365044461148948,
                    -0.066064640816506,
                    0.41034317377044,
                    0.90953501470465,
                    0.153237816116869,
                    -0.896540819166301,
                    0.41561127424596,
                ),
                position: positionKEYW,
                heading: 90,
            },

            {
                orientation: new AeroflyMatrix3Float(
                    -0.465135059130883,
                    -0.885151853036744,
                    0.0124729239927332,
                    -0.489418463305539,
                    0.268872261996669,
                    0.829564508946978,
                    -0.737644185595572,
                    0.379755057628484,
                    -0.558271575187768,
                ),
                position: positionYSSY,
                heading: 90,
            },
        ];

        for (const testCase of testCases) {
            const calculatedOrientation = convertHeadingToOrientation(testCase.heading, testCase.position);
            const calculatedHeading = convertOrientationToHeading(calculatedOrientation, testCase.position);

            assert.strictEqual(calculatedHeading, testCase.heading);
        }
    });
});
