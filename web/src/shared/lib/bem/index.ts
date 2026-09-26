export type ExtraCN = Record<string, boolean>;

export type UtilCN = (string | boolean)[];

export function useBEM(baseClass: string) {
  return {
    bem(blockCN: string, extraCN: ExtraCN = {}, utilCN: UtilCN = []) {
      const base = blockCN ? `${baseClass}__${blockCN}` : baseClass;

      const modifiers = Object.entries(extraCN)
        .filter(([, enabled]) => enabled)
        .map(([modifier]) => `${base}--${modifier}`);

      const utilities = Array.isArray(utilCN) ? utilCN : [utilCN];

      return [base, ...modifiers, ...utilities].filter(Boolean).join(" ");
    },
  };
}
