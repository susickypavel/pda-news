import type { InputProps } from "@rneui/base";
import { Input } from "@rneui/themed";
import React, { forwardRef } from "react";
import type { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

type TextFieldProps = Omit<InputProps, "ref">;

export const TextField = forwardRef<any, TextFieldProps>(({ onFocus, onBlur, ...props }, ref) => {
	const [isFocused, setIsFocused] = React.useState<boolean>(false);

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

	return <Input ref={ref} onFocus={handleOnFocus} onBlur={handleOnBlur} {...props} />;
});

TextField.displayName = "TextField";
