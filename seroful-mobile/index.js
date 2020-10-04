/**
 * @format
 */

import * as React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import {
  useQuery,
  useMutation,
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";
import { name as appName } from "./app.json";
// wrap provider outside of paper for state management if needed
// e.g. <store><paper<app>
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
  // custom themes go here
};

const queryCache = new QueryCache();

export default function Main() {
  return (
    <PaperProvider>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <App />
      </ReactQueryCacheProvider>
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
