import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, Text, TouchableOpacity, StyleSheet, Alert, Modal, ModalPortal, Image } from 'react-native';
import { 
    insertNewTodoList,
    updateTodoList, 
    deleteTodoList, 
    queryAllTodoLists } from '../databases/allSchemas';
import realm from '../databases/allSchemas'
import { Platform } from 'react-native'
import Swipeout from 'react-native-swipeout';
import HeaderComponent from './HeaderComponent';
import PopupDialogComponent from './PopupDialogComponent';
import { Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

let FlatListItem = props => {
    const { itemIndex, id, name, creationDate, descricao, datahora, popupDialogComponent, onPressItem } = props;

    if (Platform.OS === 'android') {
        require('intl');
        require('intl/locale-data/jsonp/en-US');
        require('intl/locale-data/jsonp/tr-TR');
        require('date-time-format-timezone');
        Intl.__disableRegExpRestore();/*For syntaxerror invalid regular expression unmatched parentheses*/
    }

    showEditModal = () => {
        popupDialogComponent.showDialogComponentForUpdate({
            id, name, descricao, datahora
        });
    }

    showDeleteConfirmation = () => {
        console.log(`excluindo item: ` + id)
        Alert.alert(
            'Excluir',
            'Confirme a exclusão do item da lista',
            [
                {
                    text: 'Cancelar', onPress: () => { },
                    style: 'cancel'
                },
                {
                    text: 'Excluir', onPress: () => {                        
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
                <Text style={{ paddingLeft: 20, color: 'black' , fontWeight: 'bold', fontSize: 18, margin: 20, justifyContent: 'center' }}>{name}</Text>
                <Text style={{ paddingLeft: 50, color: 'gray' , fontWeight: 'bold', fontSize: 15, justifyContent: 'center' }}>{descricao}</Text>
                <Text style={{ fontSize: 12, paddingLeft: 310 }}>{datahora.slice(6,8)}/{datahora.slice(4,6)}/{datahora.slice(0,-4)}</Text>

                <View style={styles.container, {flexDirection: 'row'}}>
                    
                    <TouchableOpacity
                    style={ styles.button, { bottom: 100, left: 360}}
                    onPress={() => {
                        showDeleteConfirmation()
                        console.log("Remoçao chamada")
                    }}>
                        <Image
                        style={styles.buttonImageIconStyle}
                        source={require('../images/delete-icon.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{ bottom: 100,left: 270}}
                    onPress={() => {
                        showEditModal()
                        console.log("Edição chamada")
                    }}>
                        <Image 
                        style={styles.buttonImageIconStyle}
                        source={require('../images/edit-icon.png')} />
                    </TouchableOpacity>                        
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default class TodoListComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            todoLists: []
        };
        this.reloadData();
        realm.addListener('change', () => {
            this.reloadData();
        });
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
        return (
            <View style={{flex: 1}}>
            <View style={styles.container}>
                
                <HeaderComponent title={"Lista de Tarefas"}
                    hasAddButton={true}
                    showAddTodoList={
                        () => {
                            console.log('chamando adição!')
                            this.refs.popupDialogComponent.showDialogComponentForAdd()
                        }}/>

                <FlatList
                    style={styles.flatList}
                    data={this.state.todoLists}
                    renderItem={({ item, index }) => <FlatListItem {...item} itemIndex={index}
                        id={item.id}
                        name={item.name}                        
                        descricao={item.descricao}
                        datahora={item.datahora}
                        onPressItem={() => {
                            alert(`Detalhes de ${item.name}`);
                        }} >
                        </FlatListItem>}
                    keyExtractor={item => item.id}
                />
                <PopupDialogComponent ref={"popupDialogComponent"} />
                
            </View>
            </View>
        );
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
    centeredButton: {
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 150,
        backgroundColor: 'red',
        height: 100,
        width: 100,
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