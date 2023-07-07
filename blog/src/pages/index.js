import * as React from "react"
import { Link, graphql } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import SearchBar from "../components/searchbar"
import { unFlattenResults } from "../helpers/unflatten"

const BlogIndex = ({ data, location }) => {
  const {
    localSearchPages: { index, store },
    allMarkdownRemark: { nodes },
  } = data

  const { search } = location
  const query = new URLSearchParams(search).get("s")
  const [searchQuery, setSearchQuery] = React.useState(query || "")

  const siteTitle = data.site.siteMetadata?.title || `Title`
  const results = useFlexSearch(searchQuery, index, store)
  const posts = searchQuery ? unFlattenResults(results) : nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Bio />
        <p>No blog posts found.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    localSearchPages {
      index
      store
    }
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
