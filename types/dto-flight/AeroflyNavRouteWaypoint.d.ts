import { AeroflyVector3Float } from "../node/Convert.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { AeroflyNavRouteBase } from "./AeroflyNavRouteBase.js";
export declare class AeroflyNavRouteWaypoint extends AeroflyNavRouteBase {
    identifier: string;
    longitude: number;
    latitude: number;
    /**
     * @property {?number} navaidFrequency if the waypoint is a navaid, its frequency in Hz
     */
    navaidFrequency: number | null;
    /**
     * @property {number | null} altitude in meter, null if not set
     */
    altitude: number | null;
    /**
     * @property {boolean} flyOver if true, the waypoint is meant to be flown over, otherwise it can be used as a fly-by waypoint
     */
    flyOver: boolean;
    /**
     * @param {string} identifier alphanumeric identifier, e.g. "SEA", "PDX", "RWY16L", "FIX1"
     * @param {number} longitude WGS84
     * @param {number} latitude WGS84
     * @param {object} [options] additional options for the waypoint
     * @param {?number} [options.navaidFrequency] if the waypoint is a navaid, its frequency in Hz
     * @param {number} [options.altitude] in meter
     * @param {?number} [options.altitude_ft] altitude in feet, will override altitude in meter if provided
     * @param {boolean} [options.flyOver] if true, the waypoint is meant to be flown over, otherwise it can be used as a fly-by waypoint
     * @param {?bigint} [options.uid] unique identifier for the waypoint, will be generated automatically if not provided
     */
    constructor(
        identifier: string,
        longitude: number,
        latitude: number,
        {
            navaidFrequency,
            navaidFrequency_khz,
            navaidFrequency_mhz,
            altitude,
            altitude_ft,
            flyOver,
            uid,
        }?: Partial<AeroflyNavRouteWaypoint>,
    );
    /**
     * @returns {number | null} altitude in feet, null if not set
     */
    get altitude_ft(): number | null;
    set altitude_ft(altitude_ft: number | null);
    get navaidFrequency_khz(): number | null;
    set navaidFrequency_khz(navaidFrequency_khz: number | null);
    get navaidFrequency_mhz(): number | null;
    set navaidFrequency_mhz(navaidFrequency_mhz: number | null);
    /**
     * @returns {AeroflyVector3Float} to use in Aerofly FS4's `main.mcf`
     */
    get position(): AeroflyVector3Float;
    set position(position: AeroflyVector3Float);
    getElement(index?: number): AeroflyConfigurationNode;
    toJSON(): never;
}
//# sourceMappingURL=AeroflyNavRouteWaypoint.d.ts.map
