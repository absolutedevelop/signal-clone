import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Image } from 'react-native-elements'
import {KeyboardAvoidingView} from 'react-native'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';


const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const login = () => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
		  .then((userCredential) => {
		    console.log(userCredential)
		  })
		  .catch((error) => {
		    const errorMessage = error.message;
		    alert(errorMessage)
		  });
	}

	useEffect(() => {
		const auth = getAuth()
		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			if(authUser){
				navigation.replace('Home')
			}
		})

		return unsubscribe
	}, [])

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
					onSubmitEditing={login}
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