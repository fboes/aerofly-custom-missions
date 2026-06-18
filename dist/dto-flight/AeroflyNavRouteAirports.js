import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { Convert } from "../node/Convert.js";
import { AeroflyNavRouteBase } from "./AeroflyNavRouteBase.js";
class AeroflyNavRouteAirport extends AeroflyNavRouteBase {
    /**
     * @property {number | null} elevation in meters, null if not set
     */
    elevation;
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
    constructor(type, identifier, longitude, latitude, { elevation = null, elevation_ft = null, uid = null } = {}) {
        super(type, identifier, longitude, latitude, { uid });
        this.elevation = elevation;
        if (elevation_ft !== null) {
            this.elevation_ft = elevation_ft;
        }
    }
    /**
     * @returns {number | null} elevation in feet, null if not set
     */
    get elevation_ft() {
        return this.elevation !== null ? Convert.convertMeterToFeet(this.elevation) : null;
    }
    set elevation_ft(elevation_ft) {
        this.elevation = elevation_ft !== null ? Convert.convertFeetToMeter(elevation_ft) : null;
    }
    getElement(index = 0) {
        const element = super.getElement(index);
        if (this.elevation !== null) {
            element.appendChild("float64", "Elevation", this.elevation, this.elevation_ft ? `Elevation ${Math.ceil(this.elevation_ft)} ft` : undefined);
        }
        return element;
    }
    toJSON() {
        return {
            ...this,
            uid: this.uid !== null ? this.uid.toString() : null,
            elevation: undefined,
            elevation_ft: this.elevation_ft,
        };
    }
}
export class AeroflyNavRouteOrigin extends AeroflyNavRouteAirport {
    /**
     * @inheritdoc
     */
    constructor(identifier, longitude, latitude, { elevation = null, elevation_ft = null, uid = null } = {}) {
        super("origin", identifier, longitude, latitude, { elevation, elevation_ft, uid });
    }
}
export class AeroflyNavRouteDestination extends AeroflyNavRouteAirport {
    /**
     * @inheritdoc
     */
    constructor(identifier, longitude, latitude, { elevation = null, elevation_ft = null, uid = null } = {}) {
        super("destination", identifier, longitude, latitude, { elevation, elevation_ft, uid });
    }
}
