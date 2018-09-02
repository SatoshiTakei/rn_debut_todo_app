/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
// @flow によりflowtype適用。型チェッカー。

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import TodoInput from './src/component/TodoInput';
import TodoItem from './src/component/TodoItem';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    
    this.state = {
      list: [],
    }
  }

  // タスク入力
  _onPress = (text) => {
    const list = [].concat(this.state.list);
    
    list.push({
      // Flatlist で受け取るため、ユニークな key を用意する必要あり
      key: Date.now,
      text: text,
      done: false,
    })

    this.setState({
      list,
    });
  }

  // タスク削除（関数を返す関数）
  _delete = (index) => () => {
    const list = [].concat(this.state.list);
    list.splice(index, 1);

    this.setState({
      list,
    })
  }

  // タスクステータス切り替え(done/undo)（関数を返す関数）
  _done = (index) => () => {
    const list = [].concat(this.state.list);
    list[index].done = !list[index].done;

    this.setState({
      list,
    })
  } 

  render() {
    const {
      list,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.main}>
          {/* propsで子に関数を渡している */}
          <TodoInput onPress={this._onPress} />
          <View style={styles.todoListContainer}>
            {/* TodoItemのリストを表示。Flatlistはスクロール対応。 */}
            <FlatList
              style={styles.todoList}
              data={list}
              renderItem={({ item, index }) => (
                <TodoItem
                  onDone={this._done(index)}
                  onDelete={this._delete(index)}
                  {...item}
                  />
              )}
              />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // RN頻出。CSSにはない。画面割合。
    flex: 1,
    backgroundColor: '#333',
    paddingTop: 40,
    alignItems: 'center',
  },
  main: {
    flex: 1,
    maxWidth: 400,
    alignItems: 'center',
  },
  todoListContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  todoList: {
    paddingLeft: 10,
    paddingRight: 10,
  }
});
