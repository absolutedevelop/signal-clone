import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Image } from 'react-native-elements'


const LoginScreen = () => {
	return (
		<View>
			<StatusBar style="light" />

			<Image />
		</View>
	)
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});