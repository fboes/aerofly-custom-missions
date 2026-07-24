import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { AeroflyVector3Float, type AeroflyVector3FloatArray } from "../node/AeroflyTypes.js";
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
     * @property {?bigint} uid unique identifier for the waypoint, must match Aerofly FS internal UID if used in an existing mission. Obviously the UID encodes the geographic position as well as the name of the waypoint.
     */
    uid: bigint | null;
    /**
     * @param {AeroflyNavRouteType} type like "origin", "departure_runway", "departure", "waypoint", "arrival", "approach", "destination_runway" or "destination"
     * @param {string} identifier alphanumeric identifier, e.g. "SEA", "PDX", "RWY16L", "FIX1"
     * @param {number} longitude WGS84
     * @param {number} latitude WGS84
     * @param {object} [options] additional options for the waypoint
     * @param {?bigint} [options.uid] unique identifier for the waypoint, must match Aerofly FS internal UID if used in an existing mission. Obviously the UID encodes the geographic position as well as the name of the waypoint.
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
    setPosition(position: AeroflyVector3FloatArray): this;
    getElement(index?: number): AeroflyConfigurationNode;
    /**
     * @returns {bigint} 24 bit longitude
     * @see https://www.aerofly.com/community/forum/index.php?thread/29490-navdata-coordinates-to-uid/
     */
    private encodeLongitude;
    /**
     * @returns {bigint} 24 bit latitude
     * @see https://www.aerofly.com/community/forum/index.php?thread/29490-navdata-coordinates-to-uid/
     */
    private encodeLatitude;
    /**
     * @returns {number} 16 bit type
     */
    private encodeWaypointType;
    /**
     * @returns {bigint} Packs both into a single 64-bit value:
     * - Bits 63..40 → longitude  (24 bit)
     * - Bits 39..16 → latitude   (24 bit)
     * - Bits 15..0  → payload    (16 bit)
     * @see https://www.aerofly.com/community/forum/index.php?thread/29490-navdata-coordinates-to-uid/
     */
    getUidFallback(): bigint;
    toJSON(): this & {
        uid: string | null;
    };
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(): string;
}
//# sourceMappingURL=AeroflyNavRouteBase.d.ts.map
