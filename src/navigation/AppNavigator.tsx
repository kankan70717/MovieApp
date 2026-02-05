import { NavigationContainer } from "@react-navigation/native";
import TopTabNavigator from "./TopTabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetails from "../components/MediaDetails";
import { Text, TouchableOpacity } from "react-native";
import FontAwesome from "@react-native-vector-icons/fontawesome";

const AppNavigator = () => {

	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Movies App"
					component={TopTabNavigator}
					options={{
						headerShadowVisible: false,
						headerStyle: {
							backgroundColor: '#2c3e50',
						},
						headerTintColor: '#fff',
					}} />
				<Stack.Screen
					name="Details"
					component={MovieDetails}
					options={({ navigation }) => ({
						headerTitle:'',
						headerLeft: () => (
							<TouchableOpacity
								style={{
									flexDirection: 'row',
									alignItems: 'center',
								}}>
								<FontAwesome name="chevron-left" size={18} color="black" />
								<Text
									onPress={() => navigation.goBack()}
									style={{
										marginLeft: 5,
										fontSize: 16
									}}>
									Back to List
								</Text>
							</TouchableOpacity>
						),
					})} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default AppNavigator;