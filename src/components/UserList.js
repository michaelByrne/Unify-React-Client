import React from 'react';

const UserList = ({users}) => {
  if (users) {
    return (
      <div className="userList">
        { users.map((user, dex) => {
            return user && dex === 0 ? (<div key={user.name} className="user">{user.name}<span className="pill">owner</span></div>)
              : user ? (<div key={user.name} className="user">{user.name}</div>) : ''
          }
        )}
      </div>
    );
  }
};
export default (UserList);
