module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^bcrypt$': '<rootDir>/__mocks__/bcrypt.ts',
    '^@laundry/shared$': 'C:/Users/KIMISH/Desktop/cleanest/packages/shared/src',
  },
};