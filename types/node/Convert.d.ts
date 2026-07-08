export type AeroflyVector3Float = [number, number, number];
export type AeroflyMatrix3Float = [number, number, number, number, number, number, number, number, number];
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
 * @returns {Object} as with longitude, latitude, altitude_meter
 */
export declare function convertVectorToLonLat(coordinates: AeroflyVector3Float): {
    longitude: number;
    latitude: number;
    altitude_meter: number;
};
/**
 * @param {number} heading_degree in deg
 * @returns {AeroflyMatrix3Float} for Aerofly
 */
export declare function convertDegreeToMatrix(heading_degree: number): AeroflyMatrix3Float;
/**
 * @param {AeroflyMatrix3Float} orientation as Matrxi
 * @returns {number} heading in degrees
 * @see https://www.aerofly.com/community/forum/index.php?thread/28025-custom-missions-file-livery-and-parking-position-property/&postID=184313#post184313
 * @see
 */
export declare function convertMatrixToDegree(orientation: AeroflyMatrix3Float): number;
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
