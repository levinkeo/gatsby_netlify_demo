import React from 'react';
import PropTypes from 'prop-types';

const Post = (data) => (
  <div>
    <h1>{data.pageContext.title}</h1>
    <div dangerouslySetInnerHTML={{__html: data.pageContext.body}}></div>
  </div>
);

export default Post;