import React, { Component } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { updateTodoList, deleteTodoList, queryAllTodoLists } from '../databases/allSchemas'
import realm from '../databases/allSchemas'
import Swipeout from 'react-native-swipeout'

import HeaderComponent from './HeaderComponent'
import PopupDialogComponent from './PopupDialogComponent'

let FlatListItem = props => {
    const { itemIndex, id, name, creationData, popupDialogComponent, onPressItem } = props
    showEditModal = () => {

    }
    showDeleteConfirmation = () => {
        Alert.alert(
            'Deletar',
            'Excluir uma lista de tarefas',
            [
                {
                    text: 'Cancelar', onPress: () => {},
                    style: 'cancel'
                },
                {
                    text: 'Confirmar', onPress: () => {

                    }
                },
            ],
            { cancelable: true}
        )
    }
    return(
        <Swipeout right={[
            {
                text: 'Editar',
                backgroundColor: 'gray',
                onPress: showEditModal
            },
            {
                text: 'Deletar',
                backgroundColor: 'red',
                onPress: showDeleteConfirmation
            }
        ]} autoClose={true}>
            <TouchableOpacity onPress={onPressItem}>
                <View style={{ backgroundColor: itemIndex % 2 == 0 ? 'peachpuff': 'moccasin'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 10 }}>{name}</Text>
                    <Text style={{ fontSize: 16, margin: 10 }} numberOfLines={2}>{creationData.toLocaleString()}</Text>
                </View>
            </TouchableOpacity>
        </Swipeout>
    )
}

export default class TodoListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todoLists: []
        }
        this.reloadData()
        realm.addListener('change', () => {
            this.reloadData()
        })
    }
    reloadData = () => {
        queryAllTodoLists().then((todoLists) => {
            this.setState({ todoLists: todoLists })
        }).catch((error) => {
            this.setState({ todoLists: [] })
        })
        console.log(`recarregue os dados`)        
    }
    render() {
        return ( <View style={styles.container}>
            <HeaderComponent title={"Lista de Tarefas"}
                hadAddButton={true}
                showAddTodoList={
                    () => {
                        this.refs.popupDialogComponent.showDialogComponentForAdd()
                    }
                }
            />
            <FlatList
                style={styles.flatList}
                data={this.state.todoLists}
                renderItem={({ item, index }) => <FlatListItem {...item} itemIndex={index}
                    popupDialogComponent={this.refs.popupDialogComponent}
                onPressItem={() => {
                    alert(`Item selecionado `)
                }} />}
                keyExtractor={item => item.id}
            />
            <PopupDialogComponent ref={"popupDialogComponent"} />
        </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    flatList: {
        flex: 1,
        flexDirection: 'column',
    }
})