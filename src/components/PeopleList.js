/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ListView
 } from 'react-native';
import { connect } from 'react-redux';
import PeopleItem from './PeopleItem';

import Icon from 'react-native-vector-icons/EvilIcons';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 353,
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingLeft: 20,
  },
});

class PeopleList extends Component {

  static navigationOptions = {
      tabBarLabel : 'Details',
      tabBarIcon : ({tintColor}) => (
        <Icon name = {'user'} size={40} style={[{color: tintColor}, styles.icon]}/>
      )
  }

  componentWillMount() {
    // before the component mounts - will execute the code
      const ds = new ListView.DataSource({
        rowHasChanged : (r1, r2) => r1 !== r2,
      })
      this.dataSource = ds.cloneWithRows(this.props.people)
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          enableEmptySections={true}
          dataSource={this.dataSource}
          renderRow={(rowData) =>
            <PeopleItem people={rowData} />
          }
        />
      </View>
    );
  }
}

// map props to the state
const mapStateToProps = (state) => {
  return { people: state.people }
};

export default connect(mapStateToProps)(PeopleList);
