const fs = require('fs')
const mongoose = require('mongoose')
const parser = require('ss-parser').default
const superscript = require('superscript').default

const getBot = ({ db, src, tmp }) => (
  new Promise((resolve, reject) => {
    parser.parseDirectory(src, (err, result) => {
      if (err) return reject(err)

      fs.writeFile(tmp, JSON.stringify(result, null, 4), (err) => {
        if (err) return reject(err)

        // Main entry point
        superscript.setup({ mongoose, importFile: tmp }, (err, bot) => {
          if (err) return reject(err)

          resolve(bot)
        })
      })
    })
  })
)

const getReply = (bot, user, message) => (
  new Promise((resolve, reject) => {
    bot.reply(user, message, (err, result) => {
      if (err) return reject(err)

      resolve(result.string)
    })
  })
)


const connect = uri => (
  new Promise((resolve, reject) => {
    mongoose.Promise = Promise

    const options = {
      server: {
        auto_reconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
      },
    }

    mongoose.connect(uri, options)

    mongoose.connection
      .once('open', resolve)
      .on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
          console.log(e)

          mongoose.connect(uri, options)
        }

        console.log(e)
        reject(e)
      })
  })
)

const chat = async messages => {
  const user = `test${Date.now()}${Math.ceil(Math.random() * 100 % 100)}`
  await connect(`mongodb://localhost/${user}`)

  const bot = await getBot({
    src:`${__dirname}/../chat`,
    tmp: `${__dirname}/.data.tmp.json`,
  })
  const conversation = []

  for (let i=0; i < messages.length; i++) {
    const you = messages[i]
    try {
      const ash = await getReply(bot, user, you)
      console.log(you, ':=> ', ash)
      conversation.push({
        ash,
        you,
      })
    } catch(err) {
      console.error(err.message)
    }
  }

  mongoose.disconnect()
  // db.connection.db.dropDatabase()
  return conversation
}
module.exports = chat
