import React, {Component} from 'react';

import {siteDetailsQuery} from './SiteDetails';

import {
  gql,
  graphql,
} from 'react-apollo';

import AddUser from './AddUser';

class Sharing extends Component {
  constructor(props) {
    super(props);

    this.state = {credential: props.credential, showAddUser: false};
  }

  componentDidUpdate(prevProps) {
    if (prevProps.credential !== this.props.credential)
      this.setState({credential: this.props.credential});
  }

  toggleAddUser(){
    this.setState({credential: this.props.credential, showAddUser: true});
  }

  deleteSharedWith(evt) {
    const un = evt.currentTarget.dataset.cred;
    this.props.mutate({
      variables: {
        id: this.state.credential.id,
        username: evt.currentTarget.dataset.cred
      },
      optimisticResponse: {
        revokeSharing: {
          username: evt.currentTarget.dataset.cred,
          shared_with: []
        },
      },
      update: (store, {data: {revokeSharing}}) => {
        const data = store.readQuery({query: siteDetailsQuery, variables: {credId: this.state.credential.id}});
        data.credential.shared_with = this.remove(data.credential.shared_with, un);
        store.writeQuery({ query: siteDetailsQuery, variables: {credId: this.state.credential.id}, data });
      },
    })
  };

  remove(array, element) {
    return array.filter(e => e !== element);
  }


  render() {
    if (this.state.credential.shared_with) {
      return (
        <div className="sharing-info">
          <div className="col-head">
            <span className="head-left">Sharing</span>
            <span className="head-right" onClick={this.toggleAddUser.bind(this)}>Invite</span>
          </div>
          <div className="sharing-stuff">
            { this.state.credential.shared_with.map(c =>
              (<div className="sharing-row" key={c}>
                  <span className="share-left">> &nbsp;{c}</span>
                  <span className="share-right" onClick={this.deleteSharedWith.bind(this)}
                        data-cred={c}>Revoke sharing</span>
                </div>
              )
            )}
            {this.state.showAddUser ? (<AddUser cred={this.state.credential} />) : ''}
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="sharing-info">
          <div className="col-head">
            <span className="head-left">Sharing</span>
            <span className="head-right" onClick={this.toggleAddUser.bind(this)}>Invite</span>
          </div>
          <div className="sharing-stuff"><span className="share-left">Not currently shared</span></div>
          {this.state.showAddUser ? (<AddUser cred={this.state.credential} />) : ''}
        </div>
      )
    }

  }
}


const revokeSharingMutation = gql`
  mutation revokeSharing($id: String!, $username: String!) {
    revokeSharing(id: $id, username: $username) {
      username
      shared_with
    }
  }
`;
export default graphql(revokeSharingMutation)(Sharing);