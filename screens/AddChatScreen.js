import React, {useLayoutEffect, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {Input, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { doc, setDoc , addDoc,collection} from "firebase/firestore";
import {db} from '../firebase' 

const AddChatScreen = ({ navigation}) => {
	const [input, setInput] = useState('')

	const createChat = async () => {
		try {
		  const docRef = await addDoc(collection(db, "chats"), {
		    chatName:input
		  });
		  navigation.goBack()

		} catch (e) {
		  console.error("Error adding document: ", e);
		}
	}


	useLayoutEffect(() => {
		navigation.setOptions({
			title:"Add a new chat"
		})
	}, [navigation])


	return (
		<View style={styles.container}>
			<Input 
				placeholder="Enter a chat name"
				value={input}
				onChangeText={(text) => setInput(text)}
				leftIcon={
					<Icon name="wechat" type="antdesign" size={24} color="black"/> 
				}
				onSubmitEditing={createChat}
			/>
			<Button onPress={createChat} title="Create a new chat"/>
		</View>
	)
}

export default AddChatScreen

const styles = StyleSheet.create({
	container : {
		height:"100%",
		padding:30,
		backgroundColor:"white"
	}
})