import React, {Component} from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import {
  gql,
  graphql,
} from 'react-apollo';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Sharing from './Sharing';
import LoginInfo from './LoginInfo';


class SiteDetails extends Component {
  constructor(props){
    super(props);

    this.state = { showAddUser: false};
  }

  formatTitle(title) {
    if (title.substr(title.length - 4, title.length) === '.com')
      return (title.charAt(0).toUpperCase() + title.slice(1)).substr(0, title.length - 4);
    else
      return title
  }
  
  

  render() {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }
    return (
      <div className="site-detail">

        <div key={this.props.data.credential.website} className="site-header"><h2>{ this.formatTitle(this.props.data.credential.website) }</h2><FontAwesomeIcon
          className="fa-icon-detail"
          icon="share-alt-square" size="lg"/></div>
        <div key={this.props.data.credential.id} className="detail-row">
          <div className="detail-col">
            <LoginInfo credential={this.props.data.credential}/>
          </div>
          {this.props.data.credential.is_owner ? (<div className="detail-col">
            <Sharing credential={this.props.data.credential}/>
          </div>) : <div className="detail-col"></div> }
        </div>

      </div>
    )
  }
}
;


export const siteDetailsQuery = gql`
  query CredentialDetailsQuery($credId : String!) {
    credential(id: $credId) {
      id
      website
      username
      password_id
      shared_with
      shared_by
      is_owner
      owner {
        username
        name
      }
    }
  }
`;

export default (graphql(siteDetailsQuery, {
  options: (props) => ({
    variables: {credId: props.match.params.siteId},
  }),
})(SiteDetails));
