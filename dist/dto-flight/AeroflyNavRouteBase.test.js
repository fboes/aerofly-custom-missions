import { describe, it } from "node:test";
import { AeroflyNavRouteDestination } from "../index.js";
describe("AeroflyNavRouteBase", () => {
    it("should create a valid AeroflyNavRouteBase structure", () => {
        const waypoints = [
            { wp: new AeroflyNavRouteDestination("MAX-NE", 179.999, 89.999), uid: 0n },
            { wp: new AeroflyNavRouteDestination("MAX-SW", -179.999, -89.999), uid: 0n },
            { wp: new AeroflyNavRouteDestination("KEYW", -81.7599558, 24.5561197), uid: 5033914504046249216n },
            { wp: new AeroflyNavRouteDestination("EGLL", -0.45277777, 51.47138888), uid: 9199731073154483456n },
            { wp: new AeroflyNavRouteDestination("YSSY", 151.177, -33.4961), uid: 16969837613165511936n },
            { wp: new AeroflyNavRouteDestination("RJTT", 139.779, 35.709), uid: 16385890514078663936n },
        ];
        for (const waypoint of waypoints) {
            console.log(waypoint.wp.getUidFallback(), waypoint.uid);
        }
    });
    it("should test some unpacking of UIDs", () => {
        const unpackPayload = (packed) => {
            return Number(packed & 0xffffn);
        };
        console.log("KEYW", unpackPayload(5033914504046314752n));
        console.log("EGLL", unpackPayload(9200173076798702848n));
        console.log("YSSY", unpackPayload(16969826619723154688n));
        console.log("RJTT", unpackPayload(16385782762532177152n));
    });
});
