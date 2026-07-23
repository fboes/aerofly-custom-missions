/**
 * @param {number} longitude in degrees
 * @param {number} latitude in degrees
 * @param {number} altitude_meter in meters
 * @returns {AeroflyVector3Float} for Aerofly
 */
export function convertLonLatToVector(longitude, latitude, altitude_meter) {
    const a = 6378137.0;
    const f = 1.0 / 298.257223563;
    const e2 = f * (2 - f);
    const lon = longitude * (Math.PI / 180); // in radians
    const lat = latitude * (Math.PI / 180); // in radians
    const h = altitude_meter;
    const sinLat = Math.sin(lat);
    const cosLat = Math.cos(lat);
    const cosLon = Math.cos(lon);
    const sinLon = Math.sin(lon);
    const N = a / Math.sqrt(1 - e2 * sinLat * sinLat);
    const x = (N + h) * cosLat * cosLon;
    const y = (N + h) * cosLat * sinLon;
    const z = (N * (1 - e2) + h) * sinLat;
    return [x, y, z];
}
/**
 * @param {AeroflyVector3Float} coordinates to convert
 * @returns {object} as with longitude, latitude, altitude_meter
 */
export function convertVectorToLonLat(coordinates) {
    // TODO: This implementation is not correct
    const f = 1.0 / 298.257223563; // WGS84
    const e2 = 2 * f - f * f;
    //const lambda = VectorToAngle( coordinates[0], coordinates[1] );
    let lambda = 0;
    if (coordinates[0] > 0) {
        if (coordinates[1] < 0) {
            lambda = 2 * Math.PI + Math.atan(coordinates[1] / coordinates[0]);
        }
        else {
            lambda = Math.atan(coordinates[1] / coordinates[0]);
        }
    }
    else if (coordinates[0] < 0) {
        lambda = Math.PI + Math.atan(coordinates[1] / coordinates[0]);
    }
    else if (coordinates[1] > 0) {
        lambda = 0.5 * Math.PI;
    }
    else {
        lambda = 1.5 * Math.PI;
    }
    const rho = Math.sqrt(coordinates[0] * coordinates[0] + coordinates[1] * coordinates[1]);
    const phi = Math.atan(coordinates[2] / ((1.0 - e2) * rho));
    const longitude = (lambda * 180) / Math.PI;
    const latitude = (phi * 180) / Math.PI;
    const altitude_meter = rho / Math.cos(phi) - 6378137.0 / Math.sqrt(1 - e2 * Math.sin(phi) * Math.sin(phi));
    return {
        longitude: longitude > 180 ? longitude - 360 : longitude,
        latitude: latitude > 90 ? latitude - 180 : latitude < -90 ? latitude + 180 : latitude,
        altitude_meter,
    };
}
/**
 * @param {number} heading_degree in deg
 * @returns {AeroflyMatrix3Float} for Aerofly
 */
export function convertDegreeToMatrix(heading_degree) {
    // TODO: This implementation is not correct
    const theta = heading_degree * (Math.PI / 180); // heading in radians
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
    return [cosTheta, -sinTheta, 0, sinTheta, cosTheta, 0, 0, 0, 1];
}
/**
 * @param {AeroflyMatrix3Float} orientation as Matrxi
 * @returns {number} heading in degrees
 * @see https://www.aerofly.com/community/forum/index.php?thread/28025-custom-missions-file-livery-and-parking-position-property/&postID=184313#post184313
 * @see
 */
export function convertMatrixToDegree(orientation) {
    // TODO: https://www.aerofly.com/community/forum/index.php?thread/28025-custom-missions-file-livery-and-parking-position-property/&postID=184313#post184313
    const headingRad = Math.atan2(orientation[3], orientation[0]);
    let headingDeg = headingRad * (180 / Math.PI);
    // Normalize to [0, 360)
    if (headingDeg < 0)
        headingDeg += 360;
    return headingDeg;
}
/**
 * @param {number} meter in meters
 * @returns {number} feet
 */
export function convertMeterToFeet(meter) {
    return meter / 0.3048;
}
/**
 * @param {number} feet in feet
 * @returns {number} meters
 */
export function convertFeetToMeter(feet) {
    return feet * 0.3048;
}
/**
 * @param {number} kg in kilograms
 * @returns {number} pounds
 */
export function convertKgToLb(kg) {
    return kg / 0.45359237;
}
/**
 * @param {number} lb in pounds
 * @returns {number} kilograms
 */
export function convertLbToKg(lb) {
    return lb * 0.45359237;
}
