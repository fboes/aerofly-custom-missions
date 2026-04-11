import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { Convert } from "../node/Convert.js";
import { AeroflyNavRouteBase, AeroflyNavRouteType } from "./AeroflyNavRouteBase.js";

class AeroflyNavRouteAirport extends AeroflyNavRouteBase {
    /**
     * @property {number | null} elevation in meters, null if not set
     */
    elevation: number | null;

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
    constructor(
        type: AeroflyNavRouteType,
        identifier: string,
        longitude: number,
        latitude: number,
        { elevation = null, elevation_ft = null, uid = null }: Partial<AeroflyNavRouteAirport> = {},
    ) {
        super(type, identifier, longitude, latitude, { uid });
        this.elevation = elevation;
        if (elevation_ft !== null) {
            this.elevation_ft = elevation_ft;
        }
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

    getElement(index: number = 0): AeroflyConfigurationNode {
        const element = super.getElement(index);
        if (this.elevation !== null) {
            element.appendChild(
                "float64",
                "Elevation",
                this.elevation,
                this.elevation_ft ? `Elevation ${Math.ceil(this.elevation_ft)} ft` : undefined,
            );
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
    constructor(
        identifier: string,
        longitude: number,
        latitude: number,
        { elevation = null, elevation_ft = null, uid = null }: Partial<AeroflyNavRouteOrigin> = {},
    ) {
        super("origin", identifier, longitude, latitude, { elevation, elevation_ft, uid });
    }
}

export class AeroflyNavRouteDestination extends AeroflyNavRouteAirport {
    /**
     * @inheritdoc
     */
    constructor(
        identifier: string,
        longitude: number,
        latitude: number,
        { elevation = null, elevation_ft = null, uid = null }: Partial<AeroflyNavRouteDestination> = {},
    ) {
        super("destination", identifier, longitude, latitude, { elevation, elevation_ft, uid });
    }
}
