import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useSessionTimer } from '../hooks/useSessionTimer';

export default function SessionScreen() {
    const { logout, sessionStartTime, user } = useAuth();
    const duration = useSessionTimer(sessionStartTime);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, {user?.email}</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Session Started At:</Text>
                <Text style={styles.value}>
                    {sessionStartTime ? new Date(sessionStartTime).toLocaleTimeString() : '-'}
                </Text>
            </View>

            <View style={styles.timerContainer}>
                <Text style={styles.timerLabel}>Duration</Text>
                <Text style={styles.timerValue}>{duration}</Text>
            </View>

            <Button title="Logout" onPress={logout} color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    infoContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#666',
    },
    value: {
        fontSize: 18,
        fontWeight: '500',
    },
    timerContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    timerLabel: {
        fontSize: 18,
        color: '#666',
    },
    timerValue: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#007AFF', // Blue color
    },
});
