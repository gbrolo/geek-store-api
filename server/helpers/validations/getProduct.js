import Schema from 'validate'

export default new Schema({
  id: {
    type: String,
    required: true,
    length: { min: 1, max: 500 }
  },
})