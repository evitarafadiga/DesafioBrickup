import React, { Component } from 'react'
import { 
    View, 
    FlatList, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Alert,
    Image,
    Button } from 'react-native'

const HeaderComponent = props => {
    const { title, showAddTodoList, deleteAll, hasAddButton,
    hasSortButton, sort, sortState, hasDeleteAllButton
    } = props 
    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>Lista de Tarefas</Text>
            {hasAddButton && <TouchableOpacity style={styles.addButton} onPress={showAddTodoList}> 
                        <Image
                        style={styles.buttonImageIconStyle}
                        source={require('../images/add-icon.png')} />
                </TouchableOpacity>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(242,159,5)',
        height: Platform.OS === 'ios' ? 100 : 80,
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        paddingEnd: 180,
    },
    addButton: {
        flex: 0,
        zIndex: 2,
        borderRadius: 17,        
    },
    addButtonImage: {
        width: 42,
        height: 42,
        tintColor: 'white'
    },
    footer: {
        position: 'fixed',
        bottom: 0,
    },
    buttonIconSeparatorStyle: {
        zIndex: 2,
        marginRight: 10,
        marginTop: 30,
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: 1,
        height: 50
    },
    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 60,
        width: 60,
        resizeMode: 'stretch',
    },
})

export default HeaderComponent;