var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AeroflyConfigFileSet_indent;
const feetPerMeter = 3.28084;
const meterPerStatuteMile = 1609.344;
export class AeroflyConfigFileSet {
    constructor(indent, type, name, value = "") {
        _AeroflyConfigFileSet_indent.set(this, void 0);
        __classPrivateFieldSet(this, _AeroflyConfigFileSet_indent, indent, "f");
        this.elements = [`${this.indent}<[${type}][${name}][${value}]`];
    }
    get indent() {
        return "    ".repeat(__classPrivateFieldGet(this, _AeroflyConfigFileSet_indent, "f"));
    }
    push(type, name, value, comment = "") {
        if (value instanceof Array) {
            value = value.join(" ");
        }
        else if (typeof value === "boolean") {
            value = value ? "true" : "false";
        }
        let tag = `${this.indent}    <[${type}][${name}][${value}]>`;
        if (comment) {
            tag += ` // ${comment}`;
        }
        return this.pushRaw(tag);
    }
    pushRaw(s) {
        this.elements.push(s);
        return this;
    }
    toString() {
        return this.elements.join("\n") + "\n" + `${this.indent}>`;
    }
}
_AeroflyConfigFileSet_indent = new WeakMap();
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
     * @param {AeroflyMission[]} missions in this mission list
     */
    constructor(missions = []) {
        this.missions = missions;
    }
    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString() {
        const separator = "\n// -----------------------------------------------------------------------------\n";
        return `\
<[file][][]
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
    constructor(title, { tutorialName = null, description = "", localizedTexts = [], tags = [], isFeatured = null, difficulty = null, flightSetting = "taxi", aircraft = {
        name: "c172",
        icao: "",
        livery: "",
    }, callsign = "", origin = {
        icao: "",
        longitude: 0,
        latitude: 0,
        dir: 0,
        alt: 0,
    }, destination = {
        icao: "",
        longitude: 0,
        latitude: 0,
        dir: 0,
        alt: 0,
    }, distance = null, duration = null, isScheduled = null, finish = null, conditions = new AeroflyMissionConditions(), checkpoints = [], } = {}) {
        this.tutorialName = tutorialName;
        this.title = title;
        this.checkpoints = checkpoints;
        this.description = description;
        this.localizedTexts = localizedTexts;
        this.tags = tags;
        this.isFeatured = isFeatured;
        this.difficulty = difficulty;
        this.flightSetting = flightSetting;
        this.aircraft = aircraft;
        this.callsign = callsign;
        this.origin = origin;
        this.destination = destination;
        this.distance = distance;
        this.duration = duration;
        this.isScheduled = isScheduled;
        this.finish = finish;
        this.conditions = conditions;
    }
    /**
     * @returns {string} indexed checkpoints
     */
    getCheckpointsString() {
        return this.checkpoints
            .map((c, index) => {
            return c.toString(index);
        })
            .join("\n");
    }
    /**
     * @returns {string} indexed checkpoints
     */
    getLocalizedTextsString() {
        return this.localizedTexts
            .map((c, index) => {
            return c.toString(index);
        })
            .join("\n");
    }
    /**
     * @throws {Error} on missing waypoints
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString() {
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
        const fileSet = new AeroflyConfigFileSet(3, "tmmission_definition", "mission");
        fileSet.push("string8", "title", this.title);
        fileSet.push("string8", "description", this.description);
        if (this.tutorialName !== null) {
            fileSet.push("string8", "tutorial_name", this.tutorialName, `Opens https://www.aerofly.com/aircraft-tutorials/${this.tutorialName}`);
        }
        if (this.localizedTexts.length > 0) {
            fileSet.pushRaw(new AeroflyConfigFileSet(4, "list_tmmission_definition_localized", "localized_text")
                .pushRaw(this.getLocalizedTextsString())
                .toString());
        }
        if (this.tags.length > 0) {
            fileSet.push("string8u", "tags", this.tags.join(" "));
        }
        if (this.difficulty !== null) {
            fileSet.push("float64", "difficulty", this.difficulty);
        }
        if (this.isFeatured !== null) {
            fileSet.push("bool", "is_featured", this.isFeatured);
        }
        fileSet.push("string8", "flight_setting", this.flightSetting);
        fileSet.push("string8u", "aircraft_name", this.aircraft.name);
        /*if (this.aircraft.livery) {
            fileSet.push("string8", "aircraft_livery", this.aircraft.livery);
        }*/
        fileSet.push("stringt8c", "aircraft_icao", this.aircraft.icao);
        fileSet.push("stringt8c", "callsign", this.callsign);
        fileSet.push("stringt8c", "origin_icao", this.origin.icao);
        fileSet.push("tmvector2d", "origin_lon_lat", [this.origin.longitude, this.origin.latitude]);
        fileSet.push("float64", "origin_alt", this.origin.alt, `${Math.ceil(this.origin.alt * feetPerMeter)} ft MSL`);
        fileSet.push("float64", "origin_dir", this.origin.dir);
        fileSet.push("stringt8c", "destination_icao", this.destination.icao);
        fileSet.push("tmvector2d", "destination_lon_lat", [this.destination.longitude, this.destination.latitude]);
        fileSet.push("float64", "destination_alt", this.destination.alt, `${Math.ceil(this.destination.alt * feetPerMeter)} ft MSL`);
        fileSet.push("float64", "destination_dir", this.destination.dir);
        if (this.distance !== null) {
            fileSet.push("float64", "distance", this.distance, `${Math.round(this.distance / 1000)} km`);
        }
        if (this.duration !== null) {
            fileSet.push("float64", "duration", this.duration, `${Math.round(this.duration / 60)} min`);
        }
        if (this.isScheduled !== null) {
            fileSet.push("bool", "is_scheduled", this.isScheduled ? "true" : "false");
        }
        if (this.finish !== null) {
            fileSet.pushRaw(this.finish.toString());
        }
        fileSet.pushRaw(this.conditions.toString());
        if (this.checkpoints.length > 0) {
            fileSet.pushRaw(new AeroflyConfigFileSet(4, "list_tmmission_checkpoint", "checkpoints")
                .pushRaw(this.getCheckpointsString())
                .toString());
        }
        return fileSet.toString();
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
     * @param {object} additionalAttributes allows to set additional attributes on creation
     * @param {Date} [additionalAttributes.time]  of flight plan. Relevant is the UTC part, so
     *    consider setting this date in UTC.
     * @param {{direction: number, speed: number, gusts: number}} [additionalAttributes.wind] state
     * @param {number} [additionalAttributes.turbulenceStrength] 0..1, percentage
     * @param {number} [additionalAttributes.thermalStrength] 0..1, percentage
     * @param {number} [additionalAttributes.visibility] in meters
     * @param {?number} [additionalAttributes.visibility_sm] in statute miles, will overwrite visibility
     * @param {?number} [additionalAttributes.temperature] in °C, will overwrite thermalStrength
     * @param {AeroflyMissionConditionsCloud[]} [additionalAttributes.clouds] for the whole flight
     */
    constructor({ time = new Date(), wind = {
        direction: 0,
        speed: 0,
        gusts: 0,
    }, turbulenceStrength = 0, thermalStrength = 0, visibility = 25000, visibility_sm = null, temperature = null, clouds = [], } = {}) {
        /**
         * @property {AeroflyMissionConditionsCloud[]} clouds for the whole flight
         */
        this.clouds = [];
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
    get time_hours() {
        return this.time.getUTCHours() + this.time.getUTCMinutes() / 60 + this.time.getUTCSeconds() / 3600;
    }
    /**
     * @returns {string} Time representation like "20:15:00"
     */
    get time_presentational() {
        return [this.time.getUTCHours(), this.time.getUTCMinutes(), this.time.getUTCSeconds()]
            .map((t) => {
            return String(t).padStart(2, "0");
        })
            .join(":");
    }
    /**
     * @param {number} visibility_sm `this.visibility` in statute miles instead of meters
     */
    set visibility_sm(visibility_sm) {
        this.visibility = visibility_sm * meterPerStatuteMile;
    }
    /**
     * @returns {number} `this.visibility` in statute miles instead of meters
     */
    get visibility_sm() {
        return this.visibility / meterPerStatuteMile;
    }
    /**
     * Will set `this.thermalStrength`
     * @param {number} temperature in °C
     */
    set temperature(temperature) {
        // Range from -15°C to 35°C
        this.thermalStrength = Math.max(0, (temperature + 15) / 50) ** 2;
    }
    /**
     * @returns {number} in °C
     */
    get temperature() {
        return Math.sqrt(this.thermalStrength) * 50 - 15;
    }
    /**
     * @returns {string}
     */
    getCloudsString() {
        return this.clouds
            .map((c, index) => {
            return c.toString(index);
        })
            .join("\n");
    }
    /**
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString() {
        if (this.clouds.length < 1) {
            this.clouds = [new AeroflyMissionConditionsCloud(0, 0)];
        }
        return new AeroflyConfigFileSet(4, "tmmission_conditions", "conditions")
            .pushRaw(new AeroflyConfigFileSet(5, "tm_time_utc", "time")
            .push("int32", "time_year", this.time.getUTCFullYear())
            .push("int32", "time_month", this.time.getUTCMonth() + 1)
            .push("int32", "time_day", this.time.getUTCDate())
            .push("float64", "time_hours", this.time_hours, `${this.time_presentational} UTC`)
            .toString())
            .push("float64", "wind_direction", this.wind.direction)
            .push("float64", "wind_speed", this.wind.speed, "kts")
            .push("float64", "wind_gusts", this.wind.gusts, "kts")
            .push("float64", "turbulence_strength", this.turbulenceStrength)
            .push("float64", "thermal_strength", this.thermalStrength, `${this.temperature} °C`)
            .push("float64", "visibility", this.visibility, `${this.visibility_sm} SM`)
            .pushRaw(this.getCloudsString())
            .toString();
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
     * @param {number} cover 0..1, percentage
     * @param {number} base altitude in meters AGL
     */
    constructor(cover, base) {
        this.cover = cover;
        this.base = base;
    }
    /**
     * @param {number} cover 0..1, percentage
     * @param {number} base_feet altitude, but in feet AGL instead of meters AGL
     * @returns {AeroflyMissionConditionsCloud}
     */
    static createInFeet(cover, base_feet) {
        return new AeroflyMissionConditionsCloud(cover, base_feet / feetPerMeter);
    }
    /**
     * @param {number} base_feet `this.base` in feet instead of meters
     */
    set base_feet(base_feet) {
        this.base = base_feet / feetPerMeter;
    }
    /**
     * @returns {number} `this.base` in feet instead of meters
     */
    get base_feet() {
        return this.base * feetPerMeter;
    }
    /**
     * @returns {string} Cloud coverage as text representation like "OVC" for `this.cover`
     */
    get cover_code() {
        if (this.cover < 1 / 8) {
            return "CLR";
        }
        else if (this.cover <= 2 / 8) {
            return "FEW";
        }
        else if (this.cover <= 4 / 8) {
            return "SCT";
        }
        else if (this.cover <= 7 / 8) {
            return "BKN";
        }
        return "OVC";
    }
    /**
     * @param {number} index if used in an array will se the array index
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index = 0) {
        const getIndexString = (index) => {
            switch (index) {
                case 0:
                    return "cloud";
                case 1:
                    return "cirrus";
                case 2:
                    return "cumulus_mediocris";
                default:
                    return "more_clouds";
            }
        };
        const indexString = getIndexString(index);
        const comment = index > 1 ? '//' : '';
        return `\
                    ${comment}<[float64][${indexString}_cover][${this.cover ?? 0}]> // ${this.cover_code}
                    ${comment}<[float64][${indexString}_base][${this.base}]> // ${this.base_feet} ft AGL`;
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
    constructor(name, type, longitude, latitude, { altitude = 0, altitude_feet = null, altitudeConstraint = null, direction = null, slope = null, length = null, length_feet = null, frequency = null, flyOver = null, } = {}) {
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
     * @param {number} altitude_feet
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
     * @param {number} length_feet
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
     * @returns {string}
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
     * @param {number} index if used in an array will se the array index
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index = 0) {
        const fileSet = new AeroflyConfigFileSet(5, "tmmission_checkpoint", "element", String(index))
            .push("string8u", "type", this.type)
            .push("string8u", "name", this.name)
            .push("vector2_float64", "lon_lat", [this.longitude, this.latitude])
            .push("float64", "altitude", this.altitude, `${Math.ceil(this.altitude_feet)} ft`)
            .push("float64", "direction", this.direction ?? (index === 0 ? -1 : 0))
            .push("float64", "slope", this.slope ?? 0);
        if (this.altitudeConstraint !== null) {
            fileSet.push("bool", "alt_cst", this.altitudeConstraint);
        }
        if (this.length) {
            fileSet.push("float64", "length", this.length ?? 0, `${Math.floor(this.length_feet)} ft`);
        }
        if (this.frequency) {
            fileSet.push("float64", "frequency", this.frequency ?? 0, `${this.frequency_string}`);
        }
        if (this.flyOver !== null) {
            fileSet.push("bool", "fly_over", this.flyOver);
        }
        return fileSet.toString();
    }
}
/**
 * @class
 * A translation for the mission title and description.
 */
export class AeroflyLocalizedText {
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
    constructor(language, title, description) {
        this.language = language;
        this.title = title;
        this.description = description;
    }
    /**
     * @param {number} index if used in an array will se the array index
     * @returns {string} to use in Aerofly FS4's `custom_missions_user.tmc`
     */
    toString(index = 0) {
        return new AeroflyConfigFileSet(4, "tmmission_definition_localized", "element", String(index))
            .push("string8u", "language", this.language)
            .push("string8", "title", this.title)
            .push("string8", "description", this.description)
            .toString();
    }
}
/**
 * @class
 * A target plane which the aircraft needs to cross.
 */
export class AeroflyMissionTargetPlane {
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
    constructor(longitude, latitude, dir, name = "finish") {
        this.longitude = longitude;
        this.latitude = latitude;
        this.dir = dir;
        this.name = name;
    }
    toString() {
        return new AeroflyConfigFileSet(4, "tmmission_target_plane", this.name)
            .push("vector2_float64", "lon_lat", [this.longitude, this.latitude])
            .push("float64", "direction", this.dir)
            .toString();
    }
}
export default {
    AeroflyMissionsList,
    AeroflyMission,
    AeroflyMissionConditions,
    AeroflyMissionConditionsCloud,
    AeroflyMissionCheckpoint,
    AeroflyLocalizedText,
    AeroflyMissionTargetPlane,
};
