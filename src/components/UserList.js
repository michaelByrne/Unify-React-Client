import React from 'react';

const UserList = ({users}) => {
  if (users) {
    return (
      <div className="userList">
        { users.map((user, dex) => {
            return user && dex === 0 ? (<div key={user} className="user">{user}<span className="pill">owner</span></div>)
              : user ? (<div key={user} className="user">{user}</div>) : ''
          }
        )}
      </div>
    );
  }
};
export default (UserList);
