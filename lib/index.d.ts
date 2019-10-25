declare const _default: {
    components: {
        checkmatrix: typeof import("./components/CheckMatrix/CheckMatrix").default;
    };
    fetch: {
        DelayRequest: {
            priority: number;
            preRequest: (requestArgs: any) => Promise<unknown>;
        };
    };
    providers: {
        auth: {};
        storage: {
            Test: typeof import("./providers/storage/Test").default;
        };
    };
    templates: {
        bootstrap: {
            checkmatrix: {
                form: string;
            };
        };
        bootstrap3: {};
        semantic: {};
    };
};
export default _default;
