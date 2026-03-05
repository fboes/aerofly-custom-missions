import { AeroflyVector3Float } from "../node/Convert.js";
import { AeroflyConfigurationNode } from "../node/AeroflyConfigurationNode.js";
import { AeroflyNavRouteBase, AeroflyNavRouteType } from "./AeroflyNavRouteBase.js";
declare class AeroflyNavRouteRunway extends AeroflyNavRouteBase {
    /**
     * @property {?number} direction_degree runway direction in degrees, null if not set
     */
    direction_degree: number | null;
    /**
     * @property {number | null} elevation in meters, null if not set
     */
    elevation: number | null;
    /**
     * @property {number | null} runwayLength in meters, null if not set
     */
    runwayLength: number | null;
    constructor(
        type: AeroflyNavRouteType,
        identifier: string,
        longitude: number,
        latitude: number,
        { direction_degree, elevation, elevation_ft, runwayLength, uid }?: Partial<AeroflyNavRouteRunway>,
    );
    /**
     * @returns {number | null} elevation in feet, null if not set
     */
    get elevation_ft(): number | null;
    set elevation_ft(elevation_ft: number | null);
    /**
     * @returns {number | null} runway length in feet, null if not set
     */
    get runwayLength_ft(): number | null;
    set runwayLength_ft(runwayLength_ft: number | null);
    /**
     * @returns {AeroflyVector3Float | null} runway direction, null if not set
     */
    get direction(): AeroflyVector3Float | null;
    set direction(direction: AeroflyVector3Float);
    getElement(index?: number): AeroflyConfigurationNode;
}
export declare class AeroflyNavRouteDepartureRunway extends AeroflyNavRouteRunway {
    /**
     * @inheritdoc
     */
    constructor(identifier: string, longitude: number, latitude: number, options?: Partial<AeroflyNavRouteRunway>);
}
export declare class AeroflyNavRouteDestinationRunway extends AeroflyNavRouteRunway {
    /**
     * @inheritdoc
     */
    constructor(identifier: string, longitude: number, latitude: number, options?: Partial<AeroflyNavRouteRunway>);
}
export {};
//# sourceMappingURL=AeroflyNavRouteRunway.d.ts.map
