import { AppRegistry } from 'react-native';
import App from './App';
import './web/icon-font.css';

AppRegistry.registerComponent('habitown', () => App);
AppRegistry.runApplication('habitown', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
