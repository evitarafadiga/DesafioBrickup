import {AppRegistry} from 'react-native';
import TodoListComponent from './components/TodoListComponent';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => TodoListComponent);