import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#008080',
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    color: 'white'
  },
})

const Button = (props) => {
  const {
    onPress,
    // 子要素のこと
    // ここでは、<Button></Button>タグ内の文字列
    children,
    style,
    textStyle
  } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      // style合成（後者優先、なければ前者）
      // こうすることで、汎用性をあげることが可能
      style={[styles.button, style]}
    >
      <Text style={[styles.textStyle, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

// SFC(Stateless Functional Component)
export default Button;
