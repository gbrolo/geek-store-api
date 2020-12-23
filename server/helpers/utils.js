export const genProductKeywords = (product) => {
  return product.name + ' ' + product.tags.split(',').reduce((tags, tag) => {
    tags += `${tag} `
    return tags
  }, '')
}

export const getPagination = (page, size) => {
  const limit = size ? +size : 8
  const offset = page ? page * limit : 0

  return { limit, offset }
}