interface IConfigurationBuilder {
    properties: Record<string, any>
    sources: IConfigurationSource[]
    add: (...source: IConfigurationSource[]) => IConfigurationBuilder
    build: () => Record<string, any>
}

interface IConfigurationSource {
    process: () => Record<string, any>
}

export { IConfigurationBuilder, IConfigurationSource }
