import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../styles/common.styles';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.md,
        padding: Spacing.lg,
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
        flexDirection: 'column',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    avatar: {
        width: 50,
        height: 50,
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.circle,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.lg,
        marginTop: 2,
    },
    avatarText: {
        color: Colors.primary,
        fontWeight: Typography.weights.bold,
        fontSize: Typography.sizes.lg,
    },
    content: {
        flex: 1,
        paddingRight: Spacing.sm,
    },
    name: {
        color: Colors.white,
        fontWeight: Typography.weights.semibold,
        fontSize: Typography.sizes.lg,
        lineHeight: Typography.lineHeights.relaxed,
    },
    subtitle: {
        color: Colors.primaryLight,
        fontSize: Typography.sizes.md,
        lineHeight: Typography.lineHeights.normal,
        marginTop: 2,
    },
    messageSection: {
        marginTop: Spacing.md,
    },
    messageText: {
        color: Colors.white,
        fontSize: Typography.sizes.sm,
        lineHeight: Typography.lineHeights.normal,
    },
    showMoreButton: {
        alignSelf: 'flex-start',
        marginTop: Spacing.xs,
    },
    showMoreText: {
        color: Colors.primaryLight,
        fontSize: Typography.sizes.sm,
        fontWeight: Typography.weights.medium,
    },
    starButton: {
        padding: Spacing.sm,
        marginTop: -4,
    },
    star: {
        fontSize: Typography.sizes.xxxl,
        color: Colors.gold,
    },
});