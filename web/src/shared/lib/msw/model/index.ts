export const initClientMsw = async (): Promise<void> => {
    if (import.meta.env.MODE === 'development') {
        const { worker } = await import("./worker.ts");
        await worker.start({ onUnhandledRequest: "bypass" });
    }
}
