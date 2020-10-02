/**
 * @format
 */
import * as React from "react";
import {AppRegistry} from 'react-native';
import App from './App';
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import {name as appName} from './app.json';
// wrap provider outside of paper for state management if needed
// e.g. <store><paper<app>
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    }
    // custom themes go here
}
export default function Main() {
    return (
        <PaperProvider>
            <App />
        </PaperProvider>
    )
}
AppRegistry.registerComponent(appName, () => Main);
