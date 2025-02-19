import { makeStyles } from '../../utils/helper';

export const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 20,
            backgroundColor: colors.background,
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
            color: colors.text,
        },
        input: {
            height: 50,
            borderColor: colors.secondary,
            color: colors.text,
            borderWidth: 1,
            borderRadius: 5,
            marginBottom: 10,
            paddingHorizontal: 15,
            fontSize: 16,
        },
        errorInput: {
            borderColor: 'red',
        },
        errorText: {
            color: 'red',
            fontSize: 12,
            marginBottom: 10,
        },
        button: {
            backgroundColor: colors.button,
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            marginBottom: 20,
        },
        buttonText: {
            color: colors.buttonText,
            fontSize: 18,
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 10,
        },
        footerText: {
            color: colors.text,
            fontSize: 14,
        },
    };
});
