import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { Image, StyleSheet, Text, View } from "react-native";

const MediaCard = (
	{
		data
	}
) => {

	const navigation = useNavigation();

	return (
		<View key={data.id} style={styles.cardWrapper}>
			<View style={styles.cardContainer}>
				<View style={styles.imgContainer}>
					<Image
						source={{
							uri: data.poster_path
								? `https://image.tmdb.org/t/p/w500${data.poster_path}`
								: data.profile_path
									? `https://image.tmdb.org/t/p/w500${data.profile_path}`
									: data.known_for?.[0]?.poster_path
										? `https://image.tmdb.org/t/p/w500${data.known_for[0].poster_path}`
										: 'https://via.placeholder.com/500x750?text=No+Image'
						}}
						style={styles.cardImage} />
				</View>
				<View style={styles.cardContent}>
					<Text style={styles.cardTitle}>{data.title ?? data.name}</Text>
					<Text style={styles.details}>Popularity: {data.popularity}</Text>
					<Text style={styles.details}>Release Date: {data.release_date ?? data.known_for?.[0]?.release_date}</Text>
					<Button title="More Details" style={styles.button} onPress={() => { navigation.navigate("Details", { id: data.id, mediaType: data.title ? "movie" : "tv" }) }} />
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardWrapper: {
		padding: 10,
		borderBottomColor: '#ddd',
		borderBottomWidth: 1,
	},
	cardContainer: {
		flexDirection: 'row',
	},
	imgContainer: {
		flex: 1,
	},
	cardImage: {
		width: '100%',
		aspectRatio: 1,
	},
	cardContent: {
		flex: 2,
		padding: 10,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	details: {
		fontSize: 14,
		color: '#666',
	},
	button: {
		marginTop: 10,
		borderRadius: 10,
	},
});

export default MediaCard;