import React, { ComponentType, FC } from "react";
import { ViewProps } from "react-native";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";

interface Props extends ViewProps {
	safeAreaProps?: SafeAreaViewProps;
}

const withSafeArea = <P extends object>(WrappedComponent: ComponentType<P>, safeAreaProps?: SafeAreaViewProps): FC<P & Props> => {
	const WithSafeArea = (props: P & Props) => {
		const { safeAreaProps: additionalSafeAreaProps, ...rest } = props;
		return (
			<SafeAreaView {...safeAreaProps} {...additionalSafeAreaProps}>
				<WrappedComponent {...(rest as P)} />
			</SafeAreaView>
		);
	};

	WithSafeArea.displayName = `withSafeArea(${WrappedComponent.displayName || WrappedComponent.name})`;

	return WithSafeArea;
};

export default withSafeArea;
