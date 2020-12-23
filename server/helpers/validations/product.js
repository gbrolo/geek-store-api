import Schema from 'validate'

export default new Schema({
  sku: {
    type: String,
    required: true,
    match: /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9\?\¿\!\¡\(\)\:\"\'\`\_\*\-\/]{1,20}$/
  },
  name: {
    type: String,
    required: true,
    match: /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9\?\¿\!\¡\(\)\:\"\'\`\_\*\-\/ ]{5,75}$/
  },
  tags: {
    type: String,
    required: true,
    match: /^([a-zA-ZÀ-ÿ\u00f1\u00d10-9\?\¿\!\¡\(\)\:\"\'\`\_\*\-\/,]*){1,150}$/
  },
  price: {
    type: Number,
    required: true,
    size: { min: 0, max: 1000000 }
  },
  stock: {
    type: Number,
    required: true,
    size: { min: 0, max: Infinity }
  },
  brand: {
    type: String,
    required: false,
    match: /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9\?\¿\!\¡\(\)\:\"\'\`\_\*\-\/ ]{0,15}$/
  },
  images: {
    type: Array,
    required: true,
    each: {
      match: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/
    }
  },
  category: {
    type: String,
    required: true,
    match: /^[A-Z0-9\_\-]{2,40}$/
  },
  featured: {
    type: Boolean,
    required: true
  },
  salePrice: {
    type: Number,
    required: false,
    size: { min: 0, max: 1000000 }
  },
  description: {
    type: String,
    required: true,
    match: /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9\?\¿\!\¡\%\$\#\@\(\)\:\.\n,\"\'\`\_\*\;\^\&\=\+\-\/ ]{5,3000}$/
  }
})
