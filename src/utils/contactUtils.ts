export const getInitials = (name: string): string => {
    const words = name.trim().split(' ').filter(word => word.length > 0);
    if (words.length === 0) return '??';
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};
export const validateMessage = (message: string): string | null => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
        return 'Message cannot be empty';
    }
    if (trimmedMessage.length > 200) {
        return 'Message cannot exceed 200 characters';
    }
    // allows: letters, numbers, spaces, basic punctuation, emojis, and common symbols
    const invalidCharRegex = /[<>{}[\]\\|`~]/;
    if (invalidCharRegex.test(trimmedMessage)) {
        return 'Message contains invalid characters';
    }
    // Check if message is only whitespace or special characters
    const contentRegex = /[a-zA-Z0-9]/;
    if (!contentRegex.test(trimmedMessage)) {
        return 'Message must contain at least some letters or numbers';
    }

    return null;
};

export const cleanContactName = (name: string): string => {
    return name.trim() || 'Unknown Contact';
};