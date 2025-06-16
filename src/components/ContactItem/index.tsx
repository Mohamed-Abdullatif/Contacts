import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Contact, FavoriteContact } from '../../types';
import { getInitials } from '../../utils/contactUtils';
import { styles } from './styles';

interface ContactItemProps {
    contact: Contact | FavoriteContact;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({
    contact,
    isFavorite,
    onToggleFavorite,
}) => {
    const [showFullMessage, setShowFullMessage] = useState(false);
    const [needsTruncation, setNeedsTruncation] = useState(false);
    const [hasCheckedTruncation, setHasCheckedTruncation] = useState(false);
    const favoriteContact = contact as FavoriteContact;
    const hasMessage = isFavorite && favoriteContact.message;

    const handleTextLayout = (event: any) => {
        if (!hasCheckedTruncation) {
            const { lines } = event.nativeEvent;
            setNeedsTruncation(lines.length > 2);
            setHasCheckedTruncation(true);
        }
    };
    useEffect(() => {
        setNeedsTruncation(false);
        setShowFullMessage(false);
        setHasCheckedTruncation(false);
    }, [favoriteContact.message, hasMessage]);

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {getInitials(contact.name)}
                    </Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.name}>
                        {contact.name}
                    </Text>
                    {isFavorite ? (
                        <Text style={styles.subtitle}>
                            {favoriteContact.gender
                                ? favoriteContact.gender.charAt(0).toUpperCase() + favoriteContact.gender.slice(1)
                                : 'Unknown'
                            }
                        </Text>
                    ) : (
                        <Text style={styles.subtitle}>Unknown</Text>
                    )}
                </View>
                <Pressable
                    onPress={onToggleFavorite}
                    style={styles.starButton}
                    android_ripple={{ color: '#ffffff30' }}
                >
                    <Text style={styles.star}>
                        {isFavorite ? '★' : '☆'}
                    </Text>
                </Pressable>
            </View>

            {hasMessage && (
                <View style={styles.messageSection}>
                    {!hasCheckedTruncation && (
                        <Text
                            style={[styles.messageText, { position: 'absolute', opacity: 0, zIndex: -1 }]}
                            onTextLayout={handleTextLayout}
                        >
                            {favoriteContact.message}
                        </Text>
                    )}

                    <Text
                        style={styles.messageText}
                        numberOfLines={showFullMessage ? undefined : 2}
                    >
                        {favoriteContact.message}
                    </Text>

                    {needsTruncation && (
                        <TouchableOpacity
                            onPress={() => setShowFullMessage(!showFullMessage)}
                            style={styles.showMoreButton}
                        >
                            <Text style={styles.showMoreText}>
                                {showFullMessage ? 'Show Less' : 'Show More'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
};

export default ContactItem;