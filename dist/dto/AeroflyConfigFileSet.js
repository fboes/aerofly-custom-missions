var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AeroflyConfigFileSet_indent;
export class AeroflyConfigFileSet {
    constructor(indent, type, name, value = "") {
        _AeroflyConfigFileSet_indent.set(this, void 0);
        __classPrivateFieldSet(this, _AeroflyConfigFileSet_indent, indent, "f");
        this.elements = [`${this.indent}<[${type}][${name}][${value}]`];
    }
    get indent() {
        return "    ".repeat(__classPrivateFieldGet(this, _AeroflyConfigFileSet_indent, "f"));
    }
    push(type, name, value, comment = "") {
        if (value instanceof Array) {
            value = value.join(" ");
        }
        else if (typeof value === "boolean") {
            value = value ? "true" : "false";
        }
        let tag = `${this.indent}    <[${type}][${name}][${value}]>`;
        if (comment) {
            tag += ` // ${comment}`;
        }
        return this.pushRaw(tag);
    }
    pushRaw(s) {
        this.elements.push(s);
        return this;
    }
    toString() {
        return this.elements.join("\n") + "\n" + `${this.indent}>`;
    }
}
_AeroflyConfigFileSet_indent = new WeakMap();
