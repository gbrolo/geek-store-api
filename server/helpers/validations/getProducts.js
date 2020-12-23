import Schema from 'validate'

export default new Schema({
  search: {
    type: String,
    required: false,
    length: { min: 1, max: 150 }
  },
})