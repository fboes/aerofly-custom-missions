/**
 * A regular data node for Aerofly configuration files.
 * As Aerofly uses a proprietary Markup language, this class is meant to create the required string representation.
 */
export declare class AeroflyConfigurationNode {
    type: string;
    name: string;
    value: string | number | string[] | number[] | boolean;
    _comment: string;
    children: AeroflyConfigurationNode[];
    childSeparatorString: string;
    constructor(type: string, name: string, value?: string | number | string[] | number[] | boolean, _comment?: string);
    append(...nodes: AeroflyConfigurationNode[]): AeroflyConfigurationNode;
    appendChild(type: string, name: string, value?: string | number | string[] | number[] | boolean, _comment?: string): this;
    get valueAsString(): string;
    toString(indent?: number): string;
    protected aeroflyEscape(text: string): string;
    toXmlString(indent?: number): string;
    protected xmlEscape(text: string): string;
}
/**
 * This behaves like a regular AeroflyConfigurationNode, but child nodes will be separated by an extra spacer comment. This increases optical separation for string export.
 */
export declare class AeroflyConfigurationNodeSpacer extends AeroflyConfigurationNode {
    childSeparatorString: string;
}
/**
 * Represents a disabled AeroflyConfigurationNode, this node will be commented out and will not be read by Aerofly.
 * This is meant for placeholder values not officially implemented yet. They can be quickly converted to regular nodes once implemented in Aerofly.
 */
export declare class AeroflyConfigurationNodeComment extends AeroflyConfigurationNode {
    toString(indent?: number): string;
    toXmlString(indent?: number): string;
}
//# sourceMappingURL=AeroflyConfigurationNode.d.ts.map