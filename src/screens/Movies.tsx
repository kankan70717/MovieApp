import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getMovieList } from "../api/movies";
import { useEffect, useState } from "react";
import { MOVIE_CATEGORIES } from "../constants/movieCategories";
import CategorySelector from "../components/CategorySelector";
import { CategoryOption } from "../type/categoryOption";
import MediaCard from "../components/MediaCard";

const Movies = () => {
	const [category, setCategory] = useState<CategoryOption>(MOVIE_CATEGORIES[0]);
	const [movies, setMovies] = useState<any[]>([]);
	const [showMore, setShowMore] = useState<boolean>(false);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const data = await getMovieList(category.value);
				setMovies(data);
				setShowMore(false);
			} catch (err) {
				console.error('API Error:', err);
			}
		};

		fetchMovies();
	}, [category]);

	const displayedMovies = showMore ? movies : movies.slice(0, 10);

	return (
		<ScrollView>
			<View style={styles.container}>
				<CategorySelector
					value={category}
					onChange={setCategory}
					options={MOVIE_CATEGORIES} />
			</View>
			<View>
				{movies && movies.length > 0 ? (
					<>
						{
							displayedMovies.map((item) => (
								<MediaCard key={item.id} data={item} />
							))
						}

						{
							!showMore && movies.length > 10 && (
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
		marginVertical: 20,
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
		marginTop: 50,
	},
});

export default Movies;