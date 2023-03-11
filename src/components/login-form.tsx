import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@rneui/base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const LOGIN_SCHEMA = z.object({
	email: z.string(),
	password: z.string()
});

type LoginFormData = z.infer<typeof LOGIN_SCHEMA>;

function onSubmit(data: LoginFormData) {
	console.log(data);
}

/**
 * NOTE: Just a rough implementation for testing purposes
 */
export const LoginForm: React.FC = () => {
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
