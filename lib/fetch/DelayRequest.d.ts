/**
 * This is a really bad plugin that delays all requests by 5 seconds. You probably don't want to use it in any real
 * system. It is here to give you an example of what you can do with a fetch plugin.
 *
 * For more options see https://github.com/formio/formio.js/wiki/Fetch-Plugin-API
 */
declare const _default: {
    priority: number;
    preRequest: (requestArgs: any) => Promise<unknown>;
};
export default _default;
