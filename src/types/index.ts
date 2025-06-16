
export interface Contact {
    id: string;
    name: string;
    phoneNumbers?: Array<{
        number: string;
        label: string;
    }>;
}

export interface FavoriteContact extends Contact {
    message: string;
    gender?: 'male' | 'female' | string;
}

export interface ContactsState {
    contacts: Contact[];
    favorites: FavoriteContact[];
    showFavoritesOnly: boolean;
    loading: boolean;
    error: string | null;
    genderLoading?: boolean;
}

export interface GenderResponse {
    name: string;
    gender: 'male' | 'female' | string;
    probability: number;
    count: number;
}

export type ContactWithFavoriteStatus = Contact & {
    isFavorite: boolean;
    favoriteData?: Omit<FavoriteContact, keyof Contact>;
};

export interface ApiError {
    message: string;
    code?: string;
}

export interface MessageFormValues {
    message: string;
}

export interface MessageFormErrors {
    message?: string;
}