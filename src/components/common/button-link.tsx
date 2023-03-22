import { useLinkProps } from "@react-navigation/native";
import { Button, type ButtonProps } from "@rneui/themed";
import React from "react";

interface LinkButtonProps {
	href: string;
	title: string;
	buttonProps?: Omit<ButtonProps, "title">;
}

export const LinkButton: React.FC<LinkButtonProps> = props => {
	const { onPress, ...attrs } = useLinkProps({ to: props.href });

	return <Button type="outline" onPress={onPress} title={props.title} {...props.buttonProps} {...attrs} />;
};

LinkButton.displayName = "LinkButton";
