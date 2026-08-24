import { AeroflyVector3Float, AeroflyMatrix3Float } from "./AeroflyTypes.js";
/**
 * @param {number} longitude in degrees
 * @param {number} latitude in degrees
 * @param {number} altitude_meter in meters
 * @returns {AeroflyVector3Float} for Aerofly
 */
export declare function convertLonLatToVector(
    longitude: number,
    latitude: number,
    altitude_meter: number,
): AeroflyVector3Float;
/**
 * @param {AeroflyVector3Float} coordinates to convert
 * @returns {object} as with longitude, latitude, altitude_meter
 */
export declare function convertVectorToLonLat(coordinates: AeroflyVector3Float): {
    longitude: number;
    latitude: number;
    altitude_meter: number;
};
/**
 * This method receives a heading in degrees and a position vector, and calculates the orientation matrix.
 * The orientation matrix is calculated based on the heading and the position of the aircraft.
 * @param {number} heading_degree in deg
 * @param {AeroflyVector3Float} position as vector
 * @returns {AeroflyMatrix3Float} for Aerofly
 */
export declare function convertHeadingToOrientation(
    heading_degree: number,
    position: AeroflyVector3Float,
): AeroflyMatrix3Float;
/**
 * This method receives an orientation matrix and a position vector, and calculates the heading in degrees.
 * The heading is calculated based on the direction of the aircraft in relation to the north direction.
 * @param {AeroflyMatrix3Float} orientation as matrix
 * @param {AeroflyVector3Float} position as vector
 * @returns {number} heading in degrees
 * @see https://www.aerofly.com/community/forum/index.php?thread/28025-custom-missions-file-livery-and-parking-position-property/&postID=184313#post184313
 * @see
 */
export declare function convertOrientationToHeading(
    orientation: AeroflyMatrix3Float,
    position: AeroflyVector3Float,
): number;
/**
 * This method receives an orientation matrix and a position vector, and calculates the heading in degrees.
 * The heading is calculated based on the direction of the aircraft in relation to the north direction.
 * @param {AeroflyVector3Float} direction as vector
 * @param {AeroflyVector3Float} position as vector
 * @returns {number} heading in degrees
 * @see https://www.aerofly.com/community/forum/index.php?thread/28025-custom-missions-file-livery-and-parking-position-property/&postID=184313#post184313
 * @see
 */
export declare function convertDirectionToHeading(
    direction: AeroflyVector3Float,
    position: AeroflyVector3Float,
): number;
/**
 * @param {number} meter in meters
 * @returns {number} feet
 */
export declare function convertMeterToFeet(meter: number): number;
/**
 * @param {number} feet in feet
 * @returns {number} meters
 */
export declare function convertFeetToMeter(feet: number): number;
/**
 * @param {number} kg in kilograms
 * @returns {number} pounds
 */
export declare function convertKgToLb(kg: number): number;
/**
 * @param {number} lb in pounds
 * @returns {number} kilograms
 */
export declare function convertLbToKg(lb: number): number;
//# sourceMappingURL=Convert.d.ts.map
