import { makeStyles } from '../../../../utils/helper';

export const useStyles = makeStyles(({ colors }) => {
    return {
        container: {
            borderRadius: 10,
            marginVertical: 10,
            backgroundColor: '#fff',
            elevation: 3,
            padding: 10,
        },
        viewAddButton: {
            padding: 10,
            alignItems: 'center',
            backgroundColor: colors.button,
            borderRadius: 5,
        },
        addText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.buttonText,
        },
        label: {
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 5,
        },
        input: {
            borderWidth: 1,
            borderColor: colors.secondary,
            borderRadius: 5,
            padding: 10,
            marginTop: 5,
        },
        frequencyContainer: {
            flexDirection: 'row',
            marginTop: 5,
        },
        frequencyButton: {
            padding: 8,
            borderWidth: 1,
            borderColor: colors.secondary,
            borderRadius: 20,
            width: '30%',
            alignItems: 'center',
            marginRight: 5,
        },
        selected: {
            backgroundColor: colors.primary,
            color: 'white',
        },
        selectedText: {
            color: colors.buttonText,
        },
        frequencyText: {
            fontWeight: 'bold',
        },
        errorText: {
            color: 'red',
            fontSize: 14,
            marginTop: 5,
            textAlign: 'center',
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        },
        button: {
            flex: 1,
            padding: 12,
            borderRadius: 5,
            alignItems: 'center',
            marginHorizontal: 5,
        },
        cancelButton: {
            backgroundColor: colors.secondaryButton,
        },
        addButton: {
            backgroundColor: colors.primaryButton,
        },
        buttonText: {
            color: colors.buttonText,
            fontSize: 16,
            fontWeight: 'bold',
        },
    };
});
