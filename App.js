import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/pages/Home';
import Detail from './src/pages/Detail';
import Logo from './src/components/Logo';
import WebPage from './src/pages/WebPage';
import * as Easing from "react-native";
import * as Animated from "react-native";

const AppNavigator = createStackNavigator(
  {
    Home,
    Detail,
    WebPage,
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

          const inputRange = [index - 1, index, index + 1];
          const opacity = position.interpolate({
            inputRange,
            outputRange: [0, 1, 1],
          });

          const scaleY = position.interpolate({
            inputRange,
            outputRange: ([0, 1, 1]),
          });

          return {
            opacity,
            transform: [
              { scaleY }
            ]
          };

        // const height = layout.initHeight;
        // const translateY = position.interpolate({
        //   inputRange: [index - 1, index, index + 1],
        //   outputRange: [height, 0, 0],
        // });
        //
        // const opacity = position.interpolate({
        //   inputRange: [index - 1, index - 0.99, index],
        //   outputRange: [0, 1, 1],
        // });
        //
        // return {
        //   opacity,
        //   transform: [{ translateY }]
        // };
      },
    }),
    defaultNavigationOptions: {
      headerTitle: () => <Logo />,
      headerStyle: {
        borderBottomWidth: 0,
      },
      headerTintColor: '#e71a24',
    },
    headerLayoutPreset: 'center',
    headerBackTitleVisible: false,
  },
);

export default createAppContainer(AppNavigator);
