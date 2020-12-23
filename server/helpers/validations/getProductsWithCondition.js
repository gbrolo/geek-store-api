import Schema from 'validate'

export default new Schema({
  field: {
    type: String,
    required: true    
  },
  value: {    
    required: true    
  },
  search: {
    type: String,
    required: false,
    length: { min: 1, max: 150 }
  },
  page: {
    type: String,
    required: false,
    match: /^[0-9]{1,6}$/
  },
  size: {
    type: String,
    required: false,
    match: /^[0-9]{1,6}$/
  }
})
