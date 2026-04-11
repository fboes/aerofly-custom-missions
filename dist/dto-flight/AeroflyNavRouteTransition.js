import { Convert } from "../node/Convert.js";
import { AeroflyNavRouteBase } from "./AeroflyNavRouteBase.js";
class AeroflyNavRouteTransition extends AeroflyNavRouteBase {
    constructor(type, identifier, airport, options = {}) {
        super(type, identifier, 0, 0, options);
        this.airport = airport;
        this.transition = options.transition ?? "";
        this.transitionUid = options.transitionUid !== undefined ? options.transitionUid : null;
        this.elevation = options.elevation !== undefined ? options.elevation : null;
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
     * @returns {AeroflyVector3Float} deliberately empty
     */
    get position() {
        return [0, 0, 0]; // sic!
    }
    /**
     * @returns {AeroflyVector3Float} deliberately empty
     */
    get direction() {
        return [0, 0, 0]; // sic!
    }
    getElement(index = 0) {
        const element = super.getElement(index);
        element
            .appendChild("string8u", "Airport", this.airport)
            .appendChild("vector3_float64", "Direction", this.direction)
            .appendChild("float64", "Elevation", this.elevation ?? 0, `Elevation ${this.elevation_ft !== null ? Math.ceil(this.elevation_ft) + " ft" : "unknown"}`)
            .appendChild("string8u", "Transition", this.transition)
            .appendChild("uint64", "TransitionUid", this.transitionUid ?? 0);
        return element;
    }
    toJSON() {
        return {
            ...this,
            uid: this.uid !== null ? this.uid.toString() : null,
            transitionUid: this.transitionUid !== null ? this.transitionUid.toString() : null,
            elevation: undefined,
            elevation_ft: this.elevation_ft,
        };
    }
}
export class AeroflyNavRouteApproach extends AeroflyNavRouteTransition {
    /**
     * @inheritdoc
     */
    constructor(identifier, airport, options = {}) {
        super("approach", identifier, airport, options);
    }
}
export class AeroflyNavRouteArrival extends AeroflyNavRouteTransition {
    /**
     * @inheritdoc
     */
    constructor(identifier, airport, options = {}) {
        super("arrival", identifier, airport, options);
        // TODO: Remove transition
    }
    getElement(index = 0) {
        const element = super.getElement(index);
        element
            .appendChild("string8u", "Airport", this.airport)
            .appendChild("vector3_float64", "Direction", this.direction)
            .appendChild("float64", "Elevation", this.elevation ?? 0, `Elevation ${this.elevation_ft !== null ? Math.ceil(this.elevation_ft) + " ft" : "unknown"}`);
        return element;
    }
}
export class AeroflyNavRouteDeparture extends AeroflyNavRouteTransition {
    /**
     * @inheritdoc
     */
    constructor(identifier, airport, options = {}) {
        super("departure", identifier, airport, options);
    }
}
