import React, { Component } from 'react'
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod'
import { insertNewTodoList, updateTodoList } from '../databases/allSchemas'
export default class PopupDialogComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            name: '',
            isAddNew: true,
            visible: true
        }
    }
    showDialogComponentForAdd = () => {
        this.refs.popupDialog.show()
        this.setState({
            dialogTitle: 'Adicionar uma nova lista de tarefas',
            name: "",
            isAddNew: true
        })
    }
    render() {
        const { dialogTitle } = this.state;
        return (
                
            <PopupDialog
                dialogTitle={<DialogContent title={dialogTitle} />}
                width={0,7} height={100}
                ref={"popupDialog"}
            >
                <View style={StyleSheet.container}>
                    <TextInput style={styles.textInput} placeholder="Insira o título da lista de tarefas" autoCorrect={false}
                    onChangeText={(text) => this.setState({ name: text})} value={this.state.name}
                    />
                    <View style={{ flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        if(this.state.name.trim() == "") {
                            alert(`Por favor insira um título para a lista de tarefas! `)
                            return
                        }
                        this.refs.popupDialog.dismiss(() => {
                            if(this.state.isAddNew == true) {
                                const newTodoList = {
                                    id: Math.floor(Date.now()/1000),
                                    name: this.state.name,
                                    creationDate: new Date()
                                }
                                insertNewTodoList(newTodoList).then().catch((error) => {
                                    alert(`Erro de inserção. Por favor, tente novamente. ${error}`)
                                })
                            } else {

                            }
                        })
                    }}>
                        <Text style={styles.textLabel}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.refs.popupDialog.dismiss(() => {
                            console.log(`Cancelando ação`)
                        })
                    }}>
                        <Text style={styles.textLabel}>Cancel</Text>
                    </TouchableOpacity>
                    </View>
                    
                </View>
            </PopupDialog>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        padding: 10,
        margin: 10,
        borderColor: 'gray',
        borderWidth: 1
    },
    button: {
        backgroundColor: 'steelblue',
        padding: 10,
        margin: 10
    },
    textLabel: {
        color: 'white',
        fontSize: 10,
    }
})

