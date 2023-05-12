import { InputProps, Text } from "@rneui/base";
import { Input, useTheme } from "@rneui/themed";
import React, { forwardRef } from "react";
import type { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { StyleSheet } from "react-native";

type TextFieldProps = Omit<InputProps, "ref">;

export const TextField = forwardRef<any, TextFieldProps>(({ onFocus, onBlur, ...props }, ref) => {
	const [isFocused, setIsFocused] = React.useState<boolean>(false);
	const { theme } = useTheme();

	const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setIsFocused(true);

		if (onFocus) {
			onFocus(e);
		}
	};

	const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setIsFocused(false);

		if (onBlur) {
			onBlur(e);
		}
	};

	return (
		<React.Fragment>
			<Input
				inputContainerStyle={{
					borderBottomColor: isFocused
						? theme.colors.primary
						: props.errorMessage
						? theme.colors.error
						: undefined
				}}
				errorStyle={{
					display: "none"
				}}
				ref={ref}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
				{...props}
			/>
			<Text style={styles.errorMessage}>{props.errorMessage}</Text>
		</React.Fragment>
	);
});

const styles = StyleSheet.create({
	errorMessage: {
		color: "#dc2626",
		fontFamily: "InterTightSemiBold",
		marginVertical: 8
	}
});

TextField.displayName = "TextField";
