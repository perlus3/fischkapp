export default {
    bail: 1,
    verbose: true,
    preset: "ts-jest",
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(css|module\\.css)$": "identity-obj-proxy",
        "\\.svg$": "svg-jest",
    },
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
        "\\.svg$": "svg-jest",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-stub"
    },
};
