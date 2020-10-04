/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { Button } from "react-native-paper";
import { LoginForm } from "./components/LoginForm/LoginForm";

import {
  useQuery,
  useMutation,
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";

import * as api from "./util/api";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";

const App: () => React$Node = () => {
  const cache = useQueryCache();

  const [init, setInit] = useState(true);
  const [user, setUser] = useState();

  // const { isLoading, error, data } = useQuery("user", api.getUser(user.email));
  
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (init) setInit(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out."));
  };

  if (init) return null;
  // if user is null then it's assumed that they're logged out
  if (!user) {
    return <LoginForm />;
  }
  // otherwise the user is logged in and can see the home screen
  return (
    <View>
      <Text>Welcome, {user.email}.</Text>
      <Button
        mode="contained"
        color="#4B8AC6"
        uppercase={false}
        onPress={() => logout()}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});

export default App;

{
  /* <>
    //   <StatusBar barStyle="dark-content" />
    //   <SafeAreaView>
    //     <ScrollView */
}
//       contentInsetAdjustmentBehavior="automatic"
//       style={styles.scrollView}
//     >
//       {global.HermesInternal == null ? null : (
//         <View style={styles.engine}>
//           <Text style={styles.footer}>Engine: Hermes</Text>
//         </View>
//       )}
//       <View style={styles.body}>
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Stepa One</Text>
//           <Button mode="contained" onPress={() => api.userList()}>
//             Get Users
//           </Button>
//           <Button mode="contained" onPress={() => console.log("test")}>
//             Login
//           </Button>
//         </View>
//       </View>
//     </ScrollView>
//   </SafeAreaView>
// </>
