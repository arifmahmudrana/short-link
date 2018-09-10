import React from "react";
import LinkList from './LinkList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinkListFilters from './LinkListFilters';

const Link = () => (
  <div>
    <PrivateHeader title="Your Links" />
    <div className="wrapper">
      <LinkListFilters />
      <AddLink />
      <LinkList />
    </div>
  </div>
);

export default Link;
