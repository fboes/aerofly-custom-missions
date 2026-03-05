import { AeroflyVector3Float } from "../node/AeroflyBasicTypes.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
export type AeroflyWaypointType =
    | "origin"
    | "departure_runway"
    | "departure"
    | "waypoint"
    | "arrival"
    | "approach"
    | "destination_runway"
    | "destination";
export declare class AeroflyWaypoint {
    type: AeroflyWaypointType;
    identifier: string;
    longitude: number;
    latitude: number;
    navaidFrequency: number | null;
    altitude: number | null;
    elevation: number | null;
    uid: bigint | null;
    flyOver: boolean;
    /**
     * @param {AeroflyWaypointType} type like "origin", "departure_runway", "departure", "waypoint", "arrival", "approach", "destination_runway" or "destination"
     * @param {string} identifier alphanumeric identifier, e.g. "SEA", "PDX", "RWY16L", "FIX1"
     * @param {number} longitude WGS84
     * @param {number} latitude WGS84
     * @param {object} [options] additional options for the waypoint
     * @param {boolean} [options.flyOver] if true, the waypoint is meant to be flown over, otherwise it can be used as a fly-by waypoint
     * @param {?number} [options.navaidFrequency] if the waypoint is a navaid, its frequency in Hz
     * @param {number} [options.altitude] in meter
     * @param {?number} [options.altitude_ft] altitude in feet, will override altitude in meter if provided
     * @param {?number} [options.elevation] elevation of the waypoint in meter, only used for origin, departure and destination waypoints
     * @param {?number} [options.elevation_ft] elevation of the waypoint in feet, will override elevation in meter if provided
     * @param {?bigint} [options.uid] unique identifier for the waypoint, will be generated automatically if not provided
     */
    constructor(
        type: AeroflyWaypointType,
        identifier: string,
        longitude: number,
        latitude: number,
        {
            flyOver: flyOver,
            navaidFrequency,
            altitude,
            altitude_ft,
            elevation,
            elevation_ft,
            uid,
        }?: Partial<AeroflyWaypoint>,
    );
    static createFromCartesian(
        type: AeroflyWaypointType,
        identifier: string,
        position: AeroflyVector3Float,
        options?: Partial<AeroflyWaypoint>,
    ): AeroflyWaypoint;
    get altitude_ft(): number | null;
    set altitude_ft(altitude_ft: number | null);
    get elevation_ft(): number | null;
    set elevation_ft(elevation_ft: number | null);
    get position(): AeroflyVector3Float;
    getElement(index?: number): AeroflyConfigurationNode;
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(): string;
}
//# sourceMappingURL=AeroflyWaypoint.d.ts.map
