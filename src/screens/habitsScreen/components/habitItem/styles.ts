import { makeStyles } from '../../../../utils/helper';

export const useStyles = makeStyles(({ colors }) => {
    return {
        habitItem: {
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
            elevation: 3,
        },
        habitName: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        habitDescription: {
            fontSize: 14,
            marginBottom: 5,
        },
        habitFrequency: {
            fontSize: 12,
        },
        markCompletionContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        dayButton: {
            padding: 8,
            borderRadius: 5,
            minWidth: 40,
            alignItems: 'center',
            marginRight: 5,
        },
        dayText: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#fff',
        },
        actionButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        },
        button: {
            flex: 1,
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginHorizontal: 5,
        },
        saveButton: {
            backgroundColor: colors.primaryButton,
        },
        cancelButton: {
            backgroundColor: colors.secondaryButton,
        },
        buttonText: {
            color: colors.buttonText,
            fontSize: 14,
            fontWeight: 'bold',
        },
        input: {
            borderWidth: 1,
            borderColor: colors.secondary,
            borderRadius: 5,
            padding: 10,
            marginVertical: 5,
        },
        frequencyContainer: {
            flexDirection: 'row',
            marginVertical: 10,
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
        },
        selectedText: {
            color: colors.buttonText,
        },
        frequencyText: {
            fontWeight: 'bold',
        },
        completedView: {
            backgroundColor: colors.lightGreen,
        },
    };
});
