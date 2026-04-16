import type { CSSProperties } from 'react';
import type { ExtraCN, UtilCN } from "../lib/bem";

export interface IComponent {
    extraCN?: ExtraCN;
    utilCN?: UtilCN;
    extraAttrs?: Record<string, string>;
    style?: CSSProperties;
}
