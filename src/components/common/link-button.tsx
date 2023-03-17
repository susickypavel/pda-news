import { Button } from "@rneui/base";
import { Link } from "expo-router";
import React, { ComponentProps, forwardRef } from "react";

type BaseButtonProps = ComponentProps<typeof Button>;

// NOTE: RNE Button doesn't forward ref which causes errors with Link component from expo-routing.
const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
	return <Button {...props} />;
});

BaseButton.displayName = "BaseButton";

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "asChild"> & BaseButtonProps;

export const LinkButton: React.FC<LinkButtonProps> = props => {
	return (
		<Link href={props.href} asChild>
			<BaseButton title={props.title} />
		</Link>
	);
};

LinkButton.displayName = "LinkButton";
