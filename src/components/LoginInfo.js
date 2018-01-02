import React, {Component} from 'react';


class LoginInfo extends Component {
  constructor(props){
    super(props);

    this.state = {credential: props.credential};
  }

  render() {

    
    return (
      <div className="login-info">
        <div className="col-head">
          <span className="head-left">Login Info</span>
          <span className="head-right">Edit</span>
        </div>
        <div className="user-stuff">
          <div>URL</div>
          <div className="list-small">{this.props.credential.website}</div><br/>
          {this.props.credential.is_owner ? (<div>User Name</div>) : (<div>User Name (Account Lender)</div>)}
          <div className="list-small">{this.props.credential.username}</div><br/>
          <div>Password</div>
          <div className="list-small">{this.props.credential.password_id}</div><br />
          {!this.props.credential.is_owner ? (
            <div>
              <div>Authorization date</div> <div className="list-small">01/01/1900</div><br />
              <div>Authorization expiration</div> <div className="list-small">unlimited</div><br />
            </div>
          ) : ''}
        </div>

      </div>
    )
  }
}

export default LoginInfo