import { AeroflyVector3Float } from "../node/Convert.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
export type AeroflyNavRouteType =
    | "origin"
    | "departure_runway"
    | "departure"
    | "waypoint"
    | "arrival"
    | "approach"
    | "destination_runway"
    | "destination";
export declare class AeroflyNavRouteBase {
    /**
     * @property {AeroflyNavRouteType} type like "origin", "departure_runway", "departure", "waypoint", "arrival", "approach", "destination_runway" or "destination"
     */
    type: AeroflyNavRouteType;
    /**
     * @property {string} identifier alphanumeric identifier, e.g. "SEA", "PDX", "RWY16L", "FIX1"
     */
    identifier: string;
    /**
     * @property {number} longitude WGS84
     */
    longitude: number;
    /**
     * @property {number} latitude WGS84
     */
    latitude: number;
    /**
     * @property {?bigint} uid unique identifier for the waypoint, must match Aerofly FS internal UID if used in an existing mission, can be null for new waypoints
     */
    uid: bigint | null;
    /**
     * @param {AeroflyNavRouteType} type like "origin", "departure_runway", "departure", "waypoint", "arrival", "approach", "destination_runway" or "destination"
     * @param {string} identifier alphanumeric identifier, e.g. "SEA", "PDX", "RWY16L", "FIX1"
     * @param {number} longitude WGS84
     * @param {number} latitude WGS84
     * @param {object} [options] additional options for the waypoint
     * @param {?bigint} [options.uid] unique identifier for the waypoint, must match Aerofly FS internal UID if used in an existing mission, can be null for new waypoints
     */
    constructor(
        type: AeroflyNavRouteType,
        identifier: string,
        longitude: number,
        latitude: number,
        { uid }?: Partial<AeroflyNavRouteBase>,
    );
    /**
     * @returns {AeroflyVector3Float} to use in Aerofly FS4's `main.mcf`
     */
    get position(): AeroflyVector3Float;
    set position(position: AeroflyVector3Float);
    /**
     * Like `this.positon`, but can be used in a chaining operation
     * @param {AeroflyVector3Float} position to set longitude and latitude from
     * @returns {this} for chaining
     */
    setPosition(position: AeroflyVector3Float): this;
    getElement(index?: number): AeroflyConfigurationNode;
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(): string;
}
//# sourceMappingURL=AeroflyNavRouteBase.d.ts.map
