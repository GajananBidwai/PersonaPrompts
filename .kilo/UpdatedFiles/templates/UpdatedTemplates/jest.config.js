export default {
  testEnvironment: 'jsdom',
  transform: { '^.+\\.(ts|tsx)$': 'babel-jest' },
  moduleNameMapper: { '\\.(css)$': 'identity-obj-proxy' }
};