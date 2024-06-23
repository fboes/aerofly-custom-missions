const feetPerMeter = 3.28084;
const meterPerStatuteMile = 1609.344;

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
export class AeroflyMissionsList {
    /**
     * @property {AeroflyMission[]} missions in this mission list
     */
    missions: AeroflyMission[];

    /**
     * @param {AeroflyMission[]} missions in this mission list
     */
    constructor(missions: AeroflyMission[] = []) {
        this.missions = missions;
    }

    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(): string {
        const separator = "\n// -----------------------------------------------------------------------------\n";
        return `<[file][][]
    <[tmmissions_list][][]
        <[list_tmmission_definition][missions][]${separator + this.missions.join(separator) + separator}        >
    >
>`;
    }
}

/**
 * @class
 * A single flighplan, containing aircraft and weather data as well.
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export class AeroflyMission {
    /**
     * @property {string} title of this flight plan
     */
    title: string;

    /**
     * @property {string} description text, mission briefing, etc
     */
    description: string;

    /**
     * @property {"taxi"|"takeoff"|"cruise"|"approach"|"landing"} flightSetting of aircraft, like "taxi", "cruise"
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
     * @param {"taxi"|"takeoff"|"cruise"|"approach"|"landing"} [additionalAttributes.flightSetting] of aircraft, like "taxi", "cruise"
     * @param {{name:string,livery:string,icao:string}} [additionalAttributes.aircraft] for this mission
     * @param {string} [additionalAttributes.callsign] of aircraft, uppercased
     * @param {object} [additionalAttributes.origin] position of aircraft, as well as name of starting airport. Position does not have match airport.
     * @param {object} [additionalAttributes.destination] position of aircraft, as well as name of destination airport. Position does not have match airport.
     * @param {AeroflyMissionConditions} [additionalAttributes.conditions] like time and weather for mission
     * @param {AeroflyMissionCheckpoint[]} [additionalAttributes.checkpoints] form the actual flight plan
     */
    constructor(
        title: string,
        {
            description = "",
            flightSetting = "taxi",
            aircraft = {
                name: "c172",
                icao: "",
                livery: "",
            },
            callsign = "",
            origin = {
                icao: "",
                longitude: 0,
                latitude: 0,
                dir: 0,
                alt: 0,
            },
            destination = {
                icao: "",
                longitude: 0,
                latitude: 0,
                dir: 0,
                alt: 0,
            },
            conditions = new AeroflyMissionConditions(),
            checkpoints = [],
        }: {
            description?: string;
            flightSetting?: AeroflyMissionSetting;
            aircraft?: AeroflyMissionAircraft;
            callsign?: string;
            origin?: AeroflyMissionPosition;
            destination?: AeroflyMissionPosition;
            conditions?: AeroflyMissionConditions;
            checkpoints?: AeroflyMissionCheckpoint[];
        } = {},
    ) {
        this.title = title;
        this.checkpoints = checkpoints;
        this.description = description;
        this.flightSetting = flightSetting;
        this.aircraft = aircraft;
        this.callsign = callsign;
        this.origin = origin;
        this.destination = destination;
        this.conditions = conditions;
    }

    /**
     * @returns {string} indexed checkpoints
     */
    getCheckpointsString(): string {
        return this.checkpoints
            .map((c: AeroflyMissionCheckpoint, index: number): string => {
                return c.toString(index);
            })
            .join("\n");
    }

    /**
     * @throws {Error} on missing waypoints
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(): string {
        if (this.checkpoints.length < 2) {
            throw Error("this.checkpoints.length < 2");
        }

        if (!this.origin.icao) {
            const firstCheckpoint = this.checkpoints[0];
            this.origin = {
                icao: firstCheckpoint.name,
                longitude: firstCheckpoint.longitude,
                latitude: firstCheckpoint.latitude,
                dir: this.origin.dir,
                alt: firstCheckpoint.altitude,
            };
        }

        if (!this.destination.icao) {
            const lastCheckpoint = this.checkpoints[this.checkpoints.length - 1];
            this.destination = {
                icao: lastCheckpoint.name,
                longitude: lastCheckpoint.longitude,
                latitude: lastCheckpoint.latitude,
                dir: lastCheckpoint.direction ?? 0,
                alt: lastCheckpoint.altitude,
            };
        }

        return `            <[tmmission_definition][mission][]
                <[string8][title][${this.title}]>
                <[string8][description][${this.description}]>
                <[string8]   [flight_setting]     [${this.flightSetting}]>
                <[string8u]  [aircraft_name]      [${this.aircraft.name}]>
                //<[string8u][aircraft_livery]    [${this.aircraft.livery}]>
                <[stringt8c] [aircraft_icao]      [${this.aircraft.icao}]>
                <[stringt8c] [callsign]           [${this.callsign}]>
                <[stringt8c] [origin_icao]        [${this.origin.icao}]>
                <[tmvector2d][origin_lon_lat]     [${this.origin.longitude} ${this.origin.latitude}]>
                <[float64]   [origin_dir]         [${this.origin.dir}]>
                <[float64]   [origin_alt]         [${this.origin.alt}]> // ${this.origin.alt * feetPerMeter} ft MSL
                <[stringt8c] [destination_icao]   [${this.destination.icao}]>
                <[tmvector2d][destination_lon_lat][${this.destination.longitude} ${this.destination.latitude}]>
                <[float64]   [destination_dir]    [${this.destination.dir}]>
${this.conditions}
                <[list_tmmission_checkpoint][checkpoints][]
${this.getCheckpointsString()}
                >
            >`;
    }
}

/**
 * @class
 * Time and weather data for the given flight plan
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export class AeroflyMissionConditions {
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
    clouds: AeroflyMissionConditionsCloud[] = [];

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
        time = new Date(),
        wind = {
            direction: 0,
            speed: 0,
            gusts: 0,
        },
        turbulenceStrength = 0,
        thermalStrength = 0,
        visibility = 25_000,
        visibility_sm = null,
        temperature = null,
        clouds = [],
    }: {
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
    } = {}) {
        this.time = time;
        this.wind = wind;
        this.turbulenceStrength = turbulenceStrength;
        this.thermalStrength = thermalStrength;
        this.visibility = visibility;
        this.clouds = clouds;

        if (visibility_sm) {
            this.visibility_sm = visibility_sm;
        }
        if (temperature) {
            this.temperature = temperature;
        }
    }

    /**
     * @returns {number} the Aerofly value for UTC hours + minutes/60 + seconds/3600. Ignores milliseconds ;)
     */
    get time_hours(): number {
        return this.time.getUTCHours() + this.time.getUTCMinutes() / 60 + this.time.getUTCSeconds() / 3600;
    }

    /**
     * @returns {string} Time representation like "20:15:00"
     */
    get time_presentational(): string {
        return [this.time.getUTCHours(), this.time.getUTCMinutes(), this.time.getUTCSeconds()]
            .map((t) => {
                return String(t).padStart(2, "0");
            })
            .join(":");
    }

    /**
     * @param {number} visibility_sm `this.visibility` in statute miles instead of meters
     */
    set visibility_sm(visibility_sm: number) {
        this.visibility = visibility_sm * meterPerStatuteMile;
    }

    /**
     * @returns {number} `this.visibility` in statute miles instead of meters
     */
    get visibility_sm(): number {
        return this.visibility / meterPerStatuteMile;
    }

    /**
     * Will set `this.thermalStrength`
     * @param {number} temperature in °C
     */
    set temperature(temperature: number) {
        // Range from -15°C to 35°C
        this.thermalStrength = Math.max(0, (temperature + 15) / 50) ** 2;
    }

    /**
     * @returns {number} in °C
     */
    get temperature(): number {
        return Math.sqrt(this.thermalStrength) * 50 - 15;
    }

    /**
     * @returns {string}
     */
    getCloudsString(): string {
        return this.clouds
            .map((c: AeroflyMissionConditionsCloud, index: number): string => {
                return c.toString(index);
            })
            .join("\n");
    }

    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(): string {
        if (this.clouds.length < 1) {
            this.clouds = [new AeroflyMissionConditionsCloud(0, 0)];
        }

        return `                <[tmmission_conditions][conditions][]
                    <[tm_time_utc][time][]
                        <[int32][time_year][${this.time.getUTCFullYear()}]>
                        <[int32][time_month][${this.time.getUTCMonth() + 1}]>
                        <[int32][time_day][${this.time.getUTCDate()}]>
                        <[float64][time_hours][${this.time_hours}]> // ${this.time_presentational} UTC
                    >
                    <[float64][wind_direction][${this.wind.direction}]>
                    <[float64][wind_speed][${this.wind.speed}]> // kts
                    <[float64][wind_gusts][${this.wind.gusts}]> // kts
                    <[float64][turbulence_strength][${this.turbulenceStrength}]>
                    <[float64][thermal_strength][${this.thermalStrength}]> // ${this.temperature} °C
                    <[float64][visibility][${this.visibility}]> // ${this.visibility_sm} SM
${this.getCloudsString()}
                >`;
    }
}

/**
 * @class
 * A cloud layer for the current flight plan's weather data
 *
 * The purpose of this class is to collect data needed for Aerofly FS4's
 * `custom_missions_user.tmc` flight plan file format, and export the structure
 * for this file via the `toString()` method.
 */
export class AeroflyMissionConditionsCloud {
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
    constructor(cover: number, base: number) {
        this.cover = cover;
        this.base = base;
    }

    /**
     * @param {number} cover 0..1, percentage
     * @param {number} base_feet altitude, but in feet AGL instead of meters AGL
     * @returns {AeroflyMissionConditionsCloud}
     */
    static createInFeet(cover: number, base_feet: number): AeroflyMissionConditionsCloud {
        return new AeroflyMissionConditionsCloud(cover, base_feet / feetPerMeter);
    }

    /**
     * @param {number} base_feet `this.base` in feet instead of meters
     */
    set base_feet(base_feet: number) {
        this.base = base_feet / feetPerMeter;
    }

    /**
     * @returns {number} `this.base` in feet instead of meters
     */
    get base_feet(): number {
        return this.base * feetPerMeter;
    }

    /**
     * @returns {string} Cloud coverage as text representation like "OVC" for `this.cover`
     */
    get cover_code(): AeroflyMissionConditionsCloudCoverCode {
        if (this.cover < 1 / 8) {
            return "CLR";
        } else if (this.cover <= 2 / 8) {
            return "FEW";
        } else if (this.cover <= 4 / 8) {
            return "SCT";
        } else if (this.cover <= 7 / 8) {
            return "BKN";
        }
        return "OVC";
    }

