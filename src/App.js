import React, {Component} from 'react';
import unifyid from './assets/unifyid.png';
import {Link} from 'react-router-dom';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactCSSTransitionReplace from 'react-css-transition-replace';



import fontawesome from '@fortawesome/fontawesome'
import {faCheckSquare, faCoffee, faAngleRight, faLock, faShareAltSquare} from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faCheckSquare, faCoffee, faAngleRight, faLock, faShareAltSquare);

import './App.css';
import SitesListWithData from './components/SitesListWithData';
import NotFound from './components/NotFound';
import SiteDetails from './components/SiteDetails';


import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  toIdValue,
} from 'react-apollo';


const networkInterface = createNetworkInterface({uri: 'https://tranquil-bastion-83151.herokuapp.com/graphql'});
networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

function dataIdFromObject(result) {
  if (result.__typename) {
    if (result.id !== undefined) {
      var x = `${result.__typename}:${result.id}`;
      return x;
    }
  }
  return null;
}

const client = new ApolloClient({
  networkInterface,
  customResolvers: {
    Query: {
      credential: (_, args) => {
        return toIdValue(dataIdFromObject({__typename: 'Cred', id: args['id']}))
      },
    },
  },
  dataIdFromObject,
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {list: '1'}
  }

  setFilter(event) {
    this.setState({list: event.currentTarget.dataset.id});
  }

  isSelected(id) {
    return id === this.state.list;
  }

  render() {
    // this.props.mutate({
    //   variables: {
    //     fakeArg: 1
    //   }
    // });


    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <div className="App-header">
              <Link to={'/'}><img width="90em" role="presentation" src={unifyid}/></Link>
            </div>
            <div className="App-body">
              <ul className="side-nav">
                <li data-id="1" onClick={this.setFilter.bind(this)}
                    className={'nav-item' + ('1' === this.state.list ? '--selected' : '')}>All
                </li>
                <li data-id="2" onClick={this.setFilter.bind(this)}
                    className={'nav-item' + ('2' === this.state.list ? '--selected' : '')}>Shared with me
                </li>
                <li data-id="3" onClick={this.setFilter.bind(this)}
                    className={'nav-item' + ('3' === this.state.list ? '--selected' : '')}>Owner
                </li>
              </ul>

              
              <SitesListWithData key={this.state.list} list={this.state.list}/>
              <Route render={({location}) => (
                <ReactCSSTransitionGroup
                  transitionName="slide"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}>
                  <div key={location.pathname} className="site-route">
                    <Switch location={location}>
                      <Route path="/site/:siteId" component={SiteDetails}/>
                      <Route component={ NotFound }/>
                    </Switch>
                  </div>
                </ReactCSSTransitionGroup>
              )}/>
            </div>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
