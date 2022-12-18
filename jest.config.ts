export default {
   setupFilesAfterEnv: ['<rootDir>/src/setupTest.ts'],
   modulePaths: ['node_modules', '<rootDir>/src'],
   moduleNameMapper: {
      '^!raw-loader!.*': 'jest-raw-loader',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
         '<rootDir>/src/utils/test/assetsTransformer.js',
   },
   coveragePathIgnorePatterns: ['style.tsx'],
};
