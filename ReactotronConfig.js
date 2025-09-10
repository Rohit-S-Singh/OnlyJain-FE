import Reactotron, { networking } from "reactotron-react-native";
// import { reactotronRedux } from "reactotron-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { name as appName } from "./app.json";

Reactotron.configure({ name: appName })
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative({
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
  })
  //   .use(reactotronRedux())
  .connect();

//  patch console.log to send log to reactotron
const yeOldeConsoleLog = console.log;
console.log = (...args) => {
  yeOldeConsoleLog(...args);
  Reactotron.display({
    name: "CONSOLE.LOG",
    value: args,
    preview: args.length > 0 && typeof args[0] === "string" ? args[0] : null,
  });
};

export default Reactotron;
