import { useFormik } from 'formik'
import filter from 'leo-profanity'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { ArrowRightSquare } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'

import { useSentMessageMutation } from '/src/api/messages.js'

export const NewMessageForm = ({ channel }) => {
  const { t } = useTranslation()
  const { username } = useSelector(state => state.auth)
  const inputRef = useRef(null)

  const [sentMessage] = useSentMessageMutation()

  const f = useFormik({
    initialValues: { body: '' },
    onSubmit: async ({ body }) => {
      const message = {
        body: filter.clean(body),
        channelId: channel.id,
        username,
      }
      await sentMessage(message)
      f.resetForm()
      inputRef.current.focus()
    },
    validateOnBlur: false,
  })

  useEffect(() => {
    inputRef.current.focus()
  }, [channel, f.isSubmitting])

  const isInvalid = !f.dirty || !f.isValid

  return (
    <Form noValidate onSubmit={f.handleSubmit} className="border rounded-2">
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          ref={inputRef}
          onChange={f.handleChange}
          onBlur={f.handleBlur}
          value={f.values.body}
          name="body"
          aria-label={t('chat.newMessage')}
          disabled={f.isSubmitting}
          placeholder={t('chat.placeholder')}
          className="border-0 p-0 ps-2"
        />
        <Button variant="group-vertical" type="submit" disabled={isInvalid}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('chat.send')}</span>
        </Button>
      </InputGroup>
    </Form>
  )
}
