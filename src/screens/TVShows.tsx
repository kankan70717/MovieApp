import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getTVShows } from "../api/tv";
import MediaCard from "../components/MediaCard";
import CategorySelector from "../components/CategorySelector";
import { CategoryOption } from "../type/categoryOption";
import { TV_CATEGORIES } from "../constants/TVCategories";

const TVShows = () => {
	const [category, setCategory] = useState<CategoryOption>(TV_CATEGORIES[0]);
	const [tvShows, setTvShows] = useState<any[]>([]);
	const [showMore, setShowMore] = useState<boolean>(false);

	useEffect(() => {
		const fetchTvShows = async () => {
			try {
				const data = await getTVShows(category.value);
				setTvShows(data);
				setShowMore(false);
			} catch (err) {
				console.error('API Error:', err);
			}
		};

		fetchTvShows();
	}, [category]);

	const displayedTvShows = showMore ? tvShows : tvShows.slice(0, 10);

	return (
		<ScrollView>
			<View style={styles.container}>
				<CategorySelector
					value={category}
					onChange={setCategory}
					options={TV_CATEGORIES} />
			</View>
			<View>
				{tvShows && tvShows.length > 0 ? (
					<>
						{
							displayedTvShows.map((item) => (
								<MediaCard key={item.id} data={item} />
							))
						}

						{
							!showMore && tvShows.length > 10 && (
								<TouchableOpacity
									style={styles.button}
									onPress={() => setShowMore(true)}
								>
									<Text style={styles.buttonText}>Show More</Text>
								</TouchableOpacity>
							)
						}
					</>
				) : (
					<View style={styles.center}>
						<ActivityIndicator />
						<Text>Loading results...</Text>
					</View>
				)}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		marginHorizontal: 32,
	},
	button: {
		backgroundColor: '#3498db',
		padding: 10,
		marginVertical: 15,
		marginHorizontal: 100,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default TVShows;