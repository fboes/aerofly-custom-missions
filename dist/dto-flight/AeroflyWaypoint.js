import { AeroflyBasicTypes } from "../node/AeroflyBasicTypes.js";
import { AeroflyConfigurationNode, AeroflyConfigurationNodeComment } from "../node/AeroflyConfigurationNode.js";
export class AeroflyWaypoint {
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
    constructor(type, identifier, longitude, latitude, { flyOver: flyOver = false, navaidFrequency = null, altitude = null, altitude_ft = null, elevation = null, elevation_ft = null, uid = null, } = {}) {
        this.type = type;
        this.identifier = identifier;
        this.longitude = longitude;
        this.latitude = latitude;
        this.navaidFrequency = navaidFrequency;
        this.elevation = elevation;
        this.uid = uid;
        this.flyOver = flyOver;
        this.altitude = altitude;
        if (altitude_ft !== null) {
            this.altitude_ft = altitude_ft;
        }
        if (elevation_ft !== null) {
            this.elevation_ft = elevation_ft;
        }
    }
    static createFromCartesian(type, identifier, position, options = {}) {
        const { longitude, latitude, altitude_meter } = AeroflyBasicTypes.convertVectorToLonLat(position);
        return new AeroflyWaypoint(type, identifier, longitude, latitude, { ...options, altitude: altitude_meter });
    }
    get altitude_ft() {
        return this.altitude !== null ? this.altitude * 3.28084 : null;
    }
    set altitude_ft(altitude_ft) {
        this.altitude = altitude_ft !== null ? altitude_ft * 0.3048 : null;
    }
    get elevation_ft() {
        return this.elevation !== null ? this.elevation * 3.28084 : null;
    }
    set elevation_ft(elevation_ft) {
        this.elevation = elevation_ft !== null ? elevation_ft * 0.3048 : null;
    }
    get position() {
        return AeroflyBasicTypes.convertLonLatToVector(this.longitude, this.latitude, this.altitude || 0);
    }
    getElement(index = 0) {
        const element = new AeroflyConfigurationNode("tmnav_route_" + this.type, this.identifier, String(index))
            .appendChild("string8u", "Identifier", this.identifier)
            .appendChild("vector3_float64", "Position", this.position, `Lon ${this.longitude.toPrecision(6)}, Lat ${this.latitude.toPrecision(6)}, ${Math.ceil(this.altitude_ft ?? 0)} ft`)
            .append(this.uid
            ? new AeroflyConfigurationNode("uint64", "Uid", this.uid)
            : new AeroflyConfigurationNodeComment("uint64", "Uid", ""));
        if (this.type === "origin" ||
            this.type === "departure_runway" ||
            this.type === "departure" ||
            this.type === "destination_runway" ||
            this.type === "destination") {
            element.append(this.elevation !== null
                ? new AeroflyConfigurationNode("float64", "Elevation", this.elevation, `${Math.ceil(this.elevation_ft ?? 0)} ft`)
                : new AeroflyConfigurationNodeComment("float64", "Elevation", ""));
        }
        else {
            element.appendChild("bool", "FlyOver", this.flyOver);
            element.appendChild("vector2_float64", "Altitude", this.altitude !== null && this.altitude > 0 ? [this.altitude, this.altitude] : [-1001, 100001], `${this.altitude_ft !== null && this.altitude_ft > 0 ? Math.ceil(this.altitude_ft) + " ft" : "unrestricted"}`);
        }
        if (this.navaidFrequency) {
            element.appendChild("float64", "NavaidFrequency", this.navaidFrequency);
        }
        return element;
    }
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString() {
        return this.getElement().toString();
    }
}
