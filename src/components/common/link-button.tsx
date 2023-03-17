import { Button, type ButtonProps } from "@rneui/themed";
import { Link } from "expo-router";
import React, { forwardRef } from "react";

// NOTE: RNE Button doesn't forward ref which causes errors with Link component from expo-routing.
const BaseButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	return <Button {...props} />;
});

BaseButton.displayName = "BaseButton";

interface LinkButtonProps {
	href: string;
	title: string;
	buttonProps: Omit<ButtonProps, "title">;
}

export const LinkButton: React.FC<LinkButtonProps> = props => {
	return (
		<Link href={props.href} asChild>
			<BaseButton type="outline" title={props.title} {...props.buttonProps} />
		</Link>
	);
};

LinkButton.displayName = "LinkButton";
