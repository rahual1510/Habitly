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
        completionText: {
            fontSize: 24,
            fontWeight: 'bold',
        },
    };
});
