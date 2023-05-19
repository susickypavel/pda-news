import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Icon } from "@rneui/themed";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import { z } from "zod";

import { supabase } from "@/api/supabase";

import { TextField } from "./common/textfield";
import { styles } from "./signin-form";

const REGISTER_SCHEMA = z
	.object({
		email: z.string().email("Invalid email").trim(),
		password: z.string().min(6, "At least 6 chars").trim(),
		passwordConfirmation: z.string()
	})
	.refine(data => data.password === data.passwordConfirmation, {
		message: "Passwords don't match",
		path: ["passwordConfirmation"]
	});

type RegistrationFormData = z.infer<typeof REGISTER_SCHEMA>;

async function onSubmit(data: RegistrationFormData) {
	const response = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
		options: {
			data: {
				onboarding_finished: false,
				interests: [],
				home_region: null
			}
		}
	});

	if (response.error) {
		Alert.alert("Oops", response.error.message);
	}
}

export const SignUpForm: React.FC = () => {
	const {
		control,
		handleSubmit,
		setFocus,
		formState: { isSubmitting }
	} = useForm<RegistrationFormData>({
		resolver: zodResolver(REGISTER_SCHEMA)
	});
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] = useState(false);

	const togglePasswordVisibility = () => setIsPasswordVisible(prev => !prev);
	const togglePasswordConfirmationVisibility = () => setIsPasswordConfirmationVisible(prev => !prev);

	return (
		<View style={styles.container}>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
					<TextField
						blurOnSubmit={false}
						disabled={isSubmitting}
						ref={ref}
						onSubmitEditing={() => setFocus("password")}
						returnKeyType="next"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						autoCapitalize="none"
						keyboardType="email-address"
						textContentType="emailAddress"
						caretHidden={false}
						errorMessage={fieldState.error?.message}
						label="Email"
						leftIcon="email"
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
						onSubmitEditing={() => setFocus("passwordConfirmation")}
						returnKeyType="next"
						value={value}
						secureTextEntry={!isPasswordVisible}
						onBlur={onBlur}
						onChangeText={onChange}
						errorMessage={fieldState.error?.message}
						label="Password"
						rightIcon={isPasswordVisible ? "visibility-off" : "visibility"}
						rightIconOnPress={togglePasswordVisibility}
						leftIcon="lock"
					/>
				)}
				name="password"
			/>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
					<TextField
						blurOnSubmit={false}
						disabled={isSubmitting}
						ref={ref}
						value={value}
						onSubmitEditing={handleSubmit(onSubmit)}
						returnKeyType="done"
						secureTextEntry={!isPasswordConfirmationVisible}
						onBlur={onBlur}
						onChangeText={onChange}
						errorMessage={fieldState.error?.message}
						label="Confirm Password"
						rightIcon={isPasswordConfirmationVisible ? "visibility-off" : "visibility"}
						rightIconOnPress={togglePasswordConfirmationVisibility}
						leftIcon="lock"
					/>
				)}
				name="passwordConfirmation"
			/>
			<Button
				buttonStyle={[
					styles.submitButton,
					{
						justifyContent: isSubmitting ? "center" : "space-between"
					}
				]}
				icon={<Icon name="arrow-forward" type="material" />}
				iconPosition="right"
				loading={isSubmitting}
				title="Let's become informed!"
				onPress={handleSubmit(onSubmit)}
			/>
		</View>
	);
};
