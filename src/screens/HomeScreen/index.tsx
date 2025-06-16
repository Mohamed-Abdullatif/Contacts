import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
    loadContacts,
    loadFavorites,
    addToFavorites,
    removeFromFavorites,
    toggleShowFavoritesOnly,
} from '../../store/slices/contactsSlice';
import ContactItem from "../../components/ContactItem";
import AddMessageModal from '../../components/AddMessageModal';
import { Contact } from '../../types';
import { styles } from './styles';

const HomeScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { contacts, favorites, showFavoritesOnly, loading, error } = useSelector(
        (state: RootState) => state.contacts
    );

    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        dispatch(loadFavorites());
        dispatch(loadContacts());
    }, [dispatch]);

    const handleRefresh = () => {
        dispatch(loadContacts());
    };

    const isFavorite = (contactId: string) => {
        return favorites.some(fav => fav.id === contactId);
    };

    const handleToggleFavorite = (contact: Contact) => {
        if (isFavorite(contact.id)) {
            Alert.alert(
                'Remove from Favorites',
                `Remove ${contact.name} from favorites?`,
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Remove',
                        style: 'destructive',
                        onPress: () => dispatch(removeFromFavorites(contact.id)),
                    },
                ]
            );
        } else {
            setSelectedContact(contact);
            setModalVisible(true);
        }
    };

    const handleAddMessage = (message: string) => {
        if (selectedContact) {
            dispatch(addToFavorites({ contact: selectedContact, message }));
            setModalVisible(false);
            setSelectedContact(null);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedContact(null);
    };

    const displayedContacts = showFavoritesOnly
        ? favorites
        : contacts;

    const renderContact = ({ item }: { item: Contact }) => (
        <ContactItem
            contact={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={() => handleToggleFavorite(item)}
        />
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
                {showFavoritesOnly
                    ? 'No favorite contacts yet.\nTap the star icon to add contacts to favorites!'
                    : loading
                        ? 'Loading contacts...'
                        : 'No contacts found.\nPull to refresh or check permissions.'}
            </Text>
        </View>
    );

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                    onPress={handleRefresh}
                    style={styles.retryButton}
                >
                    <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Contacts</Text>
                    <TouchableOpacity
                        onPress={() => dispatch(toggleShowFavoritesOnly())}
                        style={[
                            styles.filterButton,
                            showFavoritesOnly && styles.filterButtonActive
                        ]}
                    >
                        <Text style={[
                            styles.filterButtonText,
                            showFavoritesOnly && styles.filterButtonTextActive
                        ]}>
                            {showFavoritesOnly ? 'Show All' : 'Favorites Only'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {showFavoritesOnly && (
                    <Text style={styles.favoritesCount}>
                        Showing {favorites.length} favorite contact{favorites.length !== 1 ? 's' : ''}
                    </Text>
                )}
            </View>
            <FlatList
                data={displayedContacts}
                renderItem={renderContact}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
                }
                ListEmptyComponent={renderEmptyState}
                showsVerticalScrollIndicator={false}
            />
            {loading && displayedContacts.length > 0 && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="small" color="#2563eb" />
                </View>
            )}
            <AddMessageModal
                visible={modalVisible}
                contactName={selectedContact?.name || ''}
                onClose={handleCloseModal}
                onSubmit={handleAddMessage}
            />
        </View>
    );
};

export default HomeScreen;