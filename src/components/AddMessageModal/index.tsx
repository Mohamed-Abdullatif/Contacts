import React from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Formik } from 'formik';
import { validateMessage } from '../../utils/contactUtils';
import { styles } from './styles';

interface AddMessageModalProps {
    visible: boolean;
    contactName: string;
    onClose: () => void;
    onSubmit: (message: string) => void;
}

const AddMessageModal: React.FC<AddMessageModalProps> = ({
    visible,
    contactName,
    onClose,
    onSubmit,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={styles.modalContent}
                        >
                            <Text style={styles.title}>
                                Add to Favorites
                            </Text>
                            <Text style={styles.subtitle}>
                                Add a message for <Text style={styles.contactName}>{contactName}</Text>
                            </Text>

                            <Formik
                                initialValues={{ message: '' }}
                                validate={(values) => {
                                    const errors: { message?: string } = {};
                                    const messageError = validateMessage(values.message);
                                    if (messageError) {
                                        errors.message = messageError;
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    onSubmit(values.message);
                                    setSubmitting(false);
                                }}
                            >
                                {({
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    values,
                                    errors,
                                    touched,
                                    isSubmitting,
                                }) => (
                                    <View>
                                        <TextInput
                                            style={[
                                                styles.textInput,
                                                errors.message && touched.message && styles.textInputError
                                            ]}
                                            placeholder="Enter your message..."
                                            multiline
                                            numberOfLines={4}
                                            textAlignVertical="top"
                                            maxLength={200}
                                            value={values.message}
                                            onChangeText={handleChange('message')}
                                            onBlur={handleBlur('message')}
                                        />

                                        <Text style={styles.characterCount}>
                                            {values.message.length}/200 characters
                                        </Text>

                                        {errors.message && touched.message && (
                                            <Text style={styles.errorText}>
                                                {errors.message}
                                            </Text>
                                        )}

                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity
                                                onPress={onClose}
                                                style={styles.cancelButton}
                                            >
                                                <Text style={styles.cancelButtonText}>Cancel</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => handleSubmit()}
                                                disabled={isSubmitting || !!errors.message}
                                                style={[
                                                    styles.submitButton,
                                                    (isSubmitting || !!errors.message) && styles.submitButtonDisabled
                                                ]}
                                            >
                                                <Text style={[
                                                    styles.submitButtonText,
                                                    (isSubmitting || !!errors.message) && styles.submitButtonTextDisabled
                                                ]}>
                                                    {isSubmitting ? 'Adding...' : 'Add to Favorites'}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            </Formik>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default AddMessageModal;