export const unFlattenResults = results =>
  results.map(post => {
    const { slug, excerpt, date, title, description } = post
    return {
      excerpt,
      fields: { slug },
      frontmatter: { date, title, description },
    }
  })
