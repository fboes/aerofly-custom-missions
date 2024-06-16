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
export type AeroflyMissionSetting = "taxi" | "takeoff" | "cruise" | "approach" | "landing";
/**
 * Types of checkpoints. Required are usually "origin", "departure_runway" at the start and "destination_runway", "destination" at the end.
 */
export type AeroflyMissionCheckpointType = "origin" | "departure_runway" | "departure" | "waypoint" | "arrival" | "approach" | "destination_runway" | "destination";
/**
 * Data for the aircraft to use on this mission
 * @property name lowercase Aerofly aircraft ID
 * @property livery (not used yet)
 * @property icao ICAO aircraft code
 */
export type AeroflyMissionAircraft = {
    name: string;
    livery: string;
    icao: string;
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
 * A list of flight plans.
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export declare class AeroflyMissionsList {
    /**
     * Missions to add to mission list
     */
    missions: AeroflyMission[];
    /**
     * @param missions to add to mission list
     */
    constructor(missions?: AeroflyMission[]);
    /**
     * @returns String to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(): string;
}
/**
 * A single flighplan, containing aircraft and weather data as well.
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export declare class AeroflyMission {
    /**
     * Title of this flight plan
     */
    title: string;
    /**
     * Additional description text, mission briefing, etc
     */
    description: string;
    /**
     * Flight settings of aircraft, like "taxi", "cruise"
     */
    flightSetting: AeroflyMissionSetting;
    /**
     * Aircraft for this mission
     */
    aircraft: AeroflyMissionAircraft;
    /**
     * Uppercase callsign of aircraft
     */
    callsign: string;
    /**
     * Starting position of aircraft, as well as name of starting airport. Position does not have match airport.
     */
    origin: AeroflyMissionPosition;
    /**
     * Intended end position of aircraft, as well as name of destination airport. Position does not have match airport.
     */
    destination: AeroflyMissionPosition;
    /**
     * Time and weather for mission
     */
    conditions: AeroflyMissionConditions;
    /**
     * The actual flight plan
     */
    checkpoints: AeroflyMissionCheckpoint[];
    /**
     *
     * @param title of this flight plan
     * @param additionalAttributes allows to set additional attributes on creation
     */
    constructor(title: string, additionalAttributes?: {
        description?: string;
        flightSetting?: AeroflyMissionSetting;
        aircraft?: AeroflyMissionAircraft;
        callsign?: string;
        origin?: AeroflyMissionPosition;
        destination?: AeroflyMissionPosition;
        conditions?: AeroflyMissionConditions;
        checkpoints?: AeroflyMissionCheckpoint[];
    });
    /**
     * @returns indexed checkpoints
     */
    getCheckpointsString(): string;
    /**
     * @throws {Error} on missing waypoints
     * @returns String to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(): string;
}
/**
 * Time and weather data for the given flight plan
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export declare class AeroflyMissionConditions {
    /**
     * Start time of flight plan. Relevant is the UTC part, so
     *    consider setting this date in UTC.
     */
    time: Date;
    /**
     * Current wind state
     */
    wind: AeroflyMissionConditionsWind;
    /**
     * 0..1, percentage
     */
    turbulenceStrength: number;
    /**
     * 0..1, percentage
     */
    thermalStrength: number;
    /**
     * Visibility in meters
     */
    visibility: number;
    clouds: AeroflyMissionConditionsCloud[];
    /**
     * @param additionalAttributes allows to set additional attributes on creation
     */
    constructor(additionalAttributes?: {
        time?: Date;
        wind?: {
            direction?: number;
            speed?: number;
            gusts?: number;
        };
        turbulenceStrength?: number;
        thermalStrength?: number;
        visibility?: number;
        clouds?: AeroflyMissionConditionsCloud[];
    });
    /**
     * @returns the Aerofly value for UTC hours + minutes/60 + seconds/3600. Ignores milliseconds ;)
     */
    get time_hours(): number;
    /**
     * @returns Time representation like "20:15:00"
     */
    get time_presentational(): string;
    /**
     * @param visibility_sm `this.visibility` in statute miles instead of meters
     */
    set visibility_sm(visibility_sm: number);
    /**
     * @returns
     */
    getCloudsString(): string;
    /**
     * @returns String to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(): string;
}
/**
 * A cloud layer for the current flight plan's weather data
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export declare class AeroflyMissionConditionsCloud {
    /**
     * 0..1, percentage
     */
    cover: number;
    /**
     * in meters AGL
     */
    base: number;
    /**
     * @param cover 0..1, percentage
     * @param base in meters AGL
     */
    constructor(cover: number, base: number);
    /**
     * @param cover 0..1, percentage
     * @param base_feet base, but in feet AGL instead of meters AGL
     * @returns {AeroflyMissionConditionsCloud}
     */
    static createInFeet(cover: number, base_feet: number): AeroflyMissionConditionsCloud;
    /**
     * @param base_feet `this.base` in feet instead of meters
     */
    set base_feet(base_feet: number);
    /**
     * @returns Cloud coverage as text representation like "OVC" for `this.cover`
     */
    get cover_code(): AeroflyMissionConditionsCloudCoverCode;
    /**
     * @param index if used in an array will se the array index
     * @returns String to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index?: number): string;
}
/**
 * A single way point for the given flight plan
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export declare class AeroflyMissionCheckpoint {
    /**
     * Type of checkpoint, like "departure_runway"
     */
    type: AeroflyMissionCheckpointType;
    /**
     * Visible name of waypoint, like navaid ID or airport ID
     */
    name: string;
    /**
     * Easting, using the World Geodetic
     *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *    of decimal degrees; -180..180
     */
    longitude: number;
    /**
     * Northing, using the World Geodetic
     *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *    of decimal degrees; -90..90
     */
    latitude: number;
    /**
     * The height in meters above or below the WGS
     *    84 reference ellipsoid
     */
    altitude: number;
    /**
     * For runways: in degree
     */
    direction: number | null;
    /**
     * For runways
     */
    slope: number | null;
    /**
     * For runways: in meters
     */
    length: number | null;
    /**
     * For runways and navigational aids, in Hz; multiply by 1000 for kHz, 1_000_000 for MHz
     */
    frequency: number | null;
    /**
     * @param name ICAO code for airport, runway designator, navaid
     *    designator, fix name, or custom name
     * @param type Type of checkpoint, like "departure_runway"
     * @param longitude easting, using the World Geodetic
     *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *    of decimal degrees; -180..180
     * @param latitude northing, using the World Geodetic
     *    System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units
     *    of decimal degrees; -90..90
     * @param additionalAttributes allows to set additional attributes on creation
     */
    constructor(name: string, type: AeroflyMissionCheckpointType, longitude: number, latitude: number, additionalAttributes?: {
        altitude?: number;
        altitude_feet?: number;
        direction?: number;
        slope?: number;
        length?: number;
        frequency?: number;
    });
    /**
     * @param altitude_feet
     */
    set altitude_feet(altitude_feet: number);
    get frequency_string(): string;
    /**
     * @param index if used in an array will se the array index
     * @returns String to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index?: number): string;
}
declare const _default: {
    AeroflyMissionsList: typeof AeroflyMissionsList;
    AeroflyMission: typeof AeroflyMission;
    AeroflyMissionConditions: typeof AeroflyMissionConditions;
    AeroflyMissionConditionsCloud: typeof AeroflyMissionConditionsCloud;
    AeroflyMissionCheckpoint: typeof AeroflyMissionCheckpoint;
};
export default _default;
//# sourceMappingURL=index.d.ts.map