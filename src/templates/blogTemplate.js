import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
// styles
import {
  headerImage,
  imageWrapper,
  titleWrapper,
  blogPost,
  content,
} from "./blogTemplate.module.scss"

export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const featuredImageFluid = frontmatter.featuredImage.childImageSharp.fluid

  console.log(featuredImageFluid)
  return (
    <div className="blog-post-container">
      <div className={blogPost}>
        <div className={imageWrapper}>
          <div className={titleWrapper}>
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <h3>by Nick Holke</h3>
          </div>
          <Img className={headerImage} fluid={featuredImageFluid} />
        </div>
        <div className={content} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
