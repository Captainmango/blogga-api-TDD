/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ["<rootDir>/src/utils"],
  testPathIgnorePatterns: ['./node_modules/'],
  moduleNameMapper: {
    '@entities/(.*)': '<rootDir>/app/src/database/entities/$1',
    '@repositories/(.*)': '<rootDir>/app/src/database/repositories/$1',
    
  }
};
