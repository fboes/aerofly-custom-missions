import { Convert } from "../node/Convert.js";
import { AeroflyNavRouteBase } from "./AeroflyNavRouteBase.js";
export class AeroflyNavRouteWaypoint extends AeroflyNavRouteBase {
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
    constructor(identifier, longitude, latitude, { navaidFrequency = null, altitude = null, altitude_ft = null, flyOver = false, uid = null, } = {}) {
        super("waypoint", identifier, longitude, latitude, { uid });
        this.identifier = identifier;
        this.longitude = longitude;
        this.latitude = latitude;
        this.navaidFrequency = navaidFrequency;
        this.altitude = altitude;
        if (altitude_ft !== null) {
            this.altitude_ft = altitude_ft;
        }
        this.flyOver = flyOver;
    }
    /**
     * @returns {number | null} altitude in feet, null if not set
     */
    get altitude_ft() {
        return this.altitude !== null ? Convert.convertMeterToFeet(this.altitude) : null;
    }
    set altitude_ft(altitude_ft) {
        this.altitude = altitude_ft !== null ? Convert.convertFeetToMeter(altitude_ft) : null;
    }
    /**
     * @returns {AeroflyVector3Float} to use in Aerofly FS4's `main.mcf`
     */
    get position() {
        return Convert.convertLonLatToVector(this.longitude, this.latitude, this.altitude || 0);
    }
    set position(position) {
        const { longitude, latitude, altitude_meter } = Convert.convertVectorToLonLat(position);
        this.longitude = longitude;
        this.latitude = latitude;
        this.altitude = altitude_meter;
    }
    getElement(index = 0) {
        const element = super.getElement(index);
        if (this.navaidFrequency) {
            element.appendChild("float64", "NavaidFrequency", this.navaidFrequency);
        }
        element
            .appendChild("vector2_float64", "Altitude", this.altitude !== null && this.altitude > 0 ? [this.altitude, this.altitude] : [-1001, 100001], `${this.altitude_ft !== null && this.altitude_ft > 0 ? Math.ceil(this.altitude_ft) + " ft" : "unrestricted"}`)
            .appendChild("bool", "FlyOver", this.flyOver);
        return element;
    }
}
