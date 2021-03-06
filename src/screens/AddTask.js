import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import commonStyles from '../commonStyles';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform} from 'react-native';

const initialState = {desc: '', date: new Date(), showDatePicker: false};
export default class AddTask extends Component {
  state = {
    ...initialState,
  };

  save =  () => {
      const newTesk = {
          desc: this.state.desc,
          date: this.state.date
      }
      this.props.onSave && this.props.onSave(newTesk)
      this.setState({ ...initialState })
  }

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={this.state.date}
        onChange={(_, date) => this.setState({date, showDatePicker: false})}
        mode="date"
      />
    );
    const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')
    if (Platform.OS === 'android') {
      datePicker = (
          <View>
              <TouchableOpacity onPress={() => this.setState({showDatePicker: true})}>
                  <Text style={styles.date}>
                        {dateString}
                  </Text>
              </TouchableOpacity>
              {this.state.showDatePicker && datePicker}
          </View>
      )
    }

    return datePicker;
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="slide">
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Nova Tarefa</Text>
          <TextInput
            style={styles.input}
            passwordRules="Informe a Descrição..."
            value={this.state.desc}
            onChangeText={desc => this.setState({desc: desc})}
          />
          {this.getDatePicker()}
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Canvelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    backgroundColor: '#FFF',
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: '#293241',
    color: commonStyles.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 20,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    height: 40,
    margin: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: '#293241',
  },
  date: {
      fontFamily: commonStyles.fontFamily,
      fontSize: 20,
      marginLeft: 15
  }
});
