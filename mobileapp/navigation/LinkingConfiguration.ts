import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      LogInRegister: {
        screens: {
          Register: {
            screens: {
              RegisterScreen: "one",
            },
          },
          LogIn: {
            screens: {
              LogInScreen: "two",
            },
          },
        },
      },
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: "one",
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: "two",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
