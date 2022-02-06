import React, { Component } from 'react'
import { 
    View, 
    FlatList, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Alert,
    Button } from 'react-native'

const HeaderComponent = props => {
    const { title, showAddTodoList, deleteAll, hasAddButton,
    hasSortButton, sort, sortState, hasDeleteAllButton
    } = props 
    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>Lista de Tarefas</Text>
            {hasAddButton && <TouchableOpacity style={styles.addButton} onPress={showAddTodoList}>
                
                </TouchableOpacity>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgb(242,159,5)',
        height: Platform.OS === 'ios' ? 100 : 60,
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        position: 'relative',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        zIndex: 2,
        marginRight: 10,
        marginTop: 30,
        borderRadius: 17,
        width: 140,
        height: 70,
        
    },
    addButtonImage: {
        width: 42,
        height: 42,
        tintColor: 'white'
    },
    footer: {
        position: 'fixed',
        bottom: 0,
    }
})

export default HeaderComponent;