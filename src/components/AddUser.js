import React, { Component } from 'react';
import {gql, graphql} from 'react-apollo';
import {siteDetailsQuery} from './SiteDetails';
import {withRouter} from 'react-router';



class AddUser extends Component {
  constructor(props){
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var usrs = [];
    var sw = this.props.cred.shared_with || [];
    usrs = sw.filter(x => true);
    usrs.push(this.state.value);

    this.props.mutate({
      variables: {
        credentialId: this.props.match.params.siteId,
        name: this.state.value
      },
      update: (store, {data: {addUserToCredential}}) => {
        var data = store.readQuery({query: siteDetailsQuery, variables: {credId: this.props.match.params.siteId}});
        var sharedCopy = data.site.shared_with.filter(m => true);
        sharedCopy.push({id: "999999", name: this.state.value, __typename: "User"});
        data.site.shared_with = sharedCopy;
        console.log(sharedCopy)
        store.writeQuery({ query: siteDetailsQuery, variables: {credId: this.props.match.params.siteId}, data });
      },
    });
  };

  render() {



    return (
      <div className="userInput">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add user to credential"
            value={this.state.value}
            className="new-user-field"
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" className="share-btn"  />
        </form>
      </div>
    );
  }
};

const addUserMutation = gql`
  mutation addUserToCredential($credentialId: String!, $name: String!) {
    addUserToCredential(id: $credentialId, user: {name: $name}) {
      website
    }
  }
`;

const AddUserWithMutation = graphql(
  addUserMutation,
)(withRouter(AddUser));
export default AddUserWithMutation;
