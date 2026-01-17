import { NavigationContainer, ParamListBase, useLinkProps, useNavigation } from '@react-navigation/native';
import { Button, Text, TextInput, View } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = React.createContext();

function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => signOut()}>Sign out</Button>
    </View>
  );
}

function SignInScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={() => signIn({ email, password })}>Sign in</Button>
    </View>
  );
}

function SplashScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Splashscreen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'REFRESH_TOKEN':
          return {
            ...prevState,
            accessToken: action.accessToken,
            refreshToken: action.refreshToken,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            accessToken: action.accessToken,
            refreshToken: action.refreshToken,
            isSignOut: false,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            accessToken: null,
            refreshToken: null,
            isSignOut: true,
          };
      }
    }, {
      isLoading: true,
      isSignOut: false,
      accessToken: null,
      refreshToken: null,
      // add user Id in here to keep track of currently logged in user
    }
  );
  
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let accessToken;
      let refreshToken;
      
      try {
        accessToken = await SecureStore.getItemAsync('accessToken');
        refreshToken = await SecureStore.getItemAsync('refreshToken');
      } catch (e) {
        //error
      }
      // todo: axios to get refresh_token
      dispatch({ type: 'REFRESH_TOKEN', accessToken: accessToken, refreshToken: refreshToken });
    };
    
    bootstrapAsync();
  }, []);
  
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // todo: add axios post here for login
        console.log("signIn data", data);
        dispatch({ type: 'SIGN_IN', accessToken: 'access-token-test', refreshToken: 'refresh-token-test' });
      },
      signOut: () => {
        // todo: add axios post here for logout
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async (data) => {
        // todo: add axios post here for signup
        console.log("signUp data", data);
      },
    }),
    []
  )
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.accessToken == null ? (
            <Stack.Screen
              name="SignIn"
                component={SignInScreen}
                options={{
                  title: 'Sign In',
                  animationTypeForReplace: state.isSignOut ? 'pop' : 'push',
                }}
            />
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
          </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}