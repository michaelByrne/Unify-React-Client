import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';


const SitePreview = ({ data: {loading, error, site } }) => {
  return (
    <div>
      <div className="siteName">
        {site ? site.name : 'Loading...'}
      </div>
      <div>Loading Users</div>
    </div>
  );
};
export const siteQuery = gql`
  query SiteQuery($siteId : ID!) {
    site(id: $siteId) {
      id
      name
    }
  }
`;
export default (graphql(siteQuery, {
  options: (props) => ({
    variables: { siteId: props.siteId },
  }),
})(SitePreview));
