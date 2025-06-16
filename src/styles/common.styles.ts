import { StyleSheet } from 'react-native';

export const Colors = {
    primary: '#4A5FBD',
    primaryLight: '#B8C5E8',
    white: '#ffffff',
    gold: '#FFD700',
    text: {
        primary: '#1f2937',
        secondary: '#6b7280',
        error: '#ef4444',
    },
    border: {
        light: '#d1d5db',
        error: '#ef4444',
    },
    background: {
        overlay: 'rgba(0, 0, 0, 0.5)',
        disabled: '#d1d5db',
        cancel: '#e5e7eb',
    },
};
export const Typography = {
    sizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 28,
    },
    weights: {
        normal: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: 'bold' as const,
    },
    lineHeights: {
        tight: 16,
        normal: 20,
        relaxed: 24,
    },
};
export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
};
export const BorderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    circle: 25,
};
export const commonStyles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    flexColumn: {
        flexDirection: 'column',
    },
    flexCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexBetween: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flex1: {
        flex: 1,
    },
    shadowLight: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonBase: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textCenter: {
        textAlign: 'center',
    },
    textBold: {
        fontWeight: Typography.weights.bold,
    },
    textMedium: {
        fontWeight: Typography.weights.medium,
    },
    textSemibold: {
        fontWeight: Typography.weights.semibold,
    },

    inputBase: {
        borderWidth: 1,
        borderColor: Colors.border.light,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        fontSize: Typography.sizes.md,
    },
});