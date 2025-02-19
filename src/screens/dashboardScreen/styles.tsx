import { makeStyles } from '../../utils/helper';

export const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: colors.background,
        },
        contentContainer: {
            paddingBottom: 100,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            textAlign: 'center',
        },
    };
});
