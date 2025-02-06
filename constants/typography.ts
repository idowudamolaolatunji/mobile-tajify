import variables from "./variables";

export const typography = {
	h1: {
		fontSize: 32,
		lineHeight: 40,
		letterSpacing: 0.3,
        fontFamily: "Inter-Bold"
	},
	h2: {
		fontSize: 28.5,
		lineHeight: 32,
		letterSpacing: 0.3,
        fontFamily: "Inter-SemiBold"
	},
	h3: {
		fontSize: 24,
		lineHeight: 32,
		letterSpacing: 0.3,
        fontFamily: "Inter-SemiBold"
	},
	h4: {
		fontSize: 20,
		lineHeight: 32,
		letterSpacing: 0.3,
        fontFamily: "Inter-SemiBold"
	},
    paragraphBg: {
		fontSize: 18,
		lineHeight: 20,
        color: variables.colors.text,
        fontFamily: "Inter-Medium",
    },
    paragraph: {
		fontSize: 16,
		lineHeight: 20,
        color: variables.colors.text,
        fontFamily: "Inter-Regular",
    },
    paragraphSm: {
		fontSize: 14,
		lineHeight: 20,
        color: variables.colors.text,
        fontFamily: "Inter-Regular",
    },
	button: {
		fontSize: 16,
		lineHeight: 24,
		letterSpacing: 0.5,
        fontFamily: "Inter-Meduim",
	},
	caption: {
		fontSize: 14,
		lineHeight: 20,
		letterSpacing: 0.2,
	},
	subtitle: {
		fontSize: 18,
		lineHeight: 26,
		letterSpacing: 0.2,
		fontWeight: "500",
	},
};
