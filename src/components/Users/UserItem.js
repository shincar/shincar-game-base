import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  render() {
    const { user, loading } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>載入中 ...</div>}

        {user && (
          <div>
            <span>
              <strong>使用者識別:</strong> {user.uid}
            </span>
            <span>
              <strong>電子郵件信箱:</strong> {user.email}
            </span>
            <span>
              <strong>使用者名稱:</strong> {user.username}
            </span>
            <span>
              <button
                type="button"
                onClick={this.onSendPasswordResetEmail}
              >
                寄出重設密碼郵件
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(UserItem);