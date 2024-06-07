module.exports = async () => {
    return {
        rootDir: "./",
        verbose: true,
        transform: {
            "^.+\\.js?$": "babel-jest",
        },
        transformIgnorePatterns: ["node_modules/(?!(sc-base-database|sc-common|sc-game-base|sc-base-apis|sc-api-client|sc-game-management-client|crypto-random-string|nanoid)/)"],
        testEnvironment: "node",
        testResultsProcessor: "jest-sonar-reporter",
        setupFilesAfterEnv: ["jest-extended/all"],
    };
};
