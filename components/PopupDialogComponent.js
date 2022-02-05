import React, { Component } from 'react';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import {
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity,
    Platform, 
    Image,
    TextInput,
} from "react-native";
import { insertNewTodoList, updateTodoList, queryAllTodoLists } from '../databases/allSchemas';

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
            descricao: existingTodoList.descricao,
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
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text>Título*</Text>
                    <TextInput style={styles.textInput} placeholder="Insira um título" autoCorrect={false}
                        width={200} onChangeText={(text) => this.setState({ name: text })} value={this.state.name}
                    />
                    <Text>Descrição*</Text>
                    <TextInput style={styles.textInput} placeholder="Insira uma descrição" autoCorrect={false}
                        width={200} height={100} onChangeText={(text2) => this.setState({ descricao: text2 })} value={this.state.descricao}
                    />
                    
                    
                    <TouchableOpacity style={styles.photoButton} onPress={() => {
                        
                    }}>
                        <Text style={styles.textLabel }>📷</Text>
                    </TouchableOpacity>
                        <TouchableOpacity style={styles.addButton} onPress={() => {
                            if (this.state.name.trim() == "") {
                                alert("Insira um nome para a tarefa!!!");
                                return;
                            } else {
                                const newTodoList = {
                                    id: Math.floor(Date.now() / 1000),
                                    name: this.state.name,
                                    creationDate: new Date(),
                                    datahora: String(Date.now()),
                                    descricao: this.state.descricao,
                                };
                                insertNewTodoList(newTodoList).then().catch((error) => {
                                    alert(`Erro de inserção: error ${error}`);
                                });
                                
                            }
                            
                        }}>
                            <Text style={styles.textLabel }>Inserir</Text>
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
        alignContent: 'center',
        backgroundColor: 'gray',
        padding: 10,
        margin: 10,
        borderRadius: 4,
    },
    addButton: {
        backgroundColor: 'green',
        padding: 10,
        margin: 10,
        borderRadius: 17,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    photoButton: {
        backgroundColor: 'lightgray',
        padding: 10,
        margin: 10,
        borderRadius: 17,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLabel: {
        color: 'white',
        fontSize: 18,
    }
});

