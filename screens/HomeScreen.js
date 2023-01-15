import React, {useLayoutEffect, useState, useEffect} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { getAuth, signOut } from 'firebase/auth';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import {db} from '../firebase'
import { collection, query, onSnapshot} from 'firebase/firestore'

const HomeScreen = ({ navigation }) => {
	const [chats, setChats] = useState([])


	const logout = () => {
		const auth = getAuth();
		signOut(auth).then(() => {
		  navigation.replace("Login")
		}).catch((error) => {
		  alert(error.message)
		});
	}

	useEffect(() => {

		const q = query(collection(db,"chats"))

		const unsb = onSnapshot(q, snapshot => {
			setChats(snapshot.docs.map(doc => ({
				id:doc.id,
				data:doc.data()
			})))
		})

		return unsb

	},[])


	useLayoutEffect(() => {
		const auth = getAuth()

		navigation.setOptions({
			title:"Signal",
			headerStyle:{
				backgroundColor:"white"
			},
			headerTitleStyle:{
				color:"black"
			},
			headerTintColor:"black",
			headerLeft: () => (
				<View
					style={{marginLeft:20}}
				>
					<TouchableOpacity onPress={logout}>
						<Avatar rounded source={{ uri:auth?.currentUser?.photoURL }} />
					</TouchableOpacity>
				</View>
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
						<AntDesign name="camerao" size={24} color="black" />
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
						<SimpleLineIcons name="pencil" size={24} color="black" />
					</TouchableOpacity>
				</View>
			),
		})
	},[navigation])

	const enterChat = (id, chatName) => {
		navigation.navigate("Chat", {
			id, chatName
		})
	}

	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				
				{chats.map(({id, data:{chatName}}) => (
					<CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
				))}
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	container:{
		height:"100%"
	}
});