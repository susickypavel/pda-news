import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@rneui/themed";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { z } from "zod";

import { supabase } from "@/api/supabase";

import { TextField } from "./common/textfield";

// TODO: Proper copywriting

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
		password: data.password
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

	return (
		<React.Fragment>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
					<TextField
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
					/>
				)}
				name="email"
			/>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
					<TextField
						disabled={isSubmitting}
						ref={ref}
						onSubmitEditing={() => setFocus("passwordConfirmation")}
						returnKeyType="next"
						value={value}
						secureTextEntry
						onBlur={onBlur}
						onChangeText={onChange}
						errorMessage={fieldState.error?.message}
						label="Password"
					/>
				)}
				name="password"
			/>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
					<TextField
						disabled={isSubmitting}
						ref={ref}
						value={value}
						onSubmitEditing={handleSubmit(onSubmit)}
						returnKeyType="done"
						secureTextEntry
						onBlur={onBlur}
						onChangeText={onChange}
						errorMessage={fieldState.error?.message}
						label="Confirm Password"
					/>
				)}
				name="passwordConfirmation"
			/>

			<Button loading={isSubmitting} title="Sign up" onPress={handleSubmit(onSubmit)} />
		</React.Fragment>
	);
};
