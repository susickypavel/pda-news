import React, { ComponentType } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const withHideKeyboard = <P extends object>(WrappedComponent: ComponentType<P>) => {
	const WithHideKeyboard: React.FC<P> = props => (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<WrappedComponent {...props} />
		</TouchableWithoutFeedback>
	);

	WithHideKeyboard.displayName = `withHideKeyboard(${WrappedComponent.displayName || WrappedComponent.name})`;

	return WithHideKeyboard;
};

export default withHideKeyboard;
