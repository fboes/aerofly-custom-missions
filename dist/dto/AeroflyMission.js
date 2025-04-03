import { AeroflyConfigFileSet } from "./AeroflyConfigFileSet.js";
import { AeroflyMissionConditions } from "./AeroflyMissionConditions.js";
export const feetPerMeter = 3.28084;
export const meterPerStatuteMile = 1609.344;
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
