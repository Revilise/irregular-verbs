export type BemFc = (blockCN: string, options: Omit<bemOptions, 'baseCN'>) => string;

export type bemOptions = {
    baseCN: string;
    extraCN?: Record<string, boolean>;
    utilCN?: Array<string>;
};
