import React from 'react';
import { graphql } from 'gatsby';

import Tag from '../components/Tag';
import SEO from '../components/SEO';

// eslint-disable-next-line react/prop-types
const TagPage = ({ data }) => {
  const { allMarkdownRemark } = data;

  const mapping = {};

  allMarkdownRemark.edges.forEach(({ node }) => {
    const { tags } = node.frontmatter;
    tags.forEach((name) => {
      if (mapping[name]) {
        mapping[name] += 1;
      } else {
        mapping[name] = 1;
      }
    });
  });

  const tags = Array.from(Object.keys(mapping)).sort(
    (b, a) => mapping[a] - mapping[b],
  );

  return (
    <div className="container">
      <div
        className="row"
        style={{
          fontSize: 20,
          margin: 15,
        }}
      >
        {tags.length}
        &nbsp;Tags in Total
      </div>

      <div
        className="row"
        style={{
          marginLeft: 5,
        }}
      >
        {tags.map(item => (
          <Tag name={item} key={item} count={mapping[item]} />
        ))}
      </div>

      <SEO
        title="タグ"
        url="/tags/"
        siteTitleAlt="ぐぬのーど！"
        isPost={false}
        description="タグページ"
        image="https://i.imgur.com/M795H8A.jpg"
      />
    </div>
  );
};

export default TagPage;

export const pageQuery = graphql`
  query getAllTags {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`;
