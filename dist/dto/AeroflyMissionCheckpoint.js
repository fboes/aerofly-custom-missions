import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { feetPerMeter } from "./AeroflyMission.js";
/**
 * @class
 * A single way point for the given flight plan
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export class AeroflyMissionCheckpoint {
    /**
     * @param {string} name ICAO code for airport, runway designator, navaid
     *    designator, fix name, or custom name
     * @param {"origin"|"departure_runway"|"departure"|"waypoint"|"arrival"|"approach"|"destination_runway"|"destination"} type Type of checkpoint, like "departure_runway"
     * @param {number} longitude easting, using the World Geodetic
     *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *    of decimal degrees; -180..180
     * @param {number} latitude northing, using the World Geodetic
     *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *    of decimal degrees; -90..90
     * @param {object} additionalAttributes allows to set additional attributes on creation
     * @param {number} [additionalAttributes.altitude] The height in meters above or below the WGS
     *    84 reference ellipsoid
     * @param {?number} [additionalAttributes.altitude_feet] The height in feet above or below the WGS
     *    84 reference ellipsoid. Will overwrite altitude
     * @param {number} [additionalAttributes.altitudeConstraint] The altitude given in `altitude`
     *    will be interpreted as mandatory flight plan altitude instead of
     *    suggestion.
     * @param {boolean} [additionalAttributes.direction] of runway, in degree
     * @param {?number} [additionalAttributes.slope] of runway
     * @param {?number} [additionalAttributes.length] of runway, in meters
     * @param {?number} [additionalAttributes.length_feet] of runway, in feet. Will overwrite length
     * @param {?number} [additionalAttributes.frequency] of runways or navigational aids, in Hz; multiply by 1000 for kHz, 1_000_000 for MHz
     * @param {?boolean} [additionalAttributes.flyOver] if waypoint is meant to be flown over
     */
    constructor(name, type, longitude, latitude, { altitude = 0, altitude_feet = 0, altitudeConstraint = null, direction = null, slope = null, length = null, length_feet = 0, frequency = null, flyOver = null, } = {}) {
        this.type = type;
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.altitude = altitude;
        this.altitudeConstraint = altitudeConstraint;
        this.direction = direction;
        this.slope = slope;
        this.length = length;
        this.frequency = frequency;
        this.flyOver = flyOver;
        if (altitude_feet) {
            this.altitude_feet = altitude_feet;
        }
        if (length_feet) {
            this.length_feet = length_feet;
        }
    }
    /**
     * @param {number} altitude_feet in feet
     */
    set altitude_feet(altitude_feet) {
        this.altitude = altitude_feet / feetPerMeter;
    }
    /**
     * @returns {number} altitude_feet
     */
    get altitude_feet() {
        return this.altitude * feetPerMeter;
    }
    /**
     * @param {number} length_feet in feet
     */
    set length_feet(length_feet) {
        this.length = length_feet / feetPerMeter;
    }
    /**
     * @returns {number} length_feet
     */
    get length_feet() {
        return (this.length ?? 0) * feetPerMeter;
    }
    /**
     * @returns {string} with MHz / kHz attached
     */
    get frequency_string() {
        if (!this.frequency) {
            return "None";
        }
        if (this.frequency > 1000000) {
            return String(this.frequency / 1000000) + " MHz";
        }
        if (this.frequency > 1000) {
            return String(this.frequency / 1000) + " kHz";
        }
        return String(this.frequency) + " Hz";
    }
    /**
     * @param {number} index default: 0
     * @returns {AeroflyConfigurationNode} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    getElement(index = 0) {
        const element = new AeroflyConfigurationNode("tmmission_checkpoint", "element", String(index))
            .appendChild("string8u", "type", this.type)
            .appendChild("string8u", "name", this.name)
            .appendChild("vector2_float64", "lon_lat", [this.longitude, this.latitude])
            .appendChild("float64", "altitude", this.altitude, `${Math.ceil(this.altitude_feet)} ft`)
            .appendChild("float64", "direction", this.direction ?? (index === 0 ? -1 : 0))
            .appendChild("float64", "slope", this.slope ?? 0);
        if (this.altitudeConstraint !== null) {
            element.appendChild("bool", "alt_cst", this.altitudeConstraint);
        }
        if (this.length) {
            element.appendChild("float64", "length", this.length ?? 0, `${Math.floor(this.length_feet)} ft`);
        }
        if (this.frequency) {
            element.appendChild("float64", "frequency", this.frequency ?? 0, `${this.frequency_string}`);
        }
        if (this.flyOver !== null) {
            element.appendChild("bool", "fly_over", this.flyOver);
        }
        return element;
    }
    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString() {
        return this.getElement().toString();
    }
}
