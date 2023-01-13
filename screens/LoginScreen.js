import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Image } from 'react-native-elements'
import {KeyboardAvoidingView} from 'react-native'

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const login = () => {
		console.log('pressed login')
	}

	return (
		<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<StatusBar style="light" />

			<Image 
				source={{
					uri:"https://cdn-icons-png.flaticon.com/512/134/134914.png",
				}}
				style={{
					width:200,
					height:200
				}}
			/>


			<View style={styles.inputsContainer}>
				<Input 
					placeholder="Email"  
					type="email" 
					onChangeText={(text) => setEmail(text)}
				/>
				<Input 
					placeholder="Passowrd" 
					secureTextEntry 
					type="password"
					onChangeText={(text) => setPassword(text)}

				/>
			</View>

			<Button containerStyle={styles.button} title='Login' onPress={login}/>
			<Button containerStyle={styles.button} title='Register' type="outline" onPress={() => navigation.navigate('Register')}/>
			<View style={{height:100}}></View>
		</KeyboardAvoidingView>
	)
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
  	flex:1,
  	alignItems:'center',
  	backgroundColor:'white',
  	justifyContent:'center'
  },
  inputsContainer: {
  	width:300
  },
  button:{
  	width:200,
  	margin: 5
  }
});