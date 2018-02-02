import React from 'react';
import { Button, View, TextInput, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const styles = StyleSheet.create({
  field: {
    borderBottomWidth: 1,
    fontSize: 20,
    marginBottom: 15,
    height: 35,
  },
});

class Login extends React.Component {
  state = {
    values: {
      email: '',
      password: '',
    },
    errors: {},
    isSubmitting: false,
  };

  onChangeText = (key, value) => {
    this.setState(state => ({
      values: {
        ...state.values,
        [key]: value,
      },
    }));
  };

  submit = async () => {
    if (this.state.isSubmitting) {
      return;
    }

    this.setState({ isSubmitting: true });
    let response;
    try {
      response = await this.props.mutate({
        variables: this.state.values,
      });
    } catch (err) {
      console.log(err);
    }

    console.log(response);
    this.setState({ isSubmitting: false });
  };

  render() {
    const { name, password } = this.state.values;
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 200 }}>
          <TextInput
            onChangeText={text => this.onChangeText('name', text)}
            value={name}
            style={styles.field}
            placeholder="name"
          />

          <TextInput
            onChangeText={text => this.onChangeText('password', text)}
            value={password}
            style={styles.field}
            placeholder="password"
            secureTextEntry
          />
          <Button title="Login" onPress={this.submit} />
        </View>
      </View>
    );
  }
}

const LoginMutation = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export default graphql(LoginMutation)(Login);
