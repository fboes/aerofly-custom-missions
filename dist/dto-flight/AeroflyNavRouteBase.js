import { Convert } from "../node/Convert.js";
import { AeroflyConfigurationNode, AeroflyConfigurationNodeComment } from "../node/AeroflyConfigurationNode.js";
export class AeroflyNavRouteBase {
    /**
     * @param {AeroflyNavRouteType} type like "origin", "departure_runway", "departure", "waypoint", "arrival", "approach", "destination_runway" or "destination"
     * @param {string} identifier alphanumeric identifier, e.g. "SEA", "PDX", "RWY16L", "FIX1"
     * @param {number} longitude WGS84
     * @param {number} latitude WGS84
     * @param {object} [options] additional options for the waypoint
     * @param {?bigint} [options.uid] unique identifier for the waypoint, must match Aerofly FS internal UID if used in an existing mission, can be null for new waypoints
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
        return Convert.convertLonLatToVector(this.longitude, this.latitude, 0);
    }
    set position(position) {
        const latLonAlt = Convert.convertVectorToLonLat(position);
        this.longitude = latLonAlt.longitude;
        this.latitude = latLonAlt.latitude;
    }
    /**
     * Like `this.positon`, but can be used in a chaining operation
     * @param {AeroflyVector3Float} position to set longitude and latitude from
     * @returns {this} for chaining
     */
    setPosition(position) {
        this.position = position;
        return this;
    }
    getElement(index = 0) {
        const element = new AeroflyConfigurationNode("tmnav_route_" + this.type, this.identifier, String(index))
            .appendChild("string8u", "Identifier", this.identifier)
            .appendChild("vector3_float64", "Position", this.position, `Lon ${this.longitude.toFixed(6)}, Lat ${this.latitude.toFixed(6)}`)
            .append(this.uid
            ? new AeroflyConfigurationNode("uint64", "Uid", this.uid)
            : new AeroflyConfigurationNodeComment("uint64", "Uid", ""));
        return element;
    }
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString() {
        return this.getElement().toString();
    }
}
