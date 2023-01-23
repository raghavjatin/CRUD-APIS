module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageThreshold: {
    global: {
      statements: 80,
      functions: 80,
      branches: 75,
      lines: 85,
    },
  },
  testMatch: ["**/*.test.ts"],
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@src/(.*)$": "<rootDir>/src/$1",
    "@api/(.*)$": "<rootDir>/src/api/$1",
    "@config/(.*)$": "<rootDir>/src/config/$1",
    "@database/(.*)$": "<rootDir>/src/database/$1",
    "@middleware/(.*)$": "<rootDir>/src/middleware/$1",
    "@service/(.*)$": "<rootDir>/src/service/$1",
    "@type/(.*)$": "<rootDir>/src/type/$1",
    "@util/(.*)$": "<rootDir>/src/util/$1",
  },
};
