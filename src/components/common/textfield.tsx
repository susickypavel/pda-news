import type { InputProps } from "@rneui/base";
import { Input, useTheme } from "@rneui/themed";
import React, { forwardRef } from "react";
import type { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

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
		<Input
			inputContainerStyle={{
				marginBottom: 16,
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
	);
});

TextField.displayName = "TextField";
