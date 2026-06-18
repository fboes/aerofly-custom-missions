import { Convert } from "../node/Convert.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { AeroflyNavRouteBase } from "./AeroflyNavRouteBase.js";
class AeroflyNavRouteRunway extends AeroflyNavRouteBase {
    /**
     * @property {?number} direction_degree runway direction in degrees, null if not set
     */
    direction_degree;
    /**
     * @property {number | null} elevation in meters, null if not set
     */
    elevation;
    /**
     * @property {number | null} runwayLength in meters, null if not set
     */
    runwayLength;
    constructor(type, identifier, longitude, latitude, { direction_degree = null, elevation = null, elevation_ft = null, runwayLength = null, uid = null, } = {}) {
        super(type, identifier, longitude, latitude, { uid });
        this.elevation = elevation;
        if (elevation_ft !== null) {
            this.elevation_ft = elevation_ft;
        }
        this.direction_degree = direction_degree !== undefined ? direction_degree : null;
        this.runwayLength = runwayLength !== undefined ? runwayLength : null;
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
    /**
     * @returns {number | null} runway length in feet, null if not set
     */
    get runwayLength_ft() {
        return this.runwayLength !== null ? Convert.convertMeterToFeet(this.runwayLength) : null;
    }
    set runwayLength_ft(runwayLength_ft) {
        this.runwayLength = runwayLength_ft !== null ? Convert.convertFeetToMeter(runwayLength_ft) : null;
    }
    /**
     * @returns {AeroflyVector3Float | null} runway direction, null if not set
     */
    get direction() {
        // TODO: calculate direction vector from direction_degree
        return this.direction_degree !== null ? [0, 0, 0] : null;
    }
    set direction(direction) {
        this.direction_degree = 0; // TODO: calculate direction_degree from direction vector
    }
    getElement(index = 0) {
        const element = super.getElement(index);
        if (this.direction !== null) {
            element.appendChild("vector3_float64", "Direction", this.direction, `Runway direction ${Math.round(this.direction_degree ?? 0)}°`);
        }
        if (this.elevation !== null) {
            element.appendChild("float64", "Elevation", this.elevation, this.elevation_ft ? `Elevation ${Math.ceil(this.elevation_ft)} ft` : undefined);
        }
        if (this.runwayLength !== null) {
            element.appendChild("float64", "RunwayLength", this.runwayLength, `Runway length ${Math.floor(this.runwayLength_ft ?? 0)} ft`);
        }
        return element;
    }
    toJSON() {
        return {
            ...this,
            uid: this.uid !== null ? this.uid.toString() : null,
            elevation: undefined,
            elevation_ft: this.elevation_ft,
            runwayLength: undefined,
            runwayLength_ft: this.runwayLength_ft,
        };
    }
}
export class AeroflyNavRouteDepartureRunway extends AeroflyNavRouteRunway {
    /**
     * @inheritdoc
     */
    constructor(identifier, longitude, latitude, options = {}) {
        super("departure_runway", identifier, longitude, latitude, options);
    }
}
export class AeroflyNavRouteDestinationRunway extends AeroflyNavRouteRunway {
    /**
     * @inheritdoc
     */
    constructor(identifier, longitude, latitude, options = {}) {
        super("destination_runway", identifier, longitude, latitude, options);
    }
}
