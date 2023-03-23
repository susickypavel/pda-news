import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Icon } from "@rneui/themed";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet } from "react-native";
import { z } from "zod";

import { supabase } from "@/api/supabase";

import { TextField } from "./common/textfield";

const LOGIN_SCHEMA = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().nonempty("Required")
});

type LoginFormData = z.infer<typeof LOGIN_SCHEMA>;

async function onSubmit(data: LoginFormData) {
	const response = await supabase.auth.signInWithPassword({
		email: data.email,
		password: data.password
	});

	if (response.error) {
		Alert.alert("Oops", response.error.message);
	}
}

export const SignInForm: React.FC = () => {
	const {
		control,
		handleSubmit,
		setFocus,
		formState: { isSubmitting }
	} = useForm<LoginFormData>({
		resolver: zodResolver(LOGIN_SCHEMA)
	});

	return (
		<React.Fragment>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
					<TextField
						blurOnSubmit={false}
						disabled={isSubmitting}
						ref={ref}
						returnKeyType="next"
						onSubmitEditing={() => setFocus("password")}
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						autoCapitalize="none"
						keyboardType="email-address"
						textContentType="emailAddress"
						caretHidden={false}
						errorMessage={fieldState.error?.message}
						label="Email"
					/>
				)}
				name="email"
			/>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
					<TextField
						blurOnSubmit={false}
						disabled={isSubmitting}
						ref={ref}
						returnKeyType="done"
						value={value}
						secureTextEntry
						onBlur={onBlur}
						onChangeText={onChange}
						errorMessage={fieldState.error?.message}
						label="Password"
						onSubmitEditing={handleSubmit(onSubmit)}
					/>
				)}
				name="password"
			/>
			<Button
				buttonStyle={[
					styles.submitButton,
					{
						justifyContent: isSubmitting ? "center" : "space-between"
					}
				]}
				icon={<Icon name="login" type="material" />}
				iconPosition="right"
				loading={isSubmitting}
				title="Sign in"
				onPress={handleSubmit(onSubmit)}
			/>
		</React.Fragment>
	);
};

export const styles = StyleSheet.create({
	submitButton: {
		paddingHorizontal: 16
	}
});
