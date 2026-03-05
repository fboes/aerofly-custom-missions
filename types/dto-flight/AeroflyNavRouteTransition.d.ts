import { AeroflyVector3Float } from "../node/Convert.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { AeroflyNavRouteBase, AeroflyNavRouteType } from "./AeroflyNavRouteBase.js";
declare class AeroflyNavRouteTransition extends AeroflyNavRouteBase {
    /**
     * @property {string} airport ICAO code of the airport this transition belongs to, e.g. "SEA", "PDX"
     */
    airport: string;
    /**
     * @property {string} transition name, e.g. "SID1", "STAR1", "APP1"
     */
    transition: string;
    /**
     * @property {?bigint} transitionUid unique identifier for the transition, can be null if not set
     */
    transitionUid: bigint | null;
    /**
     * @property {?number} elevation in meters, null if not set
     */
    elevation: number | null;
    constructor(
        type: AeroflyNavRouteType,
        identifier: string,
        airport: string,
        options?: Partial<AeroflyNavRouteTransition>,
    );
    /**
     * @returns {number | null} elevation in feet, null if not set
     */
    get elevation_ft(): number | null;
    set elevation_ft(elevation_ft: number | null);
    /**
     * @returns {AeroflyVector3Float} deliberately empty
     */
    get position(): AeroflyVector3Float;
    /**
     * @returns {AeroflyVector3Float} deliberately empty
     */
    get direction(): AeroflyVector3Float;
    getElement(index?: number): AeroflyConfigurationNode;
}
export declare class AeroflyNavRouteApproach extends AeroflyNavRouteTransition {
    /**
     * @inheritdoc
     */
    constructor(identifier: string, airport: string, options?: Partial<AeroflyNavRouteTransition>);
}
export declare class AeroflyNavRouteArrival extends AeroflyNavRouteTransition {
    /**
     * @inheritdoc
     */
    constructor(identifier: string, airport: string, options?: Partial<AeroflyNavRouteTransition>);
    getElement(index?: number): AeroflyConfigurationNode;
}
export declare class AeroflyNavRouteDeparture extends AeroflyNavRouteTransition {
    /**
     * @inheritdoc
     */
    constructor(identifier: string, airport: string, options?: Partial<AeroflyNavRouteTransition>);
}
export {};
//# sourceMappingURL=AeroflyNavRouteTransition.d.ts.map
