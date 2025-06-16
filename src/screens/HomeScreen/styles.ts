import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, commonStyles } from '../../styles/common.styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
        marginTop: 10,
    },
    header: {
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        paddingTop: 48,
        paddingBottom: Spacing.lg,
        paddingHorizontal: Spacing.lg,
    },
    headerContent: {
        ...commonStyles.flexRow,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: Typography.sizes.xxl,
        fontWeight: Typography.weights.bold,
        color: Colors.text.primary,
    },
    filterButton: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        backgroundColor: '#e5e7eb',
    },
    filterButtonActive: {
        backgroundColor: '#2563eb',
    },
    filterButtonText: {
        fontWeight: Typography.weights.medium,
        color: '#374151',
    },
    filterButtonTextActive: {
        color: Colors.white,
    },
    favoritesCount: {
        color: Colors.text.secondary,
        marginTop: Spacing.sm,
    },
    listContent: {
        paddingVertical: Spacing.lg,
    },
    emptyContainer: {
        ...commonStyles.flex1,
        ...commonStyles.flexCenter,
        padding: Spacing.xxxl,
    },
    emptyText: {
        color: Colors.text.secondary,
        fontSize: Typography.sizes.lg,
        textAlign: 'center',
    },
    errorContainer: {
        ...commonStyles.flex1,
        ...commonStyles.flexCenter,
        backgroundColor: '#f9fafb',
        padding: Spacing.xxxl,
    },
    errorText: {
        color: Colors.text.error,
        fontSize: Typography.sizes.lg,
        textAlign: 'center',
        marginBottom: Spacing.lg,
    },
    retryButton: {
        backgroundColor: '#2563eb',
        paddingHorizontal: Spacing.xxl,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    retryButtonText: {
        color: Colors.white,
        fontWeight: Typography.weights.medium,
    },
    loadingOverlay: {
        position: 'absolute',
        bottom: Spacing.lg,
        alignSelf: 'center',
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: Spacing.sm,
        ...commonStyles.shadowLight,
    },
});