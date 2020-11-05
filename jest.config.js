module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "ojs/ojarraydataprovider":
      "./node_modules/@oracle/oraclejet/dist/js/libs/oj/min/ojarraydataprovider.js",
  },
  modulePaths: ["node_modules/@oracle"],
};
