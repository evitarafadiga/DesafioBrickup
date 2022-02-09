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
import * as ImagePicker from "react-native-image-picker"

export default class PopupDialogComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            descricao: '',
            isAddNew: true,
            showPopup: false,
            resourcePath: {},
        };
    }

    handleChoosePhoto = () => {

        const options = {
      
            storageOptions: {
      
              skipBackup: true,
      
              path: 'images',
      
            },
      
        };

        ImagePicker.launchImageLibrary(options, res => {

        console.log('Response = ', res);

         if (res.error) {

          console.log('ImagePicker Error: ', res.error);

        } else  {

          const source = { uri: res.uri };

          console.log('response', JSON.stringify(res));
          
            this.setState({
          
              filePath: res,
          
              fileData: res.data,
          
              fileUri: res.uri
          
          });

        }

        });
    
      };
            
    showDialogComponentForUpdate = (existingTodoList) => {
        console.log('chegou aqui na edição')
        this.state.showPopup = true;
        this.setState({
            dialogTitle: 'Atualizar item da lista de tarefas',             
            id: existingTodoList.id,
            name: existingTodoList.name,
            descricao: existingTodoList.descricao,
            datahora: existingTodoList.datahora,
            resourcePath: existingTodoList.resourcePath,
            isAddNew: false
        });
        
    }
   
    showDialogComponentForAdd = () => {
        this.state.showPopup = true
        console.log('chegou aqui')
        this.setState({
            dialogTitle: 'Adicionar uma nova tarefa na lista',
            name: "",
            descricao: "",
            resourcePath: '',
            isAddNew: true,
        });
    }

    render() {
        
        const { dialogTitle } = this.state;
        return (
            
            this.state.showPopup &&
            
                <View style={styles.container} ref={"popupDialogComponent"}>
                        <Text style={styles.dialogText}>{dialogTitle}</Text>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <View style={styles.secondContainer}>
                        <Text style={styles.simpleText}>Título*</Text>
                        <TextInput style={styles.textInput} placeholder="Insira um título" autoCorrect={false}
                            width={300} onChangeText={(text) => this.setState({ name: text })} value={this.state.name}
                        />
                        <Text style={styles.simpleText}>Descrição*</Text>
                        <TextInput style={styles.textInput} placeholder="Insira uma descrição" autoCorrect={false}
                            width={300} height={100} onChangeText={(text2) => this.setState({ descricao: text2 })} value={this.state.descricao}
                        />
                        
                        
                        <TouchableOpacity style={styles.photoButton} onPress={() => {
                            this.handleChoosePhoto()
                        }}>
                            
                            <Text style={styles.textLabel }>📷</Text>
                        </TouchableOpacity>
                            <Image
                                source={{ uri: this.state.resourcePath.fileUri }}
                                style={{ width: 200, height: 200 }}
                            />
                            <Text style={{ alignItems: 'center' }}>
                            ImagePath:{this.state.fileUri}

                            </Text>
                        </View >
                        <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.addButton} onPress={() => {
                        
                        if (this.state.name.trim() == "") {
                            alert("Insira um nome para a tarefa!!!");
                            return;
                            } else {
                                if (this.state.isAddNew == true) {
                                    let rightNow = new Date();
                                    const res = rightNow.toISOString().slice(0,10).replace(/-/g,"");
                                    const newTodoList = {
                                        id: Math.floor(Date.now() / 1000),
                                        name: this.state.name,
                                        creationDate: new Date(),
                                        datahora: res,
                                        descricao: this.state.descricao,
                                        resourcePath: this.state.resourcePath ,
                                    };
                                    insertNewTodoList(newTodoList).then().catch((error) => {
                                        alert(`Erro de inserção: error ${error}`);
                                    });
                                    this.setState({showPopup: false}) 
                                    
                                
                                } else {
                                    const todoList = {    
                                        id:  this.state.id,
                                        name: this.state.name,
                                        descricao: this.state.descricao,
                                        resourcePath: this.state.resourcePath,                                       
                                    };    
                                    updateTodoList(todoList).then().catch((error) => {
                                        alert(`Erro de edição: error ${error}`);
                                    });
                                    this.setState({showPopup: false})   
                                }
                        
                            }}}>
                        <Text style={styles.textLabel }>Inserir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelButton} onPress={() => {
                            this.setState({showPopup: false}) 
                        }}>
                            
                            <Text style={styles.textLabel }>Cancelar</Text>
                        </TouchableOpacity>
                        </View>
                    
                        
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
        backgroundColor: 'peachpuff',
        margin: 17,
        padding: 10,
        borderRadius: 17,
        height: 800,
    },
    secondContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 17,
        paddingTop: 5,
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    textInput: {
        height: 40,
        padding: 10,
        margin: 10,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
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
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
        width: 140,
    },
    cancelButton: {
        backgroundColor: 'rgb(220,20,60)',
        padding: 10,
        borderRadius: 17,
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    },
    photoButton: {
        backgroundColor: 'lightgray',
        padding: 5,
        margin: 20,
        borderRadius: 17,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        marginBottom: 20,
        marginTop: 10,
        fontSize: 30,
    },
    textLabel: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    dialogText: {
        color: 'gray',
        fontSize: 15,
        fontWeight: 'bold',
        paddingVertical: 10,
        padding: 10,
    },
    simpleText: {
        fontSize: 13,
    }
});

