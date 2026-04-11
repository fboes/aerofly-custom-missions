import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { AeroflyNavRouteBase, AeroflyNavRouteType } from "./AeroflyNavRouteBase.js";
declare class AeroflyNavRouteAirport extends AeroflyNavRouteBase {
    /**
     * @property {number | null} elevation in meters, null if not set
     */
    elevation: number | null;
    /**
     * @param {AeroflyNavRouteType} type like "origin", "departure_runway", "departure", "waypoint", "arrival", "approach", "destination_runway" or "destination"
     * @param {string} identifier alphanumeric identifier, e.g. "SEA", "PDX", "RWY16L", "FIX1"
     * @param {number} longitude WGS84
     * @param {number} latitude WGS84
     * @param {object} [options] additional options for the waypoint
     * @param {?number} [options.elevation] elevation in meters, null if not set
     * @param {?number} [options.elevation_ft] elevation in feet, null if not set
     * @param {?bigint} [options.uid] unique identifier for the waypoint, must match Aerofly FS internal UID if used in an existing mission, can be null for new waypoints
     */
    constructor(
        type: AeroflyNavRouteType,
        identifier: string,
        longitude: number,
        latitude: number,
        { elevation, elevation_ft, uid }?: Partial<AeroflyNavRouteAirport>,
    );
    /**
     * @returns {number | null} elevation in feet, null if not set
     */
    get elevation_ft(): number | null;
    set elevation_ft(elevation_ft: number | null);
    getElement(index?: number): AeroflyConfigurationNode;
    toJSON(): never;
}
export declare class AeroflyNavRouteOrigin extends AeroflyNavRouteAirport {
    /**
     * @inheritdoc
     */
    constructor(
        identifier: string,
        longitude: number,
        latitude: number,
        { elevation, elevation_ft, uid }?: Partial<AeroflyNavRouteOrigin>,
    );
}
export declare class AeroflyNavRouteDestination extends AeroflyNavRouteAirport {
    /**
     * @inheritdoc
     */
    constructor(
        identifier: string,
        longitude: number,
        latitude: number,
        { elevation, elevation_ft, uid }?: Partial<AeroflyNavRouteDestination>,
    );
}
export {};
//# sourceMappingURL=AeroflyNavRouteAirports.d.ts.map
