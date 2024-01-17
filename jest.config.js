module.exports = {
  transform: {
    "^.+\\.(t|j)s?$": "@swc/jest"
  },
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/src/utils"],
  testPathIgnorePatterns: ['./node_modules/'],
  moduleNameMapper: {
    '@entities/(.*)': '<rootDir>/app/src/database/entities/$1',
    '@repositories/(.*)': '<rootDir>/app/src/database/repositories/$1',
    '@main': '<rootDir>/app/src/index.ts',
    '@factories/(.*)': '<rootDir>/app/src/database/factories/$1'
  }
};
