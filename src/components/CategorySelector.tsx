import { Text, TouchableOpacity, View } from "react-native";
import { CategoryOption } from "../type/categoryOption";
import { useState } from "react";
import { BottomSheet, ListItem } from "@rneui/themed";
import FontAwesome from "@react-native-vector-icons/fontawesome";

type CategorySelectorProps = {
	value: CategoryOption;
	onChange: (value: CategoryOption) => void;
	options: CategoryOption[];
}

const CategorySelector = (
	{
		value,
		onChange,
		options
	}: CategorySelectorProps
) => {
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	return (
		<View style={{ flex: 1 }}>
			<View>
				<TouchableOpacity
					onPress={() => setIsSheetOpen(true)}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: 12,
						backgroundColor: '#f9f9f9',
						borderRadius: 8,
						borderWidth: 1,
						borderColor: '#ddd',
						marginVertical: 10,
					}}>
					<Text style={{ fontSize: 16, color: '#333' }}>
						{value.label}
					</Text>
					<FontAwesome name="chevron-down" size={16} color="#333" />
				</TouchableOpacity>
			</View>

			<BottomSheet
				isVisible={isSheetOpen}
				onBackdropPress={() => setIsSheetOpen(false)}
				containerStyle={{ marginBottom: -34 }}
			>
				<View style={{ backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
					{
						options.map((option) => (
							<ListItem
								key={option.value}
								onPress={() => {
									onChange(option);
									setIsSheetOpen(false);
								}}
								containerStyle={{
									backgroundColor: value.value === option.value ? '#006925' : 'white',
									borderRadius: 8,
								}}>
								<ListItem.Content style={{
									flexDirection: 'row',
									justifyContent: 'flex-start',
									alignItems: 'center',
									paddingHorizontal: 20,
									borderRadius: 8
								}}>
									<ListItem.Title style={{ color: value.value === option.value ? 'white' : 'black' }}>
										{option.label}
									</ListItem.Title>
									<FontAwesome
										name="check"
										size={16}
										color={value.value === option.value ? 'white' : 'transparent'}
										style={{ marginLeft: 10, opacity: value.value === option.value ? 1 : 0 }} />
								</ListItem.Content>
							</ListItem>
						))
					}
				</View>
			</BottomSheet>
		</View>
	);
}

export default CategorySelector;