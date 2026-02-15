import AsyncStorage from '@react-native-async-storage/async-storage';

const LOG_KEY = 'app_logs';

export const Logger = {
    log: async (event: string, details?: any) => {
        const timestamp = new Date().toISOString();
        const logEntry = { timestamp, event, details };
        console.log(`[Logger] ${event}`, details || '');

        try {
            const existingLogs = await AsyncStorage.getItem(LOG_KEY);
            const logs = existingLogs ? JSON.parse(existingLogs) : [];
            logs.push(logEntry);
            await AsyncStorage.setItem(LOG_KEY, JSON.stringify(logs));
        } catch (e) {
            console.error('Failed to save log', e);
        }
    },

    getLogs: async () => {
        try {
            const logs = await AsyncStorage.getItem(LOG_KEY);
            return logs ? JSON.parse(logs) : [];
        } catch (e) {
            return [];
        }
    },

    clearLogs: async () => {
        await AsyncStorage.removeItem(LOG_KEY);
    }
};
