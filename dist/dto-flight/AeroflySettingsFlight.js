import { Convert } from "../node/Convert.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
export class AeroflySettingsFlight {
    constructor(longitude, latitude, altitude_meter, heading_degree, speed_kts = 0, { gear = 1, throttle = 0, flaps = 0, configuration = "OnGround", onGround = true, airport = "", runway = "", } = {}) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.altitude_meter = altitude_meter;
        this.heading_degree = heading_degree;
        this.speed_kts = speed_kts;
        this.gear = 1;
        /**
         * Throttle is supposed to be set to
         * - 0 on "ColdAndDark", "BeforeStart", "OnGround" and "Takeoff" configuration
         * - 0.4 on "ShortFinal" and "Final" configuration
         * - 0.6 on "Cruise" configuration
         */
        this.throttle = 0;
        /**
         * Flaps is supposed to be set to 1 on "ShortFinal" and "Final" configurations
         */
        this.flaps = 0;
        this.configuration = "OnGround";
        this.onGround = true;
        this.configuration = configuration;
        this.setConfiguration(configuration);
        if (gear !== undefined) {
            this.gear = gear;
        }
        if (throttle !== undefined) {
            this.throttle = throttle;
        }
        if (flaps !== undefined) {
            this.flaps = flaps;
        }
        if (onGround !== undefined) {
            this.onGround = onGround;
        }
        this.airport = airport;
        this.runway = runway;
    }
    static createInFeet(longitude, latitude, altitude_ft, heading_degree, speed_kts = 0, additionalAttributes = {}) {
        return new AeroflySettingsFlight(longitude, latitude, Convert.convertFeetToMeter(altitude_ft), heading_degree, speed_kts, additionalAttributes);
    }
    static createInCartesian(position, velocity, orientation, additionalAttributes = {}) {
        const flight = new AeroflySettingsFlight(0, 0, 0, 0, 0, additionalAttributes);
        flight.position = position;
        flight.velocity = velocity;
        flight.orientation = orientation;
        return flight;
    }
    /**
     * @param {AeroflySettingsFlightConfiguration} configuration which will set other parameters like `gear`, `flaps` and `throttle` consistently
     */
    setConfiguration(configuration) {
        this.configuration = configuration;
        if (configuration === "Keep") {
            return;
        }
        this.onGround =
            configuration === "ColdAndDark" ||
                configuration === "BeforeStart" ||
                configuration === "OnGround" ||
                configuration === "Takeoff";
        this.gear = configuration === "Cruise" ? 0 : 1;
        this.flaps = configuration === "Final" || configuration === "ShortFinal" ? 1 : 0;
        switch (configuration) {
            case "ShortFinal":
            case "Final":
                this.throttle = 0.4;
                break;
            case "Cruise":
                this.throttle = 0.6;
                break;
            default:
                this.throttle = 0;
                this.speed_kts = 0;
                break;
        }
    }
    /**
     * @returns {AeroflyVector3Float} position vector to use in Aerofly FS4's `main.mcf`
     */
    get position() {
        return Convert.convertLonLatToVector(this.longitude, this.latitude, this.altitude_meter);
    }
    set position(position) {
        const { longitude, latitude, altitude_meter } = Convert.convertVectorToLonLat(position);
        this.longitude = longitude;
        this.latitude = latitude;
        this.altitude_meter = altitude_meter;
    }
    /**
     * @returns {AeroflyVector3Float} velocity vector to use in Aerofly FS4's `main.mcf`
     */
    get velocity() {
        const speed = this.speed_ms;
        const heading_rad = this.heading_degree * (Math.PI / 180);
        return [Math.cos(heading_rad) * speed, Math.sin(heading_rad) * speed, 0];
    }
    set velocity(velocity) {
        // TODO: implement setting velocity vector and updating speed accordingly
        this.speed_ms = 0;
    }
    get orientation() {
        return Convert.convertDegreeToMatrix(this.heading_degree);
    }
    set orientation(orientation) {
        this.heading_degree = Convert.convertMatrixToDegree(orientation);
    }
    /**
     * @returns {number} altitude in feet AGL
     */
    get altitude_ft() {
        return Convert.convertMeterToFeet(this.altitude_meter);
    }
    set altitude_ft(altitude_ft) {
        this.altitude_meter = Convert.convertFeetToMeter(altitude_ft);
    }
    /**
     * @returns {number} speed in meters per seconds
     */
    get speed_ms() {
        return this.speed_kts * 0.514444;
    }
    set speed_ms(speed_ms) {
        this.speed_kts = speed_ms / 0.514444;
    }
    getElement() {
        return new AeroflyConfigurationNode("tmsettings_flight", "flight_setting")
            .appendChild("vector3_float64", "position", this.position, `Lon ${this.longitude.toFixed(6)}, Lat ${this.latitude.toFixed(6)}, ${Math.ceil(this.altitude_ft)} ft`)
            .appendChild("vector3_float64", "velocity", this.velocity, `${Math.round(this.speed_kts)} kts`)
            .appendChild("matrix3_float64", "orientation", this.orientation, `${Math.round(this.heading_degree)}° heading`)
            .appendChild("float64", "gear", this.gear)
            .appendChild("float64", "throttle", this.throttle)
            .appendChild("float64", "flaps", this.flaps)
            .appendChild("flight_configuration", "configuration", this.configuration)
            .appendChild("bool", "on_ground", this.onGround)
            .appendChild("string8u", "airport", this.airport)
            .appendChild("string8u", "runway", this.runway);
    }
    toJSON() {
        return {
            ...this,
            altitude_meter: undefined,
            altitude_ft: this.altitude_ft,
        };
    }
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString() {
        return this.getElement().toString();
    }
}
