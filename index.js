import {AppRegistry} from 'react-native';
import TodoList from './components/TodoList';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => TodoList);