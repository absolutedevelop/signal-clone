import React, {useState, useLayoutEffect} from 'react'
import { StyleSheet, View } from 'react-native'
import {KeyboardAvoidingView} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {Input, Button, Text} from 'react-native-elements'
import { getAuth, createUserWithEmailAndPassword, User, updateProfile} from 'firebase/auth';

const RegisterScreen = ({ navigation }) => {
	const [name,setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [imageUrl, setImageUrl] = useState('')

	const register = () => {
		const auth = getAuth()
		createUserWithEmailAndPassword(auth, email,password)
			.then((user) => {
				updateProfile(auth.currentUser, {
					displayName: name,
					photoURL: imageUrl || "https://secure.gravatar.com/avatar/62f046758ee09670f9d2427ed7970ee9?s=150&r=g&d=https://www.ieeer10.org/wp-content/plugins/userswp/assets/images/no_profile.png"
				}).then(() => console.log("profile update")).catch(err => alert(err.message))
				
			})
			.catch((err) => alert(err.message))
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: "Login"
		})
	}, [navigation])


	return (
		<KeyboardAvoidingView behavior='padding' style={styles.container}>
			<StatusBar style="light" />
			<Text h3 style={{marginBottom:50}}>Create an account</Text>

			<View style={styles.inputsContainer}>
				<Input placeholder="Full Name" type="text" onChangeText={(text) => setName(text)} />
				<Input placeholder="Email" type="email" onChangeText={(text) => setEmail(text)} />
				<Input placeholder="Password" type="password" secureTextEntry onChangeText={(text) => setPassword(text)} />
				<Input placeholder="Image Url (Optional)" type="text" onChangeText={(text) => setImageUrl(text)} onSubmitEditing={register}/>

			</View>

			<Button title='Register' raised onPress={register} containerStyle={styles.button}/>
			<View style={{height:100}}></View>

		</KeyboardAvoidingView>
	)
}

export default RegisterScreen


const styles  = StyleSheet.create({
	container:{
		flex:1,
	  	alignItems:'center',
	  	backgroundColor:'white',
	  	justifyContent:'center'
	},
	button:{
		width: 200
	},
	inputsContainer:{
		width:300
	}
})