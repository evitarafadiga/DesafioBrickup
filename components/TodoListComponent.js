import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert, Modal, ModalPortal, Image } from 'react-native';
import realm, { insertNewTodoList, updateTodoList, deleteTodoList, queryAllTodoLists } from '../databases/allSchemas';
import { Platform } from 'react-native'

import HeaderComponent from './HeaderComponent';
import PopupDialogComponent from './PopupDialogComponent';

let FlatListItem = props => {
    if (Platform.OS === 'android') {
        require('intl');
        require('intl/locale-data/jsonp/en-US');
        require('intl/locale-data/jsonp/tr-TR');
        require('date-time-format-timezone');
        Intl.__disableRegExpRestore();/*For syntaxerror invalid regular expression unmatched parentheses*/
    }

    const { itemIndex, id, name, creationDate, descricao, datahora, popupDialogComponent, onPressItem } = props;
    
    showEditModal = () => {
        popupDialogComponent.showDialogComponentForUpdate({
            id, name, descricao, datahora
        });
    }

    showDeleteConfirmation = () => {
        Alert.alert(
            'Excluir',
            'Excluir um item da lista',
            [
                {
                    text: 'Cancelar', onPress: () => { },//Do nothing
                    style: 'cancel'
                },
                {
                    text: 'Excluir', onPress: () => {
                        console.log(this.id);
                        deleteTodoList(id).then().catch(error => {
                            alert(`Erro de remoção = ${id}, error=${error}`);
                        });
                    }
                },
            ],
            { cancelable: true }
        );
    };

    return (    
        <TouchableOpacity onPress={onPressItem} >
            <View style={{ backgroundColor: itemIndex % 2 == 0 ? 'whitesmoke' : 'white' }}>
                <Text style={{ paddingTop: 20, paddingLeft: 20, color: 'black' , fontWeight: 'bold', fontSize: 18, margin: 10, justifyContent: 'center' }}>{name}</Text>
                <Text style={{ paddingLeft: 50, color: 'gray' , fontWeight: 'bold', fontSize: 15, margin: 15, justifyContent: 'center' }}>{descricao}</Text>
                <Text style={{ fontSize: 18, margin: 10 }} numberOfLines={0}>{datahora}</Text>

                <View style={styles.container, {flexDirection: 'row'}}>
                    
                    <TouchableOpacity
                    style={ styles.button, { bottom: 140,left: 360}}
                    onPress={() => {
                        showDeleteConfirmation()
                    }}>
                        <Image 
                        style={styles.buttonImageIconStyle}
                        source={require('../images/delete-icon.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{ bottom: 140,left: 270}}
                    onPress={() => {
                        showMore()
                    }}>
                        <Image 
                        style={styles.buttonImageIconStyle}
                        source={require('../images/edit-icon.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{ bottom: 140,left: 180}}
                    onPress={() => {
                        showEditModal()
                    }}>
                        <Image 
                        style={styles.buttonImageIconStyle}
                        source={require('../images/add-icon.png')} />
                    </TouchableOpacity>
                        
                </View>
            </View>
        </TouchableOpacity>
        
    );
}
export default class TodoListComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            todoLists: []
        };
        this.reloadData();
        /*realm.addListener('change', () => {
            this.reloadData();
        });*/
    }
    reloadData = () => {
        queryAllTodoLists().then((todoLists) => {
            this.setState({ todoLists });
        }).catch((error) => {
            this.setState({ todoLists: [] });
        });
        console.log(`props recarregadas!`);
    }
    render() {
        return (<View style={styles.container}>
            <HeaderComponent title={"Lista de Tarefas"}
                hasAddButton={true}
                hasDeleteAllButton={true}
                showAddTodoList={
                    () => {
                        
                    }
                }
            />
            <FlatList
                style={styles.flatList}
                data={this.state.todoLists}
                renderItem={({ item, index }) => <FlatListItem {...item} itemIndex={index}
                    name={item.name}
                    descricao={item.descricao}
                    onPressItem={() => {
                        openModal()
                    }} >
                    </FlatListItem>}
                keyExtractor={item => item.id}
            />
            <PopupDialogComponent ref={"popupDialogComponent"} />
        </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    flatList: {
        flex: 1,
        flexDirection: 'column',
    },
    flatText: {
        fontSize: 12,
        fontWeight: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        alignContent: 'center',
        backgroundColor: 'gray',
        borderRadius: 4,
    },
    deleteButton: {
        backgroundColor: 'gray',
        borderRadius: 4,
        borderRadius: 17
    },
    textLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonIconSeparatorStyle: {
        zIndex: 2,
        marginRight: 10,
        marginTop: 30,
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: 1,
        height: 40
    },
    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 35,
        width: 35,
        resizeMode: 'stretch',
      },
});