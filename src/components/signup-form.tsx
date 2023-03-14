import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@rneui/base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { supabase } from "../api/supabase";

const REGISTER_SCHEMA = z.object({
	email: z.string(),
	password: z.string()
});

type RegistrationFormData = z.infer<typeof REGISTER_SCHEMA>;

async function onSubmit(data: RegistrationFormData) {
	const response = await supabase.auth.signUp({
		email: data.email,
		password: data.password
	});

	console.log(response);
}

/**
 * NOTE: Just a rough implementation for testing purposes
 */
export const SignUpForm: React.FC = () => {
	const { control, handleSubmit } = useForm<RegistrationFormData>({
		resolver: zodResolver(REGISTER_SCHEMA)
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
			<Button title="Sign up" onPress={handleSubmit(onSubmit)} />
		</React.Fragment>
	);
};
