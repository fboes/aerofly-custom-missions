import { convertLonLatToVector, convertVectorToLonLat } from "../node/Convert.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { AeroflyVector3Float } from "../node/AeroflyTypes.js";
export class AeroflyNavRouteBase {
    /**
     * @property {AeroflyNavRouteType} type like "origin", "departure_runway", "departure", "waypoint", "arrival", "approach", "destination_runway" or "destination"
     */
    type;
    /**
     * @property {string} identifier alphanumeric identifier, e.g. "SEA", "PDX", "RWY16L", "FIX1"
     */
    identifier;
    /**
     * @property {number} longitude WGS84
     */
    longitude;
    /**
     * @property {number} latitude WGS84
     */
    latitude;
    /**
     * @property {?bigint} uid unique identifier for the waypoint, must match Aerofly FS internal UID if used in an existing mission. Obviously the UID encodes the geographic position as well as the name of the waypoint.
     */
    uid;
    /**
     * @param {AeroflyNavRouteType} type like "origin", "departure_runway", "departure", "waypoint", "arrival", "approach", "destination_runway" or "destination"
     * @param {string} identifier alphanumeric identifier, e.g. "SEA", "PDX", "RWY16L", "FIX1"
     * @param {number} longitude WGS84
     * @param {number} latitude WGS84
     * @param {object} [options] additional options for the waypoint
     * @param {?bigint} [options.uid] unique identifier for the waypoint, must match Aerofly FS internal UID if used in an existing mission. Obviously the UID encodes the geographic position as well as the name of the waypoint.
     */
    constructor(type, identifier, longitude, latitude, { uid = null } = {}) {
        this.type = type;
        this.identifier = identifier;
        this.longitude = longitude;
        this.latitude = latitude;
        this.uid = uid;
    }
    /**
     * @returns {AeroflyVector3Float} to use in Aerofly FS4's `main.mcf`
     */
    get position() {
        return convertLonLatToVector(this.longitude, this.latitude, 0);
    }
    set position(position) {
        const latLonAlt = convertVectorToLonLat(position);
        this.longitude = latLonAlt.longitude;
        this.latitude = latLonAlt.latitude;
    }
    /**
     * Like `this.positon`, but can be used in a chaining operation
     * @param {AeroflyVector3Float} position to set longitude and latitude from
     * @returns {this} for chaining
     */
    setPosition(position) {
        this.position = AeroflyVector3Float.fromArray(position);
        return this;
    }
    getElement(index = 0) {
        const element = new AeroflyConfigurationNode("tmnav_route_" + this.type, this.identifier, String(index))
            .appendChild("string8u", "Identifier", this.identifier)
            .appendChild("vector3_float64", "Position", this.position.toArray(), `Lon ${this.longitude.toFixed(6)}, Lat ${this.latitude.toFixed(6)}`)
            .appendChild("uint64", "Uid", this.uid ?? this.getUidFallback(), this.uid ? "" : "Fallback UID, not matching Aerofly FS internal UID");
        return element;
    }
    /**
     * @returns {bigint} 24 bit longitude
     * @see https://www.aerofly.com/community/forum/index.php?thread/29490-navdata-coordinates-to-uid/
     */
    encodeLongitude() {
        let scaled = this.longitude / 180;
        scaled = 65536.0 * (0.5 + 0.5 * scaled); // 16 bit
        return BigInt(Math.round(256.0 * scaled + 0.5)); // 24 bit
    }
    /**
     * @returns {bigint} 24 bit latitude
     * @see https://www.aerofly.com/community/forum/index.php?thread/29490-navdata-coordinates-to-uid/
     */
    encodeLatitude() {
        const worldGridConstantA = 2.3311223704144;
        let scaled = this.latitude / 180;
        scaled = Math.tan(worldGridConstantA * scaled) / worldGridConstantA;
        scaled = 65536.0 * (0.5 + 0.5 * scaled); // 16 bit
        return BigInt(Math.round(256.0 * scaled + 0.5)); // 24 bit
    }
    /**
     * @returns {number} 16 bit type
     */
    encodeWaypointType() {
        // Type code (airport (0500) / runway (0800) / SID (4400) / STAR (4800) / Approach (4C00) / RNAV waypoint (C000) / airways (4000)
        switch (this.type) {
            case "origin":
            case "destination":
                return 0x0500;
            case "departure_runway":
            case "destination_runway":
                return 0x0800;
            case "departure":
                return 0x4400;
            case "arrival":
                return 0x4800;
            case "approach":
                return 0x4c00;
        }
        return 0;
    }
    /**
     * @returns {bigint} Packs both into a single 64-bit value:
     * - Bits 63..40 → longitude  (24 bit)
     * - Bits 39..16 → latitude   (24 bit)
     * - Bits 15..0  → payload    (16 bit)
     * @see https://www.aerofly.com/community/forum/index.php?thread/29490-navdata-coordinates-to-uid/
     */
    getUidFallback() {
        return ((this.encodeLongitude() << 40n) |
            (this.encodeLatitude() << 16n) |
            (BigInt(this.encodeWaypointType()) & 0xffffn));
    }
    toJSON() {
        return {
            ...this,
            uid: this.uid !== null ? this.uid.toString() : null,
        };
    }
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString() {
        return this.getElement().toString();
    }
}
