/**
 * Types of checkpoints. Required are usually "origin", "departure_runway" at the start and "destination_runway", "destination" at the end.
 */
export type AeroflyMissionCheckpointType =
    | "origin"
    | "departure_runway"
    | "departure"
    | "waypoint"
    | "arrival"
    | "approach"
    | "destination_runway"
    | "destination";
/**
 * @class
 * A single way point for the given flight plan
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export declare class AeroflyMissionCheckpoint {
    /**
     * @property {"origin"|"departure_runway"|"departure"|"waypoint"|"arrival"|"approach"|"destination_runway"|"destination"} type of checkpoint, like "departure_runway"
     */
    type: AeroflyMissionCheckpointType;
    /**
     * @property {string} name ICAO code for airport, runway designator, navaid
     *    designator, fix name, or custom name
     */
    name: string;
    /**
     * @property {number} longitude easting, using the World Geodetic
     *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *    of decimal degrees; -180..180
     */
    longitude: number;
    /**
     * @property {number} latitude northing, using the World Geodetic
     *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *    of decimal degrees; -90..90
     */
    latitude: number;
    /**
     * @property {number} altitude The height in meters above or below the WGS
     *    84 reference ellipsoid
     */
    altitude: number;
    /**
     * @property {?boolean} altitudeConstraint The altitude given in `altitude`
     *    will be interpreted as mandatory flight plan altitude instead of
     *    suggestion.
     */
    altitudeConstraint: boolean | null;
    /**
     * @property {?number} direction of runway, in degree
     */
    direction: number | null;
    /**
     * @property {?number} slope of runway
     */
    slope: number | null;
    /**
     * @property {?number} length of runway, in meters
     */
    length: number | null;
    /**
     * @property {?number} frequency of runways or navigational aids, in Hz; multiply by 1000 for kHz, 1_000_000 for MHz
     */
    frequency: number | null;
    /**
     * @property {?boolean} flyOver if waypoint is meant to be flown over
     */
    flyOver: boolean | null;
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
    constructor(
        name: string,
        type: AeroflyMissionCheckpointType,
        longitude: number,
        latitude: number,
        {
            altitude,
            altitude_feet,
            altitudeConstraint,
            direction,
            slope,
            length,
            length_feet,
            frequency,
            flyOver,
        }?: Partial<AeroflyMissionCheckpoint> & {
            altitude_feet?: number;
            length_feet?: number;
        },
    );
    /**
     * @param {number} altitude_feet
     */
    set altitude_feet(altitude_feet: number);
    /**
     * @returns {number} altitude_feet
     */
    get altitude_feet(): number;
    /**
     * @param {number} length_feet
     */
    set length_feet(length_feet: number);
    /**
     * @returns {number} length_feet
     */
    get length_feet(): number;
    /**
     * @returns {string}
     */
    get frequency_string(): string;
    /**
     * @param {number} index if used in an array will se the array index
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index?: number): string;
}
//# sourceMappingURL=AeroflyMissionCheckpoint.d.ts.map
