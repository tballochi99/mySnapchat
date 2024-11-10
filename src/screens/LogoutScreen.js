import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutPage = ({ navigation }) => {
    const handleLogout = async () => {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Button title="Se déconnecter" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LogoutPage;