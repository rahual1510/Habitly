import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ModalWrapper from '../../../utils/components/ModalWrapper';
import { useNavigation } from '@react-navigation/native';

interface Props {
    habitCompleted: boolean;
    onComplete: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const EditHabit = (props: Props) => {
    const { goBack } = useNavigation();
    const { habitCompleted = false, onComplete, onEdit, onDelete } = props?.route?.params ?? {};

    const onCompletePress = () => {
        goBack();
        onComplete();
    };
    const onEditPress = () => {
        goBack();
        onEdit();
    };
    const onDeletePress = () => {
        goBack();
        onDelete();
    };
    return (
        <ModalWrapper>
            <View style={styles.container}>
                <Text style={styles.title}>Choose Option</Text>
                {!habitCompleted ? <TouchableOpacity style={styles.option} onPress={onCompletePress}>
                    <Text style={styles.optionText}>Complete</Text>
                </TouchableOpacity> : null}
                <TouchableOpacity style={styles.option} onPress={onEditPress}>
                    <Text style={styles.optionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={onDeletePress}>
                    <Text style={styles.optionText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </ModalWrapper>
    );
};

export default EditHabit;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    optionText: {
        fontSize: 16,
        marginLeft: 10,
    },

});