    /**
     * @param {number} index if used in an array will se the array index
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index: number = 0): string {
        const indexString = index === 0 ? "" : String(index + 1);
        const comment = index === 0 ? "" : "//";

        return `                    ${comment}<[float64][cloud_cover${indexString}][${this.cover ?? 0}]> // ${this.cover_code}
                    ${comment}<[float64][cloud_base${indexString}][${this.base}]> // ${this.base_feet} ft AGL`;
    }
}

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
     */
    constructor(
        name: string,
        type: AeroflyMissionCheckpointType,
        longitude: number,
        latitude: number,
        {
            altitude = 0,
            altitude_feet = null,
            direction = null,
            slope = null,
            length = null,
            length_feet = null,
            frequency = null,
        }: {
            altitude?: number;
            altitude_feet?: number | null;
            direction?: number | null;
            slope?: number | null;
            length?: number | null;
            length_feet?: number | null;
            frequency?: number | null;
        } = {},
    ) {
        this.type = type;
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
        this.altitude = altitude;
        this.direction = direction;
        this.slope = slope;
        this.length = length;
        this.frequency = frequency;

        if (altitude_feet) {
            this.altitude_feet = altitude_feet;
        }
        if (length_feet) {
            this.length_feet = length_feet;
        }
    }

    /**
     * @param {number} altitude_feet
     */
    set altitude_feet(altitude_feet: number) {
        this.altitude = altitude_feet / feetPerMeter;
    }

    /**
     * @returns {number} altitude_feet
     */
    get altitude_feet(): number {
        return this.altitude * feetPerMeter;
    }

    /**
     * @param {number} length_feet
     */
    set length_feet(length_feet: number) {
        this.length = length_feet / feetPerMeter;
    }

    /**
     * @returns {number} length_feet
     */
    get length_feet(): number {
        return (this.length ?? 0) * feetPerMeter;
    }

    /**
     * @returns {string}
     */
    get frequency_string(): string {
        if (!this.frequency) {
            return "None";
        }
        if (this.frequency > 1_000_000) {
            return String(this.frequency / 1_000_000) + " MHz";
        }
        if (this.frequency > 1_000) {
            return String(this.frequency / 1_000) + " kHz";
        }

        return String(this.frequency) + " Hz";
    }

    /**
     * @param {number} index if used in an array will se the array index
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index: number = 0): string {
        return `                    <[tmmission_checkpoint][element][${index}]
                        <[string8u][type][${this.type}]>
                        <[string8u][name][${this.name}]>
                        <[vector2_float64][lon_lat][${this.longitude} ${this.latitude}]>
                        <[float64][altitude][${this.altitude}]> // ${this.altitude_feet} ft
                        <[float64][direction][${this.direction ?? (index === 0 ? -1 : 0)}]>
                        <[float64][slope][${this.slope ?? 0}]>
                        <[float64][length][${this.length ?? 0}]> // ${this.length_feet} ft
                        <[float64][frequency][${this.frequency ?? 0}]> // ${this.frequency_string}
                    >`;
    }
}

export default {
    AeroflyMissionsList,
    AeroflyMission,
    AeroflyMissionConditions,
    AeroflyMissionConditionsCloud,
    AeroflyMissionCheckpoint,
};
