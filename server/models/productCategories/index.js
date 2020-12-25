export default mongoose => {
  const schema = mongoose.Schema(
    {
      id: String,
      name: String
    },
    { timestamps: true, collection: 'productCategories' }
  )

  const ProductCategory = mongoose.model('productCategory', schema)
  return ProductCategory
}
