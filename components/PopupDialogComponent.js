import React, { Component } from 'react';
import {
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    Platform, 
    Image, 
    TextInput
} from "react-native";
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import { insertNewTodoList, updateTodoList } from '../databases/allSchemas';

import AddTodo from "../components/AddTodo";

export default class PopupDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            isAddNew: true
        };
    }
    
    showDialogComponentForUpdate = (existingTodoList) => {
        this.setState({ visible: true });
        this.setState({
            dialogTitle: 'Atualizar a lista de tarefas',             
            id: existingTodoList.id,
            name: existingTodoList.name,
            isAddNew: false
        });
    }
    
    showDialogComponentForAdd = () => {
        this.setState({ visible: true });
        this.setState({
            dialogTitle: 'Adicionar uma nova tarefa',
            name: "",
            isAddNew: true,
        });
    }
    render() {
        const { dialogTitle } = this.state;
        return (
            
                <View style={styles.container}>
                    <TextInput style={styles.textInput} placeholder="Enter TodoList name" autoCorrect={false}
                        onChangeText={(text) => this.setState({ name: text })} value={this.state.name}
                    />
                    <View style={{ flexDirection: 'row' }}>
                    
                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (this.state.name.trim() == "") {
                                alert("Insira um nome para a tarefa!!!");
                                return;
                            } else {
                                const newTodoList = {
                                    id: Math.floor(Date.now() / 1000),
                                    name: this.state.name,
                                    creationDate: new Date()
                                };
                                insertNewTodoList(newTodoList).then().catch((error) => {
                                    alert(`Insert new todoList error ${error}`);
                                });
                                
                            }
                            
                        }}>
                            <Text style={styles.textLabel}>Save</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.button} onPress={() => {
                            this.dismiss(() => {
                                console.log('Cancelar')
                            });
                        }}>
                            <Text style={styles.textLabel}>Cancel</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                
        );
    }
};
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
        fontSize: 18,
    }
});

