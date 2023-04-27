/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '\\.(json)$': 'fire-finance/__mocks__/jsonMock.json',
    }
  };