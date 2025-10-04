export declare class AeroflyConfigurationNode {
    type: string;
    name: string;
    value: string | number | string[] | number[] | boolean;
    _comment: string;
    protected children: AeroflyConfigurationNode[];
    protected space: string;
    constructor(type: string, name: string, value?: string | number | string[] | number[] | boolean, _comment?: string);
    append(...nodes: AeroflyConfigurationNode[]): AeroflyConfigurationNode;
    appendChild(type: string, name: string, value?: string | number | string[] | number[] | boolean, _comment?: string): this;
    get valueAsString(): string;
    toString(indent?: number): string;
    protected aeroflyEscape(text: string): string;
    toXmlString(indent?: number): string;
    protected xmlEscape(text: string): string;
}
export declare class AeroflyConfigurationNodeSpacer extends AeroflyConfigurationNode {
    protected space: string;
}
export declare class AeroflyConfigurationNodeComment extends AeroflyConfigurationNode {
    toString(indent?: number): string;
    toXmlString(indent?: number): string;
}
//# sourceMappingURL=AeroflyConfigurationNode.d.ts.map