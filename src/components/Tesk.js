import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import inconCheck from '../../assets/img/iconCheck.png';
import iconnot from '../../assets/img/icon.png';
import commonStyles from '../commonStyles';
import moment from 'moment';
import 'moment/locale/pt-br';

export default props => {
  const doneOrNotStyle =
    props.doneAt != null
      ? {
          textDecorationLine: 'line-through',
        }
      : {};

  const date = props.doneAt ? props.doneAt : props.estimateAt;
  const formarreddate = moment(date)
    .locale('pt-br')
    .format('ddd, D [de] MMMMM');

  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon name="trash" size={30} color="#FFF" style={styles.excludIcon} />
        <Text style={styles.excludText}>Excluir</Text>
      </View>
    );
  };

  return (
    <Swipeable renderLeftActions={getLeftContent}
    onSwipeableLeftOpen={() => {
      props.onDelete && props.onDelete(props.id)
    }}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
          <View style={styles.checkContainer}>
            {getCheckView(props.doneAt)}
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
          <Text style={styles.date}>{formarreddate}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

function getCheckView(doneAt) {
  if (doneAt != null) {
    return (
      <View>
        <Image source={inconCheck} style={styles.done} />
      </View>
    );
  } else {
    return (
      <View>
        <Image source={iconnot} style={styles.pendin} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderTopWidth: 10,
    borderBottomRightRadius: 1,
    backgroundColor: '#FFF',
    borderColor: '#ff6677',
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendin: {
    height: 25,
    width: 25,
  },
  done: {
    height: 25,
    width: 25,
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12,
  },
  left: {
    flex:1,
    backgroundColor: '#ff6677',
    flexDirection: 'row',
    alignItems: 'center',
  },
  excludText: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
    margin: 10
  },
  excludIcon: {
    marginLeft: 10
  }
});
