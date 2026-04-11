import { AeroflyVector3Float, AeroflyMatrix3Float, Convert } from "../node/Convert.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";

export class AeroflySettingsFlight {
    gear: number;
    throttle: number;
    flaps: number;
    configuration: "Keep" | "OnGround" | "Cruise";
    onGround: boolean;
    airport: string;
    runway: string;

    constructor(
        public longitude: number,
        public latitude: number,
        public altitude_meter: number,
        public heading_degree: number,
        public speed_kts: number = 0,
        {
            gear = 1,
            throttle = 0,
            flaps = 0,
            configuration = "OnGround",
            onGround = true,
            airport = "",
            runway = "",
        }: Partial<AeroflySettingsFlight> = {},
    ) {
        this.gear = gear;
        this.throttle = throttle;
        this.flaps = flaps;
        this.configuration = configuration;
        this.onGround = onGround;
        this.airport = airport;
        this.runway = runway;
    }

    static createInFeet(
        longitude: number,
        latitude: number,
        altitude_ft: number,
        heading_degree: number,
        speed_kts: number = 0,
        additionalAttributes: Partial<AeroflySettingsFlight> = {},
    ): AeroflySettingsFlight {
        return new AeroflySettingsFlight(
            longitude,
            latitude,
            Convert.convertFeetToMeter(altitude_ft),
            heading_degree,
            speed_kts,
            additionalAttributes,
        );
    }

    static createInCartesian(
        position: AeroflyVector3Float,
        velocity: AeroflyVector3Float,
        orientation: AeroflyMatrix3Float,
        additionalAttributes: Partial<AeroflySettingsFlight> = {},
    ): AeroflySettingsFlight {
        const flight = new AeroflySettingsFlight(0, 0, 0, 0, 0, additionalAttributes);
        flight.position = position;
        flight.velocity = velocity;
        flight.orientation = orientation;
        return flight;
    }

    /**
     * @returns {AeroflyVector3Float} position vector to use in Aerofly FS4's `main.mcf`
     */
    get position(): AeroflyVector3Float {
        return Convert.convertLonLatToVector(this.longitude, this.latitude, this.altitude_meter);
    }

    set position(position: AeroflyVector3Float) {
        const { longitude, latitude, altitude_meter } = Convert.convertVectorToLonLat(position);
        this.longitude = longitude;
        this.latitude = latitude;
        this.altitude_meter = altitude_meter;
    }

    /**
     * @returns {AeroflyVector3Float} velocity vector to use in Aerofly FS4's `main.mcf`
     */
    get velocity(): AeroflyVector3Float {
        const speed = this.speed_ms;
        const heading_rad = this.heading_degree * (Math.PI / 180);
        return [Math.cos(heading_rad) * speed, Math.sin(heading_rad) * speed, 0];
    }

    set velocity(velocity: AeroflyVector3Float) {
        // TODO: implement setting velocity vector and updating speed accordingly
        this.speed_ms = 0;
    }

    get orientation(): AeroflyMatrix3Float {
        return Convert.convertDegreeToMatrix(this.heading_degree);
    }

    set orientation(orientation: AeroflyMatrix3Float) {
        this.heading_degree = Convert.convertMatrixToDegree(orientation);
    }

    /**
     * @returns {number} altitude in feet AGL
     */
    get altitude_ft(): number {
        return Convert.convertMeterToFeet(this.altitude_meter);
    }

    set altitude_ft(altitude_ft: number) {
        this.altitude_meter = Convert.convertFeetToMeter(altitude_ft);
    }

    /**
     * @returns {number} speed in meters per seconds
     */
    get speed_ms(): number {
        return this.speed_kts * 0.514444;
    }

    set speed_ms(speed_ms: number) {
        this.speed_kts = speed_ms / 0.514444;
    }

    getElement(): AeroflyConfigurationNode {
        return new AeroflyConfigurationNode("tmsettings_flight", "flight_setting")
            .appendChild(
                "vector3_float64",
                "position",
                this.position,
                `Lon ${this.longitude.toFixed(6)}, Lat ${this.latitude.toFixed(6)}, ${Math.ceil(this.altitude_ft)} ft`,
            )
            .appendChild("vector3_float64", "velocity", this.velocity, `${Math.round(this.speed_kts)} kts`)
            .appendChild(
                "matrix3_float64",
                "orientation",
                this.orientation,
                `${Math.round(this.heading_degree)}° heading`,
            )
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
    toString(): string {
        return this.getElement().toString();
    }
}
