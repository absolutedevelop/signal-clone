import React, {useLayoutEffect, useState} from 'react'
import {View, SafeAreaView, Text, StyleSheet,TouchableOpacity, ScrollView} from 'react-native'
import { Avatar } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons'
import {TextInput} from 'react-native'
import {KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { doc, setDoc , addDoc,collection, serverTimestamp, query, onSnapshot,orderBy} from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import {db} from '../firebase'

const ChatScreen = ( { navigation, route} ) => {
	const [input, setInput] = useState()
	const [messages, setMessages] = useState([])
	const auth = getAuth();
	const sendMessage = async() => {
		Keyboard.dismiss()

		const messageDoc = doc(collection(db,"messages"))

		try{
			

			await setDoc(doc(db, 'chats', route.params.id, 'messages',messageDoc.id), {
			    timestamp: serverTimestamp(),
			    message: input,
			    displayName: auth.currentUser.displayName,
			    email: auth.currentUser.email,
			    photoURL: auth.currentUser.photoURL
			  })

			setInput("")

		}catch(err){
			console.log(err)
		}

	
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			title:"Chat",
			headerBackTitleVisible: false,
			headerTitleAlign:"left",
			headerTitle: () => (
				<View
					style= {{
						flexDirection:"row",
						alignItems:"center",
						marginRight:50
					}}
				>
					<Avatar rounded source={{uri:"https://secure.gravatar.com/avatar/62f046758ee09670f9d2427ed7970ee9?s=150&r=g&d=https://www.ieeer10.org/wp-content/plugins/userswp/assets/images/no_profile.png"}} />

					<Text
						style={{
							color:"white",
							marginLeft:10,
							fontWeight:"700"
						}}
					>
						{route.params.chatName}
					</Text>
				</View>
			),
			headerLeft: () => (
				<TouchableOpacity
					style={{
						marginLeft:10
					}}
					onPress={navigation.goBack}
				>
					<AntDesign name="arrowleft" size={24} color="white"/>
				</TouchableOpacity>
			),
			headerRight: () => (
				<View
					style={{
						flexDirection:"row",
						justifyContent:"space-between",
						width:80,
						marginRight:20,
					}}
				>
					<TouchableOpacity activeOpacity={0.5}>
						<AntDesign name="videocamera" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.5} >
						<AntDesign name="phone" size={24} color="white" />
					</TouchableOpacity>
				</View>
			)
		})
	}, [])


	useLayoutEffect(() => {
		const chatDoc = doc(db, "chats", route.params.id)
		const messagesCollection = collection(chatDoc, "messages")
		const messagesQuery = query(messagesCollection,orderBy("timestamp", "desc"))

		const unsubscribe = onSnapshot(messagesQuery, snapshot => {
			setMessages(snapshot.docs.map(doc => ({
				id: doc.id,
				data:doc.data()
			})))
		})

		return unsubscribe
	},[route, messages])


	return (

		<SafeAreaView
			style={{
				flex:1,
				backgroundColor:"white"
			}}
		>
			<StatusBar style="light" />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style= {styles.container}
				keyboardVerticalOffset={60}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>

					<>

						<ScrollView contentContainerStyle={{
							paddingTop:15
						}}>
							{
								messages.map(({id,data}) => (
									data.email === auth.currentUser.email ? (
										<View key={id} style={styles.reciever}>
											<Avatar
												rounded
												source={{uri:data.photoURL}}
												size={30} 
												position="absolute"
												bottom={-15}
												right={-5}
												containerStyle={{
													position:"absolute",
													bottom:-15,
													right:-5
												}}
											/>
											<Text style={styles.recieverText}>{data.message}</Text>
										</View>

									) : (
										<View  style={styles.sender}>
											<Avatar
												rounded
												source={{uri:data.photoURL}}
												size={30} 
												position="absolute"
												bottom={-15}
												left={-5}
												containerStyle={{
													position:"absolute",
													bottom:-15,
													left:-5
												}}
											 />
											<Text style={styles.senderText}>{data.message}</Text>
											<Text style={styles.senderName}>{data.displayName}</Text>
										</View>
									)

								))
							}

						</ScrollView>

						<View
							style={styles.footer}
						>
							<TextInput 
								placeholder="signal message" 
								style={styles.textInput}
								value={input}
								onChangeText={(text) => setInput(text)}
								onSubmitEditing={sendMessage}
							/>
							<TouchableOpacity
								activeOpacity={0.5}
								onPress={sendMessage}
							>
								<Ionicons name="send" size={24} color="#0493fb" />
							</TouchableOpacity>
						</View>
						{/*<View style={{height:60}}></View>*/}


					</>

				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>

		</SafeAreaView>
	)
}

export default ChatScreen

const styles = StyleSheet.create({
	container: {
		flex:1
	},
	footer: {
		flexDirection:"row",
		alignItems:"center",
		width:"100%",
		padding:15
	},
	textInput: {
		bottom:0,
		height:40,
		flex:1,
		marginRight:15,
		backgroundColor:"#ECECEC",
		padding:10,
		borderRadius:30
	},

	reciever: {
		padding: 15,
		backgroundColor: "#ECECEC",
		alignSelf: "flex-end",
		borderRadius:20,
		marginRight:15,
		marginBottom:20,
		maxWidth: "80%",
		position:"relative"
	},

	sender: {
		padding: 15,
		backgroundColor: "#0493fb",
		alignSelf: "flex-start",
		borderRadius:20,
		margin:15,
		maxWidth: "80%",
		position:"relative"

	},

	recieverText: {
		fontWight:"500",
		marginLeft:10,
		marginBottom:15,
		color:"black"
	},

	senderText: {
		fontWight:"500",
		marginLeft:10,
		marginBottom:15,
		color:"white"
	},

	senderName:{
		left:10,
		paddingRight:10,
		fontSize:10,
		color:"white"
	}


})