import type { CSSProperties } from 'react';
import type { ExtraCN, UtilCN } from "@shared/lib/bem";

export interface IComponent {
    extraCN?: ExtraCN;
    utilCN?: UtilCN;
    extraAttrs?: Record<string, string>;
    style?: CSSProperties;
}
