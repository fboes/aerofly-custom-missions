import { AeroflyLocalizedText } from "./AeroflyLocalizedText.js";
import { AeroflyMissionCheckpoint } from "./AeroflyMissionCheckpoint.js";
import { AeroflyMissionConditions } from "./AeroflyMissionConditions.js";
import { AeroflyMissionTargetPlane } from "./AeroflyMissionTargetPlane.js";
export declare const feetPerMeter = 3.28084;
export declare const meterPerStatuteMile = 1609.344;
/**
 * Data for the aircraft to use on this mission
 * @property name lowercase Aerofly aircraft ID
 * @property icao ICAO aircraft code
 * @property livery (not used yet)
 */
export type AeroflyMissionAircraft = {
    name: string;
    icao: string;
    livery: string;
};
/**
 * State of aircraft systems. Configures power settings, flap positions etc
 */
export type AeroflyMissionSetting =
    | "cold_and_dark"
    | "before_start"
    | "taxi"
    | "takeoff"
    | "cruise"
    | "approach"
    | "landing"
    | "winch_launch"
    | "aerotow"
    | "pushback";
/**
 * Represents origin or destination conditions for flight
 * @property icao uppercase ICAO airport ID
 * @property longitude easting, using the World Geodetic
 *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
 *    of decimal degrees; -180..180
 * @property latitude northing, using the World Geodetic
 *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
 *    of decimal degrees; -90..90
 * @property dir in degree
 * @property alt the height in meters above or below the WGS
 *    84 reference ellipsoid
 */
export type AeroflyMissionPosition = {
    icao: string;
    longitude: number;
    latitude: number;
    dir: number;
    alt: number;
};
/**
 * @class
 * A single flighplan, containing aircraft and weather data as well.
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export declare class AeroflyMission {
    /**
     * @property {?string} tutorialName will create a link to a tutorial page at https://www.aerofly.com/aircraft-tutorials/
     */
    tutorialName: string | null;
    /**
     * @property {string} title of this flight plan
     */
    title: string;
    /**
     * @property {string} description text, mission briefing, etc
     */
    description: string;
    /**
     * @property {AeroflyLocalizedText[]} localizedTexts for title and description
     */
    localizedTexts: AeroflyLocalizedText[];
    /**
     * @property {string[]} tags
     */
    tags: string[];
    /**
     * @property {?boolean} isFeatured makes this mission pop up in "Challenges"
     */
    isFeatured: boolean | null;
    /**
     * @property {?number} difficulty values between 0.00 and 2.00 have been encountered, but they seem to be without limit
     */
    difficulty: number | null;
    /**
     * @property {"cold_and_dark"|"before_start"|"taxi"|"takeoff"|"cruise"|"approach"|"landing"|"winch_launch"|"aerotow"|"pushback"} flightSetting of aircraft, like "taxi", "cruise"
     */
    flightSetting: AeroflyMissionSetting;
    /**
     * @property {object} aircraft for this mission
     */
    aircraft: AeroflyMissionAircraft;
    /**
     * @property {string} callsign of aircraft, uppercased
     */
    callsign: string;
    /**
     * @property {object} origin position of aircraft, as well as name of starting airport. Position does not have match airport.
     */
    origin: AeroflyMissionPosition;
    /**
     * @property {object} destination position of aircraft, as well as name of destination airport. Position does not have match airport.
     */
    destination: AeroflyMissionPosition;
    /**
     * @property {?number} distance in meters
     */
    distance: number | null;
    /**
     * @property {?number} duration in seconds
     */
    duration: number | null;
    /**
     * @property {?boolean} isScheduled marks this flight as "Scheduled flight".
     */
    isScheduled: boolean | null;
    /**
     * @property {?AeroflyMissionTargetPlane} finish as finish condition
     */
    finish: AeroflyMissionTargetPlane | null;
    /**
     * @property {AeroflyMissionConditions} conditions like time and weather for mission
     */
    conditions: AeroflyMissionConditions;
    /**
     * @property {AeroflyMissionConditions} checkpoints form the actual flight plan
     */
    checkpoints: AeroflyMissionCheckpoint[];
    /**
     * @param {string} title of this flight plan
     * @param {object} [additionalAttributes] allows to set additional attributes on creation
     * @param {string} [additionalAttributes.description] text, mission briefing, etc
     * @param {AeroflyLocalizedText[]} [additionalAttributes.localizedTexts] translations for title and description
     * @param {?string} [additionalAttributes.tutorialName] will create a link to a tutorial page at https://www.aerofly.com/aircraft-tutorials/
     * @param {string[]} [additionalAttributes.tags]
     * @param {?boolean} [additionalAttributes.isFeatured] makes this mission pop up in "Challenges"
     * @param {?number} [additionalAttributes.difficulty] values between 0.00 and 2.00 have been encountered, but they seem to be without limit
     * @param {"cold_and_dark"|"before_start"|"taxi"|"takeoff"|"cruise"|"approach"|"landing"|"winch_launch"|"aerotow"|"pushback"} [additionalAttributes.flightSetting] of aircraft, like "taxi", "cruise"
     * @param {{name:string,livery:string,icao:string}} [additionalAttributes.aircraft] for this mission
     * @param {string} [additionalAttributes.callsign] of aircraft, uppercased
     * @param {object} [additionalAttributes.origin] position of aircraft, as well as name of starting airport. Position does not have match airport.
     * @param {object} [additionalAttributes.destination] position of aircraft, as well as name of destination airport. Position does not have match airport.
     * @param {?number} [additionalAttributes.distance] in meters
     * @param {?number} [additionalAttributes.duration] in seconds
     * @param {?boolean} [additionalAttributes.isScheduled] marks this flight as "Scheduled flight".
     * @param {?AeroflyMissionTargetPlane} [additionalAttributes.finish] as finish condition
     * @param {AeroflyMissionConditions} [additionalAttributes.conditions] like time and weather for mission
     * @param {AeroflyMissionCheckpoint[]} [additionalAttributes.checkpoints] form the actual flight plan
     */
    constructor(
        title: string,
        {
            tutorialName,
            description,
            localizedTexts,
            tags,
            isFeatured,
            difficulty,
            flightSetting,
            aircraft,
            callsign,
            origin,
            destination,
            distance,
            duration,
            isScheduled,
            finish,
            conditions,
            checkpoints,
        }?: {
            tutorialName?: string | null;
            description?: string;
            localizedTexts?: AeroflyLocalizedText[];
            tags?: string[];
            isFeatured?: boolean | null;
            difficulty?: number | null;
            flightSetting?: AeroflyMissionSetting;
            aircraft?: AeroflyMissionAircraft;
            callsign?: string;
            origin?: AeroflyMissionPosition;
            destination?: AeroflyMissionPosition;
            distance?: number | null;
            duration?: number | null;
            isScheduled?: boolean | null;
            finish?: AeroflyMissionTargetPlane | null;
            conditions?: AeroflyMissionConditions;
            checkpoints?: AeroflyMissionCheckpoint[];
        },
    );
    /**
     * @returns {string} indexed checkpoints
     */
    getCheckpointsString(): string;
    /**
     * @returns {string} indexed checkpoints
     */
    getLocalizedTextsString(): string;
    /**
     * @throws {Error} on missing waypoints
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(): string;
}
//# sourceMappingURL=AeroflyMission.d.ts.map
