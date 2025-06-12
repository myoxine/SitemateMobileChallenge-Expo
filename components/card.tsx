import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Card = ({ title, content }: { title: string, content: string }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.content}><Text>{content}</Text></View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        elevation: 3, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    content: {
        // Add content specific styles here
    },
});

export default Card;