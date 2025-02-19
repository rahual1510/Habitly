import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Modal, Pressable, StyleSheet } from 'react-native';


interface Props {
    children: React.ReactNode;
}

const ModalWrapper = ({
    children,
}: Props) => {
    const { goBack } = useNavigation();
    const onClose = () => {
        goBack();
    };

    return (
        <Modal transparent animationType="slide">
            <Pressable
                style={[styles.container, styles.modalBackground]}
                onPress={onClose}
            >
                {children}
            </Pressable>
        </Modal>
    );
};

export default ModalWrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(15, 15, 16, 0.69)',
    },
});
