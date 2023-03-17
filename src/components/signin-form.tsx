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
		Alert.alert("Oops", response.error.message);
	}
}

export const SignInForm: React.FC = () => {
	const { control, handleSubmit, setFocus } = useForm<LoginFormData>({
		resolver: zodResolver(LOGIN_SCHEMA)
	});

	return (
		<React.Fragment>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
					<Input
						ref={ref}
						returnKeyType="next"
						onSubmitEditing={() => {
							console.log("focus");
							setFocus("password");
						}}
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
				render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
					<Input
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
			<Button title="Submit" onPress={handleSubmit(onSubmit)} />
		</React.Fragment>
	);
};
