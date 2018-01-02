import React, {Component} from 'react';

import {Link} from "react-router-relative-link";

import {
  gql,
  graphql,
} from 'react-apollo';

import facebook from '../fb.png';
import reddit from '../assets/reddit.png';
import google from '../assets/google.png';
import netflix from '../assets/netflix.png';
import youtube from '../assets/youtube.png';
import unilogo from '../assets/unilogo.png';

import UserList from './UserList';



class SitesList extends Component {
  constructor(props) {
    super(props);
    this.state = {filterSelection: props.list || undefined, searchFilter: ''};
  }

  componentDidUpdate(prevProps){
    if(prevProps.list !== this.props.list)
      this.setState({filterSelection: this.props.list});
  }


  userSelected(event) {
    this.setState({selectedId: event.currentTarget.dataset.id});
  }

  isSelected(id) {
    return id === this.state.selectedUser;
  }

  filterList(item, filter){
    switch(this.state.filterSelection){
      case('2'):
        return !item.is_owner;
      case('3'):
        return item.is_owner;
      default:
        return true
    }
  }

  generateIcon(credential){
    switch(true){
      case credential.website.indexOf('facebook') > -1:
        return <img src={facebook} role="presentation" className="con" />;
      case credential.website.indexOf('youtube') > -1:
        return <img src={youtube} role="presentation" className="con" />;
      case credential.website.indexOf('reddit') > -1:
        return <img src={reddit} role="presentation" className="con" />;
      case credential.website.indexOf('google') > -1:
        return <img src={google} role="presentation" className="con" />;
      case credential.website.indexOf('netflix') > -1:
        return <img src={netflix} role="presentation" className="con" />;
      default:
        return <img src={unilogo} role="presentation" className="con" />;

    }
  }

  formatSiteName(title) {
    if (title.substr(title.length - 4, title.length) === '.com')
      return (title.charAt(0).toUpperCase() + title.slice(1)).substr(0, title.length - 4);
    else
      return title
  }

  handleInput(event){
    this.setState({searchFilter: event.target.value});
  }


  render() {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred. (Odds are the server was restarted and you need to refresh the client with new data by reloading the home page.)</div>)
    }
    return (

      <div className="sitesList">
        <input
          type="text"
          placeholder="Search"
          className="search-box"
          onChange={this.handleInput.bind(this)}
        />
        { this.props.data.credentials.filter(item => this.filterList(item, this.state.filterSelection)).filter(c => c.website.indexOf(this.state.searchFilter) > -1).map(st =>
          (
            <div key={st.id} className={'site' + (st.id === this.state.selectedId ? '--selected' : '')}
                 >
              { this.generateIcon(st) }
              <Link to={st.id.length < 1 ? `/` : `../../site/${st.id}`} onClick={this.userSelected.bind(this)} className="site-link" data-id={st.id}>
                <span className="siteName">{st.website.charAt(0).toUpperCase() + st.website.slice(1)}</span>
              </Link>
              <UserList users={[st.owner.username].concat(st.shared_with)} />
            </div>)
        )}
      </div>
    )
  }
}

export const credentialListQuery = gql`
  query CredentialListQuery {
    credentials {
      id
      website
      username
      password_id
      lender_user_id
      shared_with
      shared_by
      is_owner
      is_shared
      owner {
        username
        name
      }
    }
  }
`;


export default (graphql(credentialListQuery, {
  options: {pollInterval: 5000}
})(SitesList));