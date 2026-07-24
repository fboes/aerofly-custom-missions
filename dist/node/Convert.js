import { AeroflyVector3Float, AeroflyMatrix3Float } from "./AeroflyTypes.js";
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
    return new AeroflyVector3Float(x, y, z);
}
/**
 * @param {AeroflyVector3Float} coordinates to convert
 * @returns {object} as with longitude, latitude, altitude_meter
 */
export function convertVectorToLonLat(coordinates) {
    const f = 1.0 / 298.257223563; // WGS84
    const e2 = 2 * f - f * f;
    let lambda = 0;
    if (coordinates.x > 0) {
        if (coordinates.y < 0) {
            lambda = 2 * Math.PI + Math.atan(coordinates.y / coordinates.x);
        }
        else {
            lambda = Math.atan(coordinates.y / coordinates.x);
        }
    }
    else if (coordinates.x < 0) {
        lambda = Math.PI + Math.atan(coordinates.y / coordinates.x);
    }
    else if (coordinates.y > 0) {
        lambda = 0.5 * Math.PI;
    }
    else {
        lambda = 1.5 * Math.PI;
    }
    const rho = Math.sqrt(coordinates.x * coordinates.x + coordinates.y * coordinates.y);
    const phi = Math.atan(coordinates.z / ((1.0 - e2) * rho));
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
 * This method receives a heading in degrees and a position vector, and calculates the orientation matrix.
 * The orientation matrix is calculated based on the heading and the position of the aircraft.
 * @param {number} heading_degree in deg
 * @param {AeroflyVector3Float} position as vector
 * @returns {AeroflyMatrix3Float} for Aerofly
 */
export function convertHeadingToOrientation(heading_degree, position) {
    const theta = heading_degree * (Math.PI / 180); // heading in radians
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);
    // Local ENU frame at this position — mirrors convertOrientationToHeading
    const east = new AeroflyVector3Float(-position.y, position.x, 0).normalize();
    const upRaw = new AeroflyVector3Float(position.x, position.y, position.z / (1.0 - 0.00669437999014));
    const up = upRaw.normalize();
    const north = up.cross(east).normalize();
    // Heading -> forward vector in ENU space (sinθ, cosθ, 0), then rotated into world space
    const forward = new AeroflyVector3Float(east.x * sinTheta + north.x * cosTheta, east.y * sinTheta + north.y * cosTheta, east.z * sinTheta + north.z * cosTheta).normalize();
    // Complete the right-handed orthonormal basis (x = forward, z = up, y = up × forward)
    const right = up.cross(forward).normalize();
    return new AeroflyMatrix3Float(...forward.toArray(), ...right.toArray(), ...up.toArray());
}
/**
 * This method receives an orientation matrix and a position vector, and calculates the heading in degrees.
 * The heading is calculated based on the direction of the aircraft in relation to the north direction.
 * @param {AeroflyMatrix3Float} orientation as matrix
 * @param {AeroflyVector3Float} position as vector
 * @returns {number} heading in degrees
 * @see https://www.aerofly.com/community/forum/index.php?thread/28025-custom-missions-file-livery-and-parking-position-property/&postID=184313#post184313
 * @see
 */
export function convertOrientationToHeading(orientation, position) {
    const direction = orientation.multiplyVector(new AeroflyVector3Float(1, 0, 0));
    return convertDirectionToHeading(direction, position);
}
/**
 * This method receives an orientation matrix and a position vector, and calculates the heading in degrees.
 * The heading is calculated based on the direction of the aircraft in relation to the north direction.
 * @param {AeroflyVector3Float} direction as vector
 * @param {AeroflyVector3Float} position as vector
 * @returns {number} heading in degrees
 * @see https://www.aerofly.com/community/forum/index.php?thread/28025-custom-missions-file-livery-and-parking-position-property/&postID=184313#post184313
 * @see
 */
export function convertDirectionToHeading(direction, position) {
    const east = new AeroflyVector3Float(-position.y, position.x, 0).normalize();
    let up = position;
    up.z *= 1.0 / (1.0 - 0.00669437999014); // WGS84
    up = up.normalize();
    const north = up.cross(east).normalize();
    const m = new AeroflyMatrix3Float(...east.toArray(), ...north.toArray(), ...up.toArray()).transpose();
    const local_direction = m.multiplyVector(direction);
    let headingDeg = Math.atan2(local_direction.x, local_direction.y) * (180 / Math.PI);
    if (headingDeg < 0) {
        headingDeg += 360;
    }
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
