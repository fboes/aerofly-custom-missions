import { AeroflyVector3Float, Convert } from "../node/Convert.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { AeroflyNavRouteBase, AeroflyNavRouteType } from "./AeroflyNavRouteBase.js";

class AeroflyNavRouteTransition extends AeroflyNavRouteBase {
    /**
     * @property {string} airport ICAO code of the airport this transition belongs to, e.g. "SEA", "PDX"
     */
    airport: string;

    /**
     * @property {string} transition name, e.g. "SID1", "STAR1", "APP1"
     */
    transition: string;

    /**
     * @property {?bigint} transitionUid unique identifier for the transition, can be null if not set
     */
    transitionUid: bigint | null;

    /**
     * @property {?number} elevation in meters, null if not set
     */
    elevation: number | null;

    constructor(
        type: AeroflyNavRouteType,
        identifier: string,
        airport: string,
        options: Partial<AeroflyNavRouteTransition> = {},
    ) {
        super(type, identifier, 0, 0, options);

        this.airport = airport;
        this.transition = options.transition ?? "";
        this.transitionUid = options.transitionUid !== undefined ? options.transitionUid : null;
        this.elevation = options.elevation !== undefined ? options.elevation : null;
    }

    /**
     * @returns {number | null} elevation in feet, null if not set
     */
    get elevation_ft(): number | null {
        return this.elevation !== null ? Convert.convertMeterToFeet(this.elevation) : null;
    }

    set elevation_ft(elevation_ft: number | null) {
        this.elevation = elevation_ft !== null ? Convert.convertFeetToMeter(elevation_ft) : null;
    }

    /**
     * @returns {AeroflyVector3Float} deliberately empty
     */
    get position(): AeroflyVector3Float {
        return [0, 0, 0]; // sic!
    }

    /**
     * @returns {AeroflyVector3Float} deliberately empty
     */
    get direction(): AeroflyVector3Float {
        return [0, 0, 0]; // sic!
    }

    getElement(index: number = 0): AeroflyConfigurationNode {
        const element = super.getElement(index);

        element
            .appendChild("string8u", "Airport", this.airport)
            .appendChild("vector3_float64", "Direction", this.direction)
            .appendChild(
                "float64",
                "Elevation",
                this.elevation ?? 0,
                `Elevation ${this.elevation_ft !== null ? Math.ceil(this.elevation_ft) + " ft" : "unknown"}`,
            )
            .appendChild("string8u", "Transition", this.transition)
            .appendChild("uint64", "TransitionUid", this.transitionUid ?? 0);

        return element;
    }
}

export class AeroflyNavRouteApproach extends AeroflyNavRouteTransition {
    /**
     * @inheritdoc
     */
    constructor(identifier: string, airport: string, options: Partial<AeroflyNavRouteTransition> = {}) {
        super("approach", identifier, airport, options);
    }
}

export class AeroflyNavRouteArrival extends AeroflyNavRouteTransition {
    /**
     * @inheritdoc
     */
    constructor(identifier: string, airport: string, options: Partial<AeroflyNavRouteTransition> = {}) {
        super("arrival", identifier, airport, options);

        // TODO: Remove transition
    }

    getElement(index: number = 0): AeroflyConfigurationNode {
        const element = super.getElement(index);

        element
            .appendChild("string8u", "Airport", this.airport)
            .appendChild("vector3_float64", "Direction", this.direction)
            .appendChild(
                "float64",
                "Elevation",
                this.elevation ?? 0,
                `Elevation ${this.elevation_ft !== null ? Math.ceil(this.elevation_ft) + " ft" : "unknown"}`,
            );

        return element;
    }
}

export class AeroflyNavRouteDeparture extends AeroflyNavRouteTransition {
    /**
     * @inheritdoc
     */
    constructor(identifier: string, airport: string, options: Partial<AeroflyNavRouteTransition> = {}) {
        super("departure", identifier, airport, options);
    }
}
