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
 * State of aircraft systems. Configures power settings, flap positions etc
 */
export type AeroflyMissionSetting = "taxi" | "takeoff" | "cruise" | "approach" | "landing" | "winch_launch" | "aerotow";
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
 * Weather data for wind
 * @property direction in degree
 * @property speed in kts
 * @property gusts in kts
 */
export type AeroflyMissionConditionsWind = {
    direction: number;
    speed: number;
    gusts: number;
};
/**
 * Cloud coverage codes
 */
export type AeroflyMissionConditionsCloudCoverCode = "CLR" | "FEW" | "SCT" | "BKN" | "OVC";
/**
 * @class
 * A list of flight plans.
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export declare class AeroflyMissionsList {
    /**
     * @property {AeroflyMission[]} missions in this mission list
     */
    missions: AeroflyMission[];
    /**
     * @param {AeroflyMission[]} missions in this mission list
     */
    constructor(missions?: AeroflyMission[]);
    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(): string;
}
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
     * @property {boolean} isFeatured makes this mission pop up in "Challenges"
     */
    isFeatured: boolean;
    /**
     * @property {number|undefined} difficulty values between 0.00 and 2.00 have been encountered, but they seem to be without limit
     */
    difficulty: number | undefined;
    /**
     * @property {"taxi"|"takeoff"|"cruise"|"approach"|"landing"|"winch_launch"|"aerotow"} flightSetting of aircraft, like "taxi", "cruise"
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
     * @property {number} in meters
     */
    distance: number;
    /**
     * @property {number} in seconds
     */
    duration: number;
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
     * @param {string[]} [additionalAttributes.tags]
     * @param {boolean} [additionalAttributes.isFeatured] makes this mission pop up in "Challenges"
     * @param {number|undefined} [additionalAttributes.difficulty] values between 0.00 and 2.00 have been encountered, but they seem to be without limit
     * @param {"taxi"|"takeoff"|"cruise"|"approach"|"landing"|"winch_launch"|"aerotow"} [additionalAttributes.flightSetting] of aircraft, like "taxi", "cruise"
     * @param {{name:string,livery:string,icao:string}} [additionalAttributes.aircraft] for this mission
     * @param {string} [additionalAttributes.callsign] of aircraft, uppercased
     * @param {object} [additionalAttributes.origin] position of aircraft, as well as name of starting airport. Position does not have match airport.
     * @param {object} [additionalAttributes.destination] position of aircraft, as well as name of destination airport. Position does not have match airport.
     * @param {number} [additionalAttributes.distance] in meters
     * @param {number} [additionalAttributes.duration] in seconds
     * @param {?AeroflyMissionTargetPlane} [additionalAttributes.finish] as finish condition
     * @param {AeroflyMissionConditions} [additionalAttributes.conditions] like time and weather for mission
     * @param {AeroflyMissionCheckpoint[]} [additionalAttributes.checkpoints] form the actual flight plan
     */
    constructor(
        title: string,
        {
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
            finish,
            conditions,
            checkpoints,
        }?: {
            description?: string;
            localizedTexts?: AeroflyLocalizedText[];
            tags?: string[];
            isFeatured?: boolean;
            difficulty?: number | undefined;
            flightSetting?: AeroflyMissionSetting;
            aircraft?: AeroflyMissionAircraft;
            callsign?: string;
            origin?: AeroflyMissionPosition;
            destination?: AeroflyMissionPosition;
            distance?: number;
            duration?: number;
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
/**
 * @class
 * Time and weather data for the given flight plan
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export declare class AeroflyMissionConditions {
    /**
     * @property {Date} time of flight plan. Relevant is the UTC part, so
     *    consider setting this date in UTC.
     */
    time: Date;
    /**
     * @property {object} wind state
     */
    wind: AeroflyMissionConditionsWind;
    /**
     * @property {number} 0..1, percentage
     */
    turbulenceStrength: number;
    /**
     * @property {number} 0..1, percentage
     */
    thermalStrength: number;
    /**
     * @property {number} visibility in meters
     */
    visibility: number;
    /**
     * @property {AeroflyMissionConditionsCloud[]} clouds for the whole flight
     */
    clouds: AeroflyMissionConditionsCloud[];
    /**
     * @param {object} additionalAttributes allows to set additional attributes on creation
     * @param {Date} [additionalAttributes.time]  of flight plan. Relevant is the UTC part, so
     *    consider setting this date in UTC.
     * @param {{direction: number, speed: number, gusts: number}} [additionalAttributes.wind] state
     * @param {number} [additionalAttributes.turbulenceStrength] 0..1, percentage
     * @param {number} [additionalAttributes.thermalStrength] 0..1, percentage
     * @param {number} [additionalAttributes.visibility] in meters
     * @param {number?} [additionalAttributes.visibility_sm] in statute miles, will overwrite visibility
     * @param {number?} [additionalAttributes.temperature] in °C, will overwrite thermalStrength
     * @param {AeroflyMissionConditionsCloud[]} [additionalAttributes.clouds] for the whole flight
     */
    constructor({
        time,
        wind,
        turbulenceStrength,
        thermalStrength,
        visibility,
        visibility_sm,
        temperature,
        clouds,
    }?: {
        time?: Date;
        wind?: {
            direction: number;
            speed: number;
            gusts: number;
        };
        turbulenceStrength?: number;
        thermalStrength?: number;
        visibility?: number;
        visibility_sm?: number | null;
        temperature?: number | null;
        clouds?: AeroflyMissionConditionsCloud[];
    });
    /**
     * @returns {number} the Aerofly value for UTC hours + minutes/60 + seconds/3600. Ignores milliseconds ;)
     */
    get time_hours(): number;
    /**
     * @returns {string} Time representation like "20:15:00"
     */
    get time_presentational(): string;
    /**
     * @param {number} visibility_sm `this.visibility` in statute miles instead of meters
     */
    set visibility_sm(visibility_sm: number);
    /**
     * @returns {number} `this.visibility` in statute miles instead of meters
     */
    get visibility_sm(): number;
    /**
     * Will set `this.thermalStrength`
     * @param {number} temperature in °C
     */
    set temperature(temperature: number);
    /**
     * @returns {number} in °C
     */
    get temperature(): number;
    /**
     * @returns {string}
     */
    getCloudsString(): string;
    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(): string;
}
/**
 * @class
 * A cloud layer for the current flight plan's weather data
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export declare class AeroflyMissionConditionsCloud {
    /**
     * @property {number} cover 0..1, percentage
     */
    cover: number;
    /**
     * @property {number} base altitude in meters AGL
     */
    base: number;
    /**
     * @param {number} cover 0..1, percentage
     * @param {number} base altitude in meters AGL
     */
    constructor(cover: number, base: number);
    /**
     * @param {number} cover 0..1, percentage
     * @param {number} base_feet altitude, but in feet AGL instead of meters AGL
     * @returns {AeroflyMissionConditionsCloud}
     */
    static createInFeet(cover: number, base_feet: number): AeroflyMissionConditionsCloud;
    /**
     * @param {number} base_feet `this.base` in feet instead of meters
     */
    set base_feet(base_feet: number);
    /**
     * @returns {number} `this.base` in feet instead of meters
     */
    get base_feet(): number;
    /**
     * @returns {string} Cloud coverage as text representation like "OVC" for `this.cover`
     */
    get cover_code(): AeroflyMissionConditionsCloudCoverCode;
    /**
     * @param {number} index if used in an array will se the array index
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index?: number): string;
}
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
     * @property {boolean|undefined} flyOver if waypoint is meant to be flown over
     */
    flyOver: boolean | undefined;
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
     * @param {number?} [additionalAttributes.altitude_feet] The height in feet above or below the WGS
     *    84 reference ellipsoid. Will overwrite altitude
     * @param {number} [additionalAttributes.direction] of runway, in degree
     * @param {number?} [additionalAttributes.slope] of runway
     * @param {number?} [additionalAttributes.length] of runway, in meters
     * @param {number?} [additionalAttributes.length_feet] of runway, in feet. Will overwrite length
     * @param {number?} [additionalAttributes.frequency] of runways or navigational aids, in Hz; multiply by 1000 for kHz, 1_000_000 for MHz
     * @param {boolean|undefined} [additionalAttributes.flyOver] if waypoint is meant to be flown over
     */
    constructor(
        name: string,
        type: AeroflyMissionCheckpointType,
        longitude: number,
        latitude: number,
        {
            altitude,
            altitude_feet,
            direction,
            slope,
            length,
            length_feet,
            frequency,
            flyOver,
        }?: {
            altitude?: number;
            altitude_feet?: number | null;
            direction?: number | null;
            slope?: number | null;
            length?: number | null;
            length_feet?: number | null;
            frequency?: number | null;
            flyOver?: boolean | undefined;
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
export declare class AeroflyLocalizedText {
    /**
     * @property {string} language ISO 639-1 like
     * - br
     * - cn
     * - de
     * - es
     * - fr
     * - id
     * - it
     * - jp
     * - kr
     * - pl
     * - sv
     * - tr
     */
    language: string;
    /**
     * @property {string} title of this flight plan
     */
    title: string;
    /**
     * @property {string} description text, mission briefing, etc
     */
    description: string;
    /**
     * @param {string} language ISO 639-1 like
     * - br
     * - cn
     * - de
     * - es
     * - fr
     * - id
     * - it
     * - jp
     * - kr
     * - pl
     * - sv
     * - tr
     * @param {string} title of this flight plan
     * @param {string} description text, mission briefing, etc
     */
    constructor(language: string, title: string, description: string);
    /**
     * @param {number} index if used in an array will se the array index
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index?: number): string;
}
export declare class AeroflyMissionTargetPlane {
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
     * @property {number} dir in degree
     */
    dir: number;
    /**
     * @property {string} name of property
     */
    name: string;
    /**
     *
     * @param {number} longitude easting, using the World Geodetic
     *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *    of decimal degrees; -180..180
     * @param {number}latitude northing, using the World Geodetic
     *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *    of decimal degrees; -90..90
     * @param {number} dir in degree
     * @param {string} name of property
     */
    constructor(longitude: number, latitude: number, dir: number, name?: string);
    toString(): string;
}
declare const _default: {
    AeroflyMissionsList: typeof AeroflyMissionsList;
    AeroflyMission: typeof AeroflyMission;
    AeroflyMissionConditions: typeof AeroflyMissionConditions;
    AeroflyMissionConditionsCloud: typeof AeroflyMissionConditionsCloud;
    AeroflyMissionCheckpoint: typeof AeroflyMissionCheckpoint;
    AeroflyLocalizedText: typeof AeroflyLocalizedText;
    AeroflyMissionTargetPlane: typeof AeroflyMissionTargetPlane;
};
export default _default;
//# sourceMappingURL=index.d.ts.map
