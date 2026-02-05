import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getMovieDetails } from "../api/movies";
import { useNavigation } from "@react-navigation/native";
import { getTVShowDetails } from "../api/tv";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Details: { id: string; mediaType: 'movie' | 'tv' };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const MediaDetails = ({ route }: Props) => {
	const { id, mediaType } = route.params;
	const navigation = useNavigation();
	const [movieDetails, setMovieDetails] = useState(null);

	useEffect(() => {

		const fetchMovieDetails = async () => {
			try {
				const details = mediaType === "movie"
					? await getMovieDetails(id)
					: await getTVShowDetails(id);
				setMovieDetails(details);
				navigation.setOptions({ headerTitle: details.title ?? details.name });
			} catch (err) {
				console.error('API Error:', err);
			}
		};

		fetchMovieDetails();
	}, [id, mediaType, navigation]);

	if (!movieDetails) {
		return (
			<View style={styles.centeredView}>
				<ActivityIndicator size="large" color="#2c3e50" />
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.mainContainer}>
				<Text style={styles.title}>{movieDetails.title ?? movieDetails.name}</Text>
				<Image
					source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}
					style={styles.poster}
				/>
				<View style={styles.infoContainer}>
					<Text style={styles.overview}>Overview: {movieDetails.overview}</Text>
					<View style={styles.infoBox}>
						<Text style={styles.details}>Popularity: {movieDetails.popularity}</Text>
						<Text style={styles.details}> | </Text>
						<Text style={styles.details}>Release Date: {movieDetails.release_date}</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
	},
	mainContainer: {
		alignItems: 'center',
		padding: 20,
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	poster: {
		width: '70%',
		aspectRatio: 1,
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 50,
	},
	overview: {
		color: '#666',
		fontSize: 16,
		marginBottom: 20,
	},
	infoContainer: {
		paddingHorizontal: 20,
	},
	infoBox: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingTop: 15,
	},
	details: {
		fontSize: 14,
		color: '#666',
		marginBottom: 5,
	}
});
export default MediaDetails;