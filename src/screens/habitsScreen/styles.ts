import { makeStyles } from '../../utils/helper';

export const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: colors.background,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 20,
            borderColor: '#ccc',
        },
        headerTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colors.text,
        },
        flatlistContentContainer: {
            paddingBottom: 50,
        },
    };
});
