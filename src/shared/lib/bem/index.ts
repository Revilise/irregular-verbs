export type ExtraCN = Record<string, boolean>;

export type UtilCN = (string | boolean)[];

export function useBEM(baseClass: string) {
    return {
        bem(blockCN: string, extraCN: ExtraCN = {}, utilCN: UtilCN = []) {
            const className = [];
            const base = !blockCN ? baseClass : `${baseClass}__${blockCN}`;
            className.push(base);

            if (Object.keys(extraCN).length > 0) {
                for (const key in extraCN) {
                    if (extraCN[key]) {
                        className.push(`${base}--${key}`);
                    }
                }
            }

            if (typeof utilCN === 'string' && utilCN) {
                className.push(utilCN);
            } else if (Array.isArray(utilCN)) {
                for (const i in utilCN) {
                    const cn = utilCN[i];

                    if (cn) {
                        className.push(cn);
                    }
                }
            }

            return className.join(' ');
        },
    };
}
