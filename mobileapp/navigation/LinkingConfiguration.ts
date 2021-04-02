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
          SignIn: {
            screens: {
              SignInScreen: "two",
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
