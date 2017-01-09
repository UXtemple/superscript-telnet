const chat = require('./chat.js')

const messages = {
  'should onboard designers': [
    'onboarding',
    'tom',
    'designer',
  ],
  // 'should onboard developers': [
  //   'onboarding',
  //   'dario',
  //   'developer',
  // ]
}

describe('onboarding', () => {
  Object.keys(messages).forEach(title => {
    it(title, async () => {
      const conversations = await chat(messages[title])
      expect(conversations).toMatchSnapshot()
    })
  })
})
