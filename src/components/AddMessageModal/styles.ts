import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, commonStyles } from '../../styles/common.styles';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: Colors.background.overlay,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 320,
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.md,
        padding: Spacing.xxl,
        ...commonStyles.shadowLight,
    },
    title: {
        fontSize: Typography.sizes.xl,
        fontWeight: Typography.weights.bold,
        color: Colors.text.primary,
        marginBottom: Spacing.sm,
    },
    subtitle: {
        color: Colors.text.secondary,
        fontSize: Typography.sizes.md,
        marginBottom: 15,
    },
    contactName: {
        fontWeight: Typography.weights.bold,
        fontSize: Typography.sizes.md,
    },
    textInput: {
        ...commonStyles.inputBase,
        marginBottom: Spacing.sm,
        height: 100,
    },
    textInputError: {
        borderColor: Colors.border.error,
    },
    characterCount: {
        color: Colors.text.secondary,
        fontSize: Typography.sizes.sm,
        marginBottom: Spacing.sm,
    },
    errorText: {
        color: Colors.text.error,
        fontSize: Typography.sizes.sm,
        marginBottom: Spacing.md,
    },
    buttonContainer: {
        ...commonStyles.flexRow,
        justifyContent: 'flex-end',
        gap: Spacing.md,
        marginBottom: 15,
    },
    cancelButton: {
        ...commonStyles.buttonBase,
        backgroundColor: Colors.background.cancel,
    },
    cancelButtonText: {
        color: Colors.text.secondary,
        fontWeight: Typography.weights.medium,
    },
    submitButton: {
        ...commonStyles.buttonBase,
        backgroundColor: Colors.primary,
    },
    submitButtonDisabled: {
        backgroundColor: Colors.background.disabled,
    },
    submitButtonText: {
        color: Colors.white,
        fontWeight: Typography.weights.medium,
    },
    submitButtonTextDisabled: {
        color: Colors.text.secondary,
    },
});