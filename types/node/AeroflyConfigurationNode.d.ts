export declare class AeroflyConfigurationNode {
    #private;
    type: string;
    name: string;
    value: string | number | string[] | number[] | boolean;
    _comment: string;
    space: string;
    constructor(type: string, name: string, value?: string | number | string[] | number[] | boolean, _comment?: string);
    append(...nodes: AeroflyConfigurationNode[]): AeroflyConfigurationNode;
    appendChild(type: string, name: string, value?: string | number | string[] | number[] | boolean, _comment?: string): this;
    get valueAsString(): string;
    toString(indent?: number): string;
    toXmlString(indent?: number): string;
}
export declare class AeroflyConfigurationNodeSpacer extends AeroflyConfigurationNode {
    space: string;
}
//# sourceMappingURL=AeroflyConfigurationNode.d.ts.map