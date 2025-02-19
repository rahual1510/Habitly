import { makeStyles } from '../../../../utils/helper';

export const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            backgroundColor: '#fff',
            padding: 16,
            borderRadius: 10,
            elevation: 3,
            marginBottom: 20,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
        },
    };
});
