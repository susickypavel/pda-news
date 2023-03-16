import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@rneui/base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";
import { z } from "zod";

import { supabase } from "@/api/supabase";

const LOGIN_SCHEMA = z.object({
	email: z.string().email("Invalid email"),
	password: z.string()
});

type LoginFormData = z.infer<typeof LOGIN_SCHEMA>;

async function onSubmit(data: LoginFormData) {
	const response = await supabase.auth.signInWithPassword({
		email: data.email,
		password: data.password
	});

	if (response.error) {
		// TODO: Inform user, this is a debug alert
		Alert.alert("Sign in error", response.error.message);
	}
}

/**
 * NOTE: Just a rough implementation for testing purposes
 */
export const SignInForm: React.FC = () => {
	const { control, handleSubmit } = useForm<LoginFormData>({
		resolver: zodResolver(LOGIN_SCHEMA)
	});

	return (
		<React.Fragment>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value }, fieldState }) => (
					<Input
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						autoCapitalize="none"
						keyboardType="email-address"
						errorMessage={fieldState.error?.message}
						label="Email"
					/>
				)}
				name="email"
			/>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value }, fieldState }) => (
					<Input
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
			<Button title="Submit" onPress={handleSubmit(onSubmit)} />
		</React.Fragment>
	);
};
