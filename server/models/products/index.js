export default (mongoose, mongoosePaginate) => {
  const schema = mongoose.Schema(
    {
      sku: String,
      name: String,
      tags: String,
      price: Number,
      stock: Number,
      brand: String,
      images: Array,
      category: String,
      featured: Boolean,
      salePrice: Number,
      description: String,
      searchKeywords: String
    },
    { timestamps: true }
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  schema.plugin(mongoosePaginate)

  const Product = mongoose.model('product', schema)
  return Product
}
