import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  FlatList,
  Button,
  Alert,
} from 'react-native';
import header from '../../assets/img/1118.png';

import moment from 'moment';
import 'moment/locale/pt-br';
import AddTask from './AddTask';

import commonStyles from '../commonStyles';
import Tesk from '../components/Tesk';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Platform} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  visibleTasks: [],
  tasks: [],
};
export default class TeskList extends Component {
  state = {
    ...initialState,
  };

  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('tasksState');
    const state = JSON.parse(stateString) || initialState;
    this.setState(state);
  };

  toggleFilter = () => {
    this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks);
  };

  filterTasks = () => {
    let visibleTasks = null;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pending = task => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pending);
    }

    this.setState({visibleTasks: visibleTasks});
    AsyncStorage.setItem('tasksState', JSON.stringify(this.state));
  };

  toggleTask = tasksId => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      if (task.id === tasksId) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });
    this.setState({tasks: tasks}, this.filterTasks);
  };
  addTasck = newTesk => {
    if (!newTesk.desc || !newTesk.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição não informada!');
      return;
    }

    const tasks = [...this.state.tasks];
    tasks.push({
      id: Math.random(),
      desc: newTesk.desc,
      estimateAt: newTesk.date,
      doneAt: null,
    });
    this.setState({tasks, showAddTask: false}, this.filterTasks);
  };

  deleteTask = id => {
    const tasks = this.state.tasks.filter(tesk => tesk.id != id);
    this.setState({tasks}, this.filterTasks);
  };
  render() {
    const today = moment()
      .locale('pt-br')
      .format('ddd, D [de] MMMM');
    const buttons = ['Hoje', 'Amanhã', 'Sexta'];
    return (
      <View style={styles.container}>
        <AddTask
          isVisible={this.state.showAddTask}
          onCancel={() => {
            this.setState({showAddTask: false});
          }}
          onSave={this.addTasck}
        />
        <ImageBackground source={header} style={styles.backgroud}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtutle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.teskList}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
              <Tesk
                {...item}
                onToggleTask={this.toggleTask}
                onDelete={this.deleteTask}
              />
            )}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addButton}
          onPress={() => this.setState({showAddTask: true})}>
          <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroud: {
    flex: 3,
  },
  teskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtutle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 20,
    fontSize: 20,
  },
  filtroButton: {
    flexDirection: 'row',

    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    backgroundColor: '#293241',
    backfaceVisibility: 'visible',
  },
  appButtonContainer: {
    elevation: 0,
    backgroundColor: '#293241',
    borderRadius: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    color: commonStyles.colors.secondary,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff6677',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/*
<View
            style={{
              flex: 1,
              borderRightWidth: 1,
              borderColor:'#ededed',
              padding: 5
            }}>
            <Button title="Pendentes" color="#293241" />
          </View>
          <View
            style={{
              flex: 1,
              borderRightWidth: 1,
              borderColor:'#ededed'
            }}>
            <Button title="Pendentes" color="#293241" />
          </View>
          <View
            style={{
              flex: 1,
              borderStyle: 'solid',
            }}>
            <Button title="Concluidas" color="#293241" />
          </View>



<View style={styles.filtroButton}>
          <TouchableOpacity
            onPress={this.toggleFilter}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Completas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.toggleFilter}
            activeOpacity={0.1}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Pendentes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.toggleFilter}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Completas</Text>
          </TouchableOpacity>
        </View>


          */
