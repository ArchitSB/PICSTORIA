module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.js'],
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    testTimeout: 10000,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/config/',
        '/coverage/'
    ]
};