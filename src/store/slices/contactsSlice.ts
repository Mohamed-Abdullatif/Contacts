import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact, FavoriteContact, ContactsState } from '../../types';
import { fetchGender } from '../../services/genderApi';

const FAVORITES_STORAGE_KEY = 'favorites_contacts';

// Async thunks
export const loadContacts = createAsyncThunk(
    'contacts/loadContacts',
    async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
            });
            return data.map((contact): Contact => ({
                id: contact.id || Math.random().toString(),
                name: contact.name || 'Unknown',
                phoneNumbers: contact.phoneNumbers?.filter(phone => phone.number)
                    .map(phone => ({
                        number: phone.number!,
                        label: phone.label || 'other'
                    })),
            }));
        }
        throw new Error('Permission denied');
    }
);

export const loadFavorites = createAsyncThunk(
    'contacts/loadFavorites',
    async () => {
        try {
            const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading favorites:', error);
            return [];
        }
    }
);

export const addToFavorites = createAsyncThunk(
    'contacts/addToFavorites',
    async ({ contact, message }: { contact: Contact; message: string }, { rejectWithValue }) => {
        try {
            // Extract first name for gender API
            const firstName = contact.name.split(' ')[0];

            console.log('Adding to favorites:', contact.name, 'First name for gender:', firstName);

            // Fetch gender
            const genderResponse = await fetchGender(firstName);

            const favoriteContact: FavoriteContact = {
                ...contact,
                message,
                gender: genderResponse?.gender || undefined,
            };

            console.log('Favorite contact with gender:', favoriteContact);

            // Save to AsyncStorage
            const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
            const favorites = stored ? JSON.parse(stored) : [];
            const updated = [...favorites, favoriteContact];
            await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));

            return favoriteContact;
        } catch (error) {
            console.error('Error adding to favorites:', error);
            return rejectWithValue('Failed to add to favorites');
        }
    }
);

export const removeFromFavorites = createAsyncThunk(
    'contacts/removeFromFavorites',
    async (contactId: string, { rejectWithValue }) => {
        try {
            const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
            const favorites = stored ? JSON.parse(stored) : [];
            const updated = favorites.filter((fav: FavoriteContact) => fav.id !== contactId);
            await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
            return contactId;
        } catch (error) {
            console.error('Error removing from favorites:', error);
            return rejectWithValue('Failed to remove from favorites');
        }
    }
);

const initialState: ContactsState = {
    contacts: [],
    favorites: [],
    showFavoritesOnly: false,
    loading: false,
    error: null,
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        toggleShowFavoritesOnly: (state) => {
            state.showFavoritesOnly = !state.showFavoritesOnly;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Load contacts
            .addCase(loadContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(loadContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load contacts';
            })
            // Load favorites
            .addCase(loadFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload;
            })
            .addCase(loadFavorites.rejected, (state, action) => {
                state.error = 'Failed to load favorites';
            })
            // Add to favorites
            .addCase(addToFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites.push(action.payload);
            })
            .addCase(addToFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to add to favorites';
            })
            // Remove from favorites
            .addCase(removeFromFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
            })
            .addCase(removeFromFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Failed to remove from favorites';
            });
    },
});

export const { toggleShowFavoritesOnly, clearError } = contactsSlice.actions;
export default contactsSlice.reducer;