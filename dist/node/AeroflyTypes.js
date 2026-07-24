export class AeroflyVector3Float {
    x;
    y;
    z;
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    normalize() {
        const norm = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        if (norm === 0) {
            return new AeroflyVector3Float(0, 0, 0);
        }
        return new AeroflyVector3Float(this.x / norm, this.y / norm, this.z / norm);
    }
    cross(b) {
        return new AeroflyVector3Float(this.y * b.z - this.z * b.y, this.z * b.x - this.x * b.z, this.x * b.y - this.y * b.x);
    }
    static fromArray(array) {
        return new this(...array);
    }
    toArray() {
        return [this.x, this.y, this.z];
    }
}
export class AeroflyMatrix3Float {
    xx;
    yx;
    zx;
    xy;
    yy;
    zy;
    xz;
    yz;
    zz;
    constructor(xx, yx, zx, xy, yy, zy, xz, yz, zz) {
        this.xx = xx;
        this.yx = yx;
        this.zx = zx;
        this.xy = xy;
        this.yy = yy;
        this.zy = zy;
        this.xz = xz;
        this.yz = yz;
        this.zz = zz;
    }
    transpose() {
        return new AeroflyMatrix3Float(this.xx, this.xy, this.xz, this.yx, this.yy, this.yz, this.zx, this.zy, this.zz);
    }
    multiplyVector(v) {
        return new AeroflyVector3Float(this.xx * v.x + this.xy * v.y + this.xz * v.z, this.yx * v.x + this.yy * v.y + this.yz * v.z, this.zx * v.x + this.zy * v.y + this.zz * v.z);
    }
    static fromArray(array) {
        return new this(...array);
    }
    toArray() {
        return [this.xx, this.yx, this.zx, this.xy, this.yy, this.zy, this.xz, this.yz, this.zz];
    }
}
