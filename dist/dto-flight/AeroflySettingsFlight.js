import { Convert } from "../node/Convert.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
export class AeroflySettingsFlight {
    constructor(longitude, latitude, altitude_meter, heading_degree, speed_kts = 0, { gear = 1, throttle = 0, flaps = 0, flighConfiguration = "OnGround", onGround = true, airport = "", runway = "", } = {}) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.altitude_meter = altitude_meter;
        this.heading_degree = heading_degree;
        this.speed_kts = speed_kts;
        this.gear = gear;
        this.throttle = throttle;
        this.flaps = flaps;
        this.flighConfiguration = flighConfiguration;
        this.onGround = onGround;
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
            .appendChild("flight_configuration", "configuration", this.flighConfiguration)
            .appendChild("bool", "on_ground", this.onGround)
            .appendChild("string8u", "airport", this.airport)
            .appendChild("string8u", "runway", this.runway);
    }
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString() {
        return this.getElement().toString();
    }
}
