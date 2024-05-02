"use strict";
module.exports = {
    preset: '@shelf/jest-mongodb',
    testEnvironment: 'node',
    // setupFilesAfterEnv: ['./jest.setup.js'], 
    testPathIgnorePatterns: [
        '/node_modules/',
        //   '/path/to/your/tests/__utils__/', // Optional: Ignore utility functions or setup files
    ],
    // Add any other Jest configuration options as needed
};
//# sourceMappingURL=jest.config.js.map