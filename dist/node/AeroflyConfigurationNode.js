export class AeroflyConfigurationNode {
    constructor(type, name, value = "", _comment = "") {
        this.type = type;
        this.name = name;
        this.value = value;
        this._comment = _comment;
        this.children = [];
        this.space = "\n";
    }
    append(...nodes) {
        this.children.push(...nodes);
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
        let tag = `${indentation}<[${this.type}][${this.name}][${this.aeroflyEscape(this.valueAsString)}]`;
        if (this.children.length > 0) {
            tag += this.space;
            tag += this.children.map((child) => child.toString(indent + 1)).join(this.space);
            tag += `${this.space}${indentation}>`;
        }
        else {
            tag += ">";
        }
        if (this._comment) {
            tag += ` // ${this._comment.replace(/[\n\r]/g, " ")}`;
        }
        return tag;
    }
    aeroflyEscape(text) {
        return text.replace(/\[/g, "(").replace(/\]/g, ")");
    }
    toXmlString(indent = 0) {
        const indentation = " ".repeat(4 * indent);
        const name = this.name || this.type;
        let tag = indentation;
        if (this.children.length > 0) {
            const index = this.valueAsString ? ` index="${this.xmlEscape(this.valueAsString)}"` : "";
            tag += `<${name} type="${this.type}"${index}>`;
            tag += "\n";
            tag += this.children.map((child) => child.toXmlString(indent + 1)).join("\n");
            tag += `\n${indentation}</${name}>`;
        }
        else {
            tag += `<${name} type="${this.type}">${this.xmlEscape(this.valueAsString)}</${name}>`;
        }
        if (this._comment) {
            tag += ` <!-- ${this.xmlEscape(this._comment)} -->`;
        }
        return tag;
    }
    xmlEscape(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}
export class AeroflyConfigurationNodeSpacer extends AeroflyConfigurationNode {
    constructor() {
        super(...arguments);
        this.space = `\n// ${"-".repeat(77)}\n`;
    }
}
export class AeroflyConfigurationNodeComment extends AeroflyConfigurationNode {
    toString(indent = 0) {
        const indentation = " ".repeat(4 * indent);
        let tag = `${indentation}// <[${this.type}][${this.name}][${this.aeroflyEscape(this.valueAsString)}]`;
        if (this.children.length > 0) {
            tag += this.space;
            tag += this.children.map((child) => child.toString(indent + 1)).join(this.space);
            tag += `${this.space}${indentation}>`;
        }
        else {
            tag += ">";
        }
        return tag;
    }
    toXmlString(indent = 0) {
        const indentation = " ".repeat(4 * indent);
        const name = this.name || this.type;
        let tag = indentation;
        if (this.children.length > 0) {
            const index = this.valueAsString ? ` index="${this.xmlEscape(this.valueAsString)}"` : "";
            tag += `<!-- ${name} type="${this.type}"${index}>`;
            tag += "\n";
            tag += this.children.map((child) => child.toXmlString(indent + 1)).join("\n");
            tag += `\n${indentation}</${name} -->`;
        }
        else {
            tag += `<!-- ${name} type="${this.type}">${this.xmlEscape(this.valueAsString)}</${name} -->`;
        }
        if (this._comment) {
            tag += ` <!-- ${this.xmlEscape(this._comment)} -->`;
        }
        return tag;
    }
}
