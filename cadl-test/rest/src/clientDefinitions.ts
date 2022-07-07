import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface create {
    /** Foo */
    post(options: options);
}

export interface read {
    /** Foo */
    get(options: options);
}

export interface customGet {
    /** Foo */
    get(options: options);
}

export interface Routes {
    /** Resource for '/' has methods for the following verbs: post */
    (path: "/"): create;
    /** Resource for '/widgets/\{id\}' has methods for the following verbs: get */
    (path: "/widgets/{id}", id: string): read;
    /** Resource for '/customGet' has methods for the following verbs: get */
    (path: "/customGet"): customGet;
}

export type FooClient = Client & {
        path: Routes;
    };
