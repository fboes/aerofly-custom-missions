import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { AeroflyNavRouteDestination } from "../index.js";
describe("AeroflyNavRouteBase", () => {
    it("should create UIDs almost matching the ingame UIDs", () => {
        const testCases = [
            {
                wp: new AeroflyNavRouteDestination("MAX-NE", 179.999, 89.999),
                assertUid: 18446694595666707712n,
                ingameUid: 0n,
            },
            {
                wp: new AeroflyNavRouteDestination("MAX-SW", -179.999, -89.999),
                assertUid: 51677066167552n,
                ingameUid: 0n,
            },
            {
                wp: new AeroflyNavRouteDestination("KEYW", -81.7599558, 24.5561197),
                assertUid: 5033914504046314752n,
                ingameUid: 5033914504046249216n,
            },
            {
                wp: new AeroflyNavRouteDestination("EGLL", -0.45277777, 51.47138888),
                assertUid: 9200173076798702848n,
                ingameUid: 9199731073154483456n,
            },
            {
                wp: new AeroflyNavRouteDestination("YSSY", 151.177, -33.4961),
                assertUid: 16969826619723154688n,
                ingameUid: 16969837613165511936n,
            },
            {
                wp: new AeroflyNavRouteDestination("RJTT", 139.779, 35.709),
                assertUid: 16385782762532177152n,
                ingameUid: 16385890514078663936n,
            },
        ];
        for (const testCase of testCases) {
            assert.strictEqual(testCase.wp.getUidFallback(), testCase.assertUid, `${testCase.wp.identifier} was ${testCase.ingameUid}`);
        }
    });
    it("should unpack UIDs for airports to code 1280", () => {
        const unpackPayload = (packed) => {
            return Number(packed & 0xffffn);
        };
        const testCases = [
            { uid: 5033914504046314752n, code: 1280, airport: "KEYW" },
            { uid: 9200173076798702848n, code: 1280, airport: "EGLL" },
            { uid: 16969826619723154688n, code: 1280, airport: "YSSY" },
            { uid: 16385782762532177152n, code: 1280, airport: "RJTT" },
        ];
        for (const testCase of testCases) {
            assert.strictEqual(unpackPayload(testCase.uid), testCase.code, testCase.airport);
        }
    });
});
