import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CategorySelector from "../components/CategorySelector";
import { CategoryOption } from "../type/categoryOption";
import { useState } from "react";
import { SEARCH_CATEGORIES } from "../constants/searchCategories";
import { search } from "../api/search";
import MediaCard from "../components/MediaCard";
import FontAwesome from "@react-native-vector-icons/fontawesome";

const SearchResults = () => {
	const [category, setCategory] = useState<CategoryOption>(SEARCH_CATEGORIES[0]);
	const [results, setResults] = useState<null | any[]>(null);
	const [keyword, setKeyword] = useState("");
	const [showMore, setShowMore] = useState<boolean>(false);

	const buttonHandler = async () => {
		try {
			const data = await search({ type: category.value, keyword: keyword });
			setResults(data);
			setShowMore(false);
			console.log('Search results:', data[3]);
		} catch (err) {
			console.error('API Error:', err);
		}
	};

	const displayedResults = showMore ? results : results?.slice(0, 10);

	return (
		<View>
			<ScrollView>
				<View style={styles.container}>
					<Text style={styles.label}>Search Movie/TV Show Name<Text style={{ color: 'red' }}> *</Text></Text>
					<View style={styles.inputWrapper}>
						<FontAwesome name="search" size={20} color="#666" style={styles.icon} />
						<TextInput
							style={styles.input}
							placeholder="ex : James Bond"
							placeholderTextColor="#999"
							value={keyword}
							onChangeText={setKeyword}
						/>
					</View>
				</View>

				<View style={styles.container}>
					<Text style={styles.label}>Choose Search Type<Text style={{ color: 'red' }}> *</Text></Text>
					<View style={styles.typeWrapper}>
						<CategorySelector
							value={category}
							onChange={setCategory}
							options={SEARCH_CATEGORIES} />
						<TouchableOpacity onPress={buttonHandler}>
							<View style={styles.searchButton}>
								<FontAwesome name="search" size={20} color="white" style={styles.icon} />
								<Text style={styles.searchButtonText}>Search</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>

				<View>
					{results && results.length > 0 ? (
						<View>
							{
							displayedResults?.map((item) => (
								<MediaCard key={item.id} data={item} />
							))
						}

						{
							!showMore && results.length > 10 && (
								<TouchableOpacity
									style={styles.button}
									onPress={() => setShowMore(true)}
								>
									<Text style={styles.buttonText}>Show More</Text>
								</TouchableOpacity>
							)
						}
						</View>
					) : (
						<Text style={styles.initialSearchResultText}>Please initiate a search.</Text>
					)}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 5,
		marginHorizontal: 32,
	},
	label: {
		fontSize: 16,
		marginTop: 16,
		marginBottom: 8,
		color: '#333',
	},
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#ddd',

		paddingHorizontal: 12,
	},
	typeWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	icon: {
		marginRight: 8,
	},
	input: {
		flex: 1,
		height: 40,
		fontSize: 16,
		color: '#333',
	},
	searchButton: {
		flexDirection: 'row',
		backgroundColor: '#00d1f6',
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: 'center',
		marginLeft: 10,
	},
	searchButtonText: {
		color: 'white',
		fontSize: 16,
		marginLeft: 8,
	},
	initialSearchResultText: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 20,
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
});

export default SearchResults;