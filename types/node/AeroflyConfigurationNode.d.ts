export declare class AeroflyConfigurationNode {
    #private;
    type: string;
    name: string;
    value: string | number | string[] | number[] | boolean;
    _comment: string;
    constructor(type: string, name: string, value?: string | number | string[] | number[] | boolean, _comment?: string);
    append(...nodes: AeroflyConfigurationNode[]): AeroflyConfigurationNode;
    appendChild(type: string, name: string, value?: string | number | string[] | number[] | boolean, _comment?: string): this;
    get valueAsString(): string;
    toString(indent?: number): string;
    toXmlString(indent?: number): string;
}
//# sourceMappingURL=AeroflyConfigurationNode.d.ts.map