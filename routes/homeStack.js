import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../components/Login";
import Register from "../components/Register";

import ForgetPassword from "../components/ForgetPassword";
const screens = {
    Login: {
        screen: Login,


    },
    ForgetPassword: {
        screen: ForgetPassword,
        navigationOptions: {
            headerLeft: () => null
        }
    },

    Register: {
        screen: Register,
        navigationOptions: {
            headerLeft: () => null
        }

    },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);