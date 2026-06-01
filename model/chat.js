const mongoose = require('mongoose')

main()
  .then(() => {
    console.log('connection is set up')
  })
  .catch((err) => {
    console.log(err)
  })

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatapp')
}

const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
