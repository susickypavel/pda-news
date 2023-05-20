import { InputProps, Text } from "@rneui/base";
import { Icon, Input, useTheme } from "@rneui/themed";
import React, { forwardRef } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData, View } from "react-native";
import { StyleSheet } from "react-native";

type TextFieldProps = Omit<InputProps, "ref" | "rightIcon" | "leftIcon"> & {
	leftIcon?: string;
	rightIcon?: string;
	rightIconOnPress?: () => void;
};

export const TextField = forwardRef<any, TextFieldProps>(
	({ onFocus, onBlur, rightIcon, rightIconOnPress, leftIcon, ...props }, ref) => {
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

		const styles = StyleSheet.create({
			errorMessage: {
				color: theme.colors.error,
				fontFamily: "InterTightSemiBold",
				position: "absolute",
				right: 0,
				top: 0
			},
			errorStyle: {
				display: "none"
			},
			label: {
				color: theme.colors.black
			}
		});

		return (
			<View>
				<Input
					inputContainerStyle={{
						borderBottomColor: isFocused
							? theme.colors.primary
							: props.errorMessage
							? theme.colors.error
							: undefined
					}}
					errorStyle={styles.errorStyle}
					labelStyle={styles.label}
					ref={ref}
					onFocus={handleOnFocus}
					onBlur={handleOnBlur}
					selectionColor={theme.colors.primary}
					leftIcon={leftIcon ? <Icon name={leftIcon} size={24} color={theme.colors.black} /> : undefined}
					rightIcon={
						props.errorMessage ? (
							<Icon
								onPress={rightIconOnPress}
								size={24}
								name={rightIcon ?? "error"}
								color={theme.colors.error}
							/>
						) : rightIcon ? (
							<Icon onPress={rightIconOnPress} size={24} name={rightIcon} color={theme.colors.black} />
						) : undefined
					}
					{...props}
				/>
				<Text style={styles.errorMessage}>{props.errorMessage}</Text>
			</View>
		);
	}
);

TextField.displayName = "TextField";
