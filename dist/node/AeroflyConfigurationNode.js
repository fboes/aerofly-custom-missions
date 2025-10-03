var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AeroflyConfigurationNode_instances, _AeroflyConfigurationNode_children, _AeroflyConfigurationNode_aeroflyEscape, _AeroflyConfigurationNode_xmlEscape;
export class AeroflyConfigurationNode {
    constructor(type, name, value = "", _comment = "") {
        this.type = type;
        this.name = name;
        this.value = value;
        this._comment = _comment;
        _AeroflyConfigurationNode_instances.add(this);
        _AeroflyConfigurationNode_children.set(this, []);
    }
    append(...nodes) {
        __classPrivateFieldGet(this, _AeroflyConfigurationNode_children, "f").push(...nodes);
        return this;
    }
    appendChild(type, name, value = "", _comment = "") {
        this.append(new AeroflyConfigurationNode(type, name, value, _comment));
        return this;
    }
    get valueAsString() {
        let value = "";
        if (this.value instanceof Array) {
            value = this.value.join(" ");
        }
        else if (typeof value === "boolean") {
            value = this.value ? "true" : "false";
        }
        else {
            value = this.value.toString();
        }
        return value;
    }
    toString(indent = 0) {
        const indentation = " ".repeat(4 * indent);
        let tag = `${indentation}<[${this.type}][${this.name}][${__classPrivateFieldGet(this, _AeroflyConfigurationNode_instances, "m", _AeroflyConfigurationNode_aeroflyEscape).call(this, this.valueAsString)}]`;
        if (__classPrivateFieldGet(this, _AeroflyConfigurationNode_children, "f").length > 0) {
            tag += "\n";
            tag += __classPrivateFieldGet(this, _AeroflyConfigurationNode_children, "f").map((child) => child.toString(indent + 1)).join("\n");
            tag += `\n${indentation}>`;
        }
        else {
            tag += ">";
        }
        if (this._comment) {
            tag += ` // ${this._comment.replace(/[\n\r]/g, " ")}`;
        }
        return tag;
    }
    toXmlString(indent = 0) {
        const indentation = " ".repeat(4 * indent);
        const name = this.name || this.type;
        let tag = indentation;
        if (__classPrivateFieldGet(this, _AeroflyConfigurationNode_children, "f").length > 0) {
            const index = this.valueAsString ? ` index="${__classPrivateFieldGet(this, _AeroflyConfigurationNode_instances, "m", _AeroflyConfigurationNode_xmlEscape).call(this, this.valueAsString)}"` : "";
            tag += `<${name} type="${this.type}"${index}>`;
            tag += "\n";
            tag += __classPrivateFieldGet(this, _AeroflyConfigurationNode_children, "f").map((child) => child.toXmlString(indent + 1)).join("\n");
            tag += `\n${indentation}</${name}>`;
        }
        else {
            tag += `<${name} type="${this.type}">${__classPrivateFieldGet(this, _AeroflyConfigurationNode_instances, "m", _AeroflyConfigurationNode_xmlEscape).call(this, this.valueAsString)}</${name}>`;
        }
        if (this._comment) {
            tag += ` <!-- ${__classPrivateFieldGet(this, _AeroflyConfigurationNode_instances, "m", _AeroflyConfigurationNode_xmlEscape).call(this, this._comment)} -->`;
        }
        return tag;
    }
}
_AeroflyConfigurationNode_children = new WeakMap(), _AeroflyConfigurationNode_instances = new WeakSet(), _AeroflyConfigurationNode_aeroflyEscape = function _AeroflyConfigurationNode_aeroflyEscape(text) {
    return text.replace(/\[/g, "(").replace(/\]/g, ")");
}, _AeroflyConfigurationNode_xmlEscape = function _AeroflyConfigurationNode_xmlEscape(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};
