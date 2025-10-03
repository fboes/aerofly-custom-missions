export declare class AeroflyConfigFileSet {
    #private;
    elements: string[];
    constructor(indent: number, type: string, name: string, value?: string);
    get indent(): string;
    push(type: string, name: string, value: string | number | string[] | number[] | boolean, comment?: string): this;
    pushRaw(s: string): this;
    toString(): string;
}
//# sourceMappingURL=AeroflyConfigFileSet.d.ts.map