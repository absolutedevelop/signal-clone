import React from 'react'
import { StyleSheet} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = ({ id, chatName, enterChat }) => {


	return (
		<ListItem onPress={() => enterChat(id, chatName)} bottomDivider>
			<Avatar 
				rounded
				source={{
					uri: "https://support.lastpass.com/assets/images/care/topnav/default-user-avatar.jpg"
				}}
			/>
			<ListItem.Content>
				<ListItem.Title style={{fontWeight:"800"}}>
					{chatName}
				</ListItem.Title>
				<ListItem.Subtitle 
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					This is a sub title
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	)
}

export default CustomListItem

const styles = StyleSheet.create({
});