export function buildMethodDefinitions(methods, pathParams = []) {
    const methodDefinitions = [];
    for (const key of Object.keys(methods)) {
        const method = methods[key];
        const description = methods[key][0].description;
        let areAllOptional = methods[key][0].hasOptionalOptions;
        methodDefinitions.push({
            name: key,
            ...(description && { docs: [{ description }] }),
            parameters: [
                ...getPathParamDefinitions(pathParams),
                {
                    name: "options",
                    hasQuestionToken: areAllOptional,
                    type: method.map(m => m.optionsName).join(" | ")
                }
            ],
            returnType: method.map(m => m.returnType).join(" | ")
        });
    }
    return methodDefinitions;
}
export function getPathParamDefinitions(pathParams) {
    return pathParams.map(({ name, type, description }) => {
        return {
            name,
            type,
            description
        };
    });
}
