export class AeroflyConfigFileSet {
    #indent: number;
    elements: string[];

    constructor(indent: number, type: string, name: string, value: string = "") {
        this.#indent = indent;
        this.elements = [`${this.indent}<[${type}][${name}][${value}]`];
    }

    get indent(): string {
        return "    ".repeat(this.#indent);
    }

    push(type: string, name: string, value: string | number | string[] | number[] | boolean, comment: string = "") {
        if (value instanceof Array) {
            value = value.join(" ");
        } else if (typeof value === "boolean") {
            value = value ? "true" : "false";
        }
        let tag = `${this.indent}    <[${type}][${name}][${value}]>`;
        if (comment) {
            tag += ` // ${comment}`;
        }
        return this.pushRaw(tag);
    }

    pushRaw(s: string) {
        this.elements.push(s);
        return this;
    }

    toString() {
        return this.elements.join("\n") + "\n" + `${this.indent}>`;
    }
}
