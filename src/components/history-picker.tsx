import { ButtonGroup } from "@rneui/themed";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";

interface HistoryPickerProps {
	onChange: Dispatch<SetStateAction<Date>>;
}

const HISTORY_LENGTH = 7;

export const HistoryPicker: React.FC<HistoryPickerProps> = ({ onChange }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const buttons = useMemo(() => {
		return Array.from({ length: HISTORY_LENGTH }, (_, i) => {
			const date = new Date();

			date.setDate(date.getDate() - i);

			const dayName = new Intl.DateTimeFormat("en-US", {
				weekday: "short"
			}).format(date);

			return ` ${dayName}`;
		});
	}, []);

	return (
		<ButtonGroup
			containerStyle={{
				flexDirection: "row-reverse"
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

HistoryPicker.displayName = "HistoryPicker";
