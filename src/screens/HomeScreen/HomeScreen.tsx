// src/screens/HomeScreen/HomeScreen.tsx

import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/store/slices/authSlice';
import { RootState } from '../../redux/store/store';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth);
  console.log('user in HomeScreen:', user);
  
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <SafeAreaView>
            <Text>Welcome to the Home Screen!</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
});

export default HomeScreen;
