import { ButtonGroup, Text, useTheme } from "@rneui/themed";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { View } from "react-native";

interface HistoryPickerProps {
	onChange: Dispatch<SetStateAction<Date>>;
}

const HISTORY_LENGTH = 7;

export const HistoryPicker: React.FC<HistoryPickerProps> = ({ onChange }) => {
	const { theme } = useTheme();
	const [selectedIndex, setSelectedIndex] = useState(0);

	const buttons = useMemo(() => {
		return Array.from({ length: HISTORY_LENGTH }, (_, i) => {
			const date = new Date();

			date.setDate(date.getDate() - i);

			const dayName = new Intl.DateTimeFormat("en-US", {
				weekday: "short"
			}).format(date);

			return {
				element: (props: { isSelected: boolean }) => {
					const selectedTextStyle = {
						color: props.isSelected ? "#fff" : theme.colors.black
					};

					return (
						<View
							style={{
								flex: 1,
								height: "auto",
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<Text style={selectedTextStyle}>{date.getDate()}</Text>
							<Text style={selectedTextStyle}>{dayName}</Text>
						</View>
					);
				}
			};
		});
	}, [theme.colors.black]);

	return (
		<ButtonGroup
			selectedButtonStyle={{
				backgroundColor: theme.colors.brand,
				borderRadius: 4
			}}
			buttonContainerStyle={{
				flex: 1
			}}
			innerBorderStyle={{
				width: 0
			}}
			containerStyle={{
				backgroundColor: undefined,
				borderRadius: 0,
				borderWidth: 0,
				flexDirection: "row-reverse",
				marginLeft: 0,
				marginRight: 0,
				marginTop: 0,
				marginBottom: 8,
				height: 48
			}}
			onPress={value => {
				setSelectedIndex(value);
				onChange(() => {
					const date = new Date();

					date.setDate(date.getDate() - value);
					date.setHours(0, 0, 0, 0);

					return date;
				});
			}}
			selectedIndex={selectedIndex}
			buttons={buttons}
		/>
	);
};
