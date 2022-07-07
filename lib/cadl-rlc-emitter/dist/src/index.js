import { buildClientDefinitions } from "@azure-tools/rlc-codegen";
import { getAllRoutes } from "@cadl-lang/rest/http";
import { dirname } from "path";
export async function $onEmit(program) {
    const [routes, _diagnostics] = getAllRoutes(program);
    const paths = {};
    for (const route of routes) {
        paths[route.path] = {
            name: route.operation.name,
            pathParameters: route.parameters.parameters.filter(p => p.type === "path").map(p => {
                return {
                    name: p.name,
                    type: "string",
                    description: "param"
                };
            }),
            methods: {
                [route.verb]: [
                    {
                        description: "Foo",
                        hasOptionalOptions: route.parameters.parameters.some(p => p.param.optional),
                        optionsName: "options",
                        responseTypes: { success: ["string"], error: [] },
                        returnType: "",
                        successStatus: ["200"],
                    },
                ],
            },
        };
    }
    const clientDefinitionsFile = buildClientDefinitions({ paths, libraryName: "Foo", srcPath: "src" }, {
        clientImports: new Set(),
        importedParameters: new Set(),
        importedResponses: new Set(),
    });
    await emitFile(clientDefinitionsFile.path, clientDefinitionsFile.content, program.host);
}
async function emitFile(path, content, host) {
    await host.mkdirp(dirname(path));
    await host.writeFile(path, content);
}
//# sourceMappingURL=index.js.map