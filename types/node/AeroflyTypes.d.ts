export type AeroflyVector3FloatArray = [number, number, number];
export declare class AeroflyVector3Float {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    normalize(): AeroflyVector3Float;
    cross(b: AeroflyVector3Float): AeroflyVector3Float;
    static fromArray(array: AeroflyVector3FloatArray): AeroflyVector3Float;
    toArray(): AeroflyVector3FloatArray;
}
export type AeroflyMatrix3FloatArray = [number, number, number, number, number, number, number, number, number];
export declare class AeroflyMatrix3Float {
    xx: number;
    yx: number;
    zx: number;
    xy: number;
    yy: number;
    zy: number;
    xz: number;
    yz: number;
    zz: number;
    constructor(xx: number, yx: number, zx: number, xy: number, yy: number, zy: number, xz: number, yz: number, zz: number);
    transpose(): AeroflyMatrix3Float;
    multiplyVector(v: AeroflyVector3Float): AeroflyVector3Float;
    static fromArray(array: AeroflyMatrix3FloatArray): AeroflyMatrix3Float;
    toArray(): AeroflyMatrix3FloatArray;
}
//# sourceMappingURL=AeroflyTypes.d.ts.map