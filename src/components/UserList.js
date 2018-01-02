import React, {Component} from 'react';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUser: undefined
    }
  }
  
  

  userSelected(event){
    this.setState({selectedUser: event.currentTarget.dataset.test});
  }

  isSelected(id){
    return id === this.state.selectedUser;

  }


  render() {
    if(this.props.users){
      return (
        <div className="userList">
          { this.props.users.map((user,dex) =>
          {return user && dex === 0 ? (<div key={user} className="user">{user}<span className="pill">owner</span></div>)
            : user ? (<div key={user} className="user">{user}</div>) : ''}
          )}
        </div>
      );
    }
    else{
      return null;
    }

  }
};
export default (UserList);
