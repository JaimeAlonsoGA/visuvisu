require("react-native-gesture-handler/jestSetup");
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("react-native-worklets", () => require("react-native-worklets/src/mock"));
jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));
jest.mock("@expo/vector-icons", () => {
  const { Text } = require("react-native");
  const Icon = ({ name }) => require("react").createElement(Text, null, name);
  return new Proxy({}, { get: () => Icon });
});
