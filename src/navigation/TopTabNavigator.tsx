import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Movies from "../screens/Movies";
import SearchResults from "../screens/SearchResults";
import TVShows from "../screens/TVShows";

const TopTabNavigator = () => {

	const TopTab = createMaterialTopTabNavigator();

	return (
		<TopTab.Navigator
			screenOptions={{
				tabBarScrollEnabled: false,
				tabBarItemStyle: { flex: 1 },
			}}>
			<TopTab.Screen name="Movie" component={Movies} />
			<TopTab.Screen name="Search Results" component={SearchResults} />
			<TopTab.Screen name="TV Shows" component={TVShows} />
		</TopTab.Navigator>
	);
}

export default TopTabNavigator;