import { nextTestSetup } from 'e2e-utils'

describe('serverMinification', () => {
  describe('disabled', () => {
    const { next } = nextTestSetup({
      files: __dirname + '/fixtures/disabled',
    })

    it('keeps server class names', async () => {
      const $ = await next.render$('/')
      expect($('#reaction').text()).toBe('Reaction')
      expect($('#comment').text()).toBe('Comment')
    })
  })

  describe('enabled by default', () => {
    const { next, isNextDev } = nextTestSetup({
      files: __dirname + '/fixtures/default',
    })

    it('mangles server class names in production', async () => {
      const $ = await next.render$('/')
      const reaction = $('#reaction').text()
      const comment = $('#comment').text()

      if (isNextDev) {
        expect(reaction).toBe('Reaction')
        expect(comment).toBe('Comment')
      } else {
        expect(reaction).not.toBe('Reaction')
        expect(comment).not.toBe('Comment')
        expect(reaction).not.toBe(comment)
      }
    })
  })
})
