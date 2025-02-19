import { makeStyles } from '../../../../utils/helper';

export const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: colors.boxView,
            padding: 16,
            borderRadius: 10,
            elevation: 3,
            marginBottom: 20,
            alignItems: 'center',
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        streakText: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        badgeContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        badgeView: {
            backgroundColor: colors.primary,
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            borderRadius: 10,
            marginRight: 10,
        },
        badgeText: {
            color: colors.buttonText,
            fontSize: 16,
            fontWeight: 'bold',
        },
    };
});
