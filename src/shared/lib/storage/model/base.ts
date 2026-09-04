export class BaseStorage {
    static get(name: string) {
        throw new Error("Method not implemented. " + name);
    }

    static set(name: string, value: unknown, options?: unknown) {
        throw new Error("Method not implemented. " + { name, value, options }.toString());
    }
}
