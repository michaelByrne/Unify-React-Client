import React from 'react';
import { gql, graphql } from 'react-apollo';

import { sitesListQuery } from './SitesListWithData';

const AddSite = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      mutate({ 
        variables: { name: evt.target.value },
        optimisticResponse: {
          addSite: {
            name: evt.target.value,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Site',
          },
        },
        update: (store, { data: { addSite } }) => {
            // Read the data from the cache for this query.
            const data = store.readQuery({ query: sitesListQuery });
            // Add our channel from the mutation to the end.
            data.sites.push(addSite);
            // Write the data back to the cache.
            store.writeQuery({ query: sitesListQuery, data });
          },
      });
      evt.target.value = '';
    }
  };

  return (
    
    <input
      type="text"
      placeholder="New site"
      onKeyUp={handleKeyUp}
    />
  );
};

const addSiteMutation = gql`
  mutation addSite($name: String!) {
    addSite(name: $name) {
      id
      name
    }
  }
`;


const AddSiteWithMutation = graphql(
  addSiteMutation,
)(AddSite);

export default AddSiteWithMutation;