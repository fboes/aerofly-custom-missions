export class AeroflyConfigurationNode {
    #children: AeroflyConfigurationNode[] = [];
    space = "\n";

    constructor(
        public type: string,
        public name: string,
        public value: string | number | string[] | number[] | boolean = "",
        public _comment: string = "",
    ) {}

    append(...nodes: AeroflyConfigurationNode[]): AeroflyConfigurationNode {
        this.#children.push(...nodes);
        return this;
    }

    appendChild(
        type: string,
        name: string,
        value: string | number | string[] | number[] | boolean = "",
        _comment: string = "",
    ) {
        this.append(new AeroflyConfigurationNode(type, name, value, _comment));
        return this;
    }

    get valueAsString(): string {
        let value: string | number = "";
        if (this.value instanceof Array) {
            value = this.value.join(" ");
        } else if (typeof value === "boolean") {
            value = this.value ? "true" : "false";
        } else {
            value = this.value.toString();
        }
        return value;
    }

    toString(indent: number = 0): string {
        const indentation = " ".repeat(4 * indent);

        let tag = `${indentation}<[${this.type}][${this.name}][${this.#aeroflyEscape(this.valueAsString)}]`;
        if (this.#children.length > 0) {
            tag += this.space;
            tag += this.#children.map((child) => child.toString(indent + 1)).join(this.space);
            tag += `${this.space}${indentation}>`;
        } else {
            tag += ">";
        }

        if (this._comment) {
            tag += ` // ${this._comment.replace(/[\n\r]/g, " ")}`;
        }
        return tag;
    }

    #aeroflyEscape(text: string): string {
        return text.replace(/\[/g, "(").replace(/\]/g, ")");
    }

    toXmlString(indent: number = 0): string {
        const indentation = " ".repeat(4 * indent);
        const name = this.name || this.type;

        let tag = indentation;
        if (this.#children.length > 0) {
            const index = this.valueAsString ? ` index="${this.#xmlEscape(this.valueAsString)}"` : "";
            tag += `<${name} type="${this.type}"${index}>`;
            tag += "\n";
            tag += this.#children.map((child) => child.toXmlString(indent + 1)).join("\n");
            tag += `\n${indentation}</${name}>`;
        } else {
            tag += `<${name} type="${this.type}">${this.#xmlEscape(this.valueAsString)}</${name}>`;
        }

        if (this._comment) {
            tag += ` <!-- ${this.#xmlEscape(this._comment)} -->`;
        }
        return tag;
    }

    #xmlEscape(text: string): string {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

export class AeroflyConfigurationNodeSpacer extends AeroflyConfigurationNode {
    space = `\n// ${"-".repeat(77)}\n`;
}
