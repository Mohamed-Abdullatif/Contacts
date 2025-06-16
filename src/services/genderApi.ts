import { GenderResponse } from '../types';

export const fetchGender = async (name: string): Promise<GenderResponse | null> => {
    try {
        const cleanName = name.trim().replace(/[^a-zA-Z]/g, '');
        if (!cleanName) {
            console.warn('Invalid name for gender API:', name);
            return null;
        }
        const response = await fetch(`https://api.genderize.io/?name=${encodeURIComponent(cleanName)}`);
        console.log("response", response)

        if (!response.ok) {
            console.error('Gender API response not ok:', response.status, response.statusText);
            return null;
        }
        const data: GenderResponse = await response.json();
        if (data && data.gender && ['male', 'female'].includes(data.gender.toLowerCase())) {
            return {
                ...data,
                gender: data.gender.toLowerCase()
            };
        }
        console.warn('Invalid gender response:', data);
        return null;
    } catch (error) {
        console.error('Error fetching gender:', error);
        return null;
    }
};