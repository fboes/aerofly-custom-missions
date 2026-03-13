import { AeroflyVector3Float, AeroflyMatrix3Float } from "../node/Convert.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
export declare class AeroflySettingsFlight {
    longitude: number;
    latitude: number;
    altitude_meter: number;
    heading_degree: number;
    speed_kts: number;
    gear: number;
    throttle: number;
    flaps: number;
    configuration: "Keep" | "OnGround" | "Cruise";
    onGround: boolean;
    airport: string;
    runway: string;
    constructor(
        longitude: number,
        latitude: number,
        altitude_meter: number,
        heading_degree: number,
        speed_kts?: number,
        { gear, throttle, flaps, configuration, onGround, airport, runway }?: Partial<AeroflySettingsFlight>,
    );
    static createInFeet(
        longitude: number,
        latitude: number,
        altitude_ft: number,
        heading_degree: number,
        speed_kts?: number,
        additionalAttributes?: Partial<AeroflySettingsFlight>,
    ): AeroflySettingsFlight;
    static createInCartesian(
        position: AeroflyVector3Float,
        velocity: AeroflyVector3Float,
        orientation: AeroflyMatrix3Float,
        additionalAttributes?: Partial<AeroflySettingsFlight>,
    ): AeroflySettingsFlight;
    /**
     * @returns {AeroflyVector3Float} position vector to use in Aerofly FS4's `main.mcf`
     */
    get position(): AeroflyVector3Float;
    set position(position: AeroflyVector3Float);
    /**
     * @returns {AeroflyVector3Float} velocity vector to use in Aerofly FS4's `main.mcf`
     */
    get velocity(): AeroflyVector3Float;
    set velocity(velocity: AeroflyVector3Float);
    get orientation(): AeroflyMatrix3Float;
    set orientation(orientation: AeroflyMatrix3Float);
    /**
     * @returns {number} altitude in feet AGL
     */
    get altitude_ft(): number;
    set altitude_ft(altitude_ft: number);
    /**
     * @returns {number} speed in meters per seconds
     */
    get speed_ms(): number;
    set speed_ms(speed_ms: number);
    getElement(): AeroflyConfigurationNode;
    /**
     * @returns {string} to use in Aerofly FS4's `main.mcf`
     */
    toString(): string;
}
//# sourceMappingURL=AeroflySettingsFlight.d.ts.map
