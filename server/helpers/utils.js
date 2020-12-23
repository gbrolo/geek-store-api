export const genProductKeywords = (product) => {
  return product.name + " " + product.tags.split(",").reduce((tags, tag) => {
    tags += `${tag} `
    return tags
  }, '')
}