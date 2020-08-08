import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { API } from 'aws-amplify'
import { s3Upload } from '../libs/aws'
import { onError } from '../libs/error'
import config from '../config'
import LoaderButton from '../components/LoaderButton'

const Form = styled.form`
  width: 50%;
  margin: 1em auto;
  display: flex;
  flex-direction: column;
  & textarea {
    width: 100%;
    height: 7em;
  }
  & button {
    text-align: center;
    font-size: 1em;
  }
`

const NewNote = () => {
  const history = useHistory()
  const file = useRef(null)
  
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => content.length > 0

  const handleFileChange = (event) => {
    file.current = event.target.files[0]
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      )
      return
    }
    setIsLoading(true)
    try {
      const attachment = file.current ? await s3Upload(file.current) : null
      await createNote({ content, attachment })
      history.push('/notes')
    } catch (e) {
      onError(e)
      setIsLoading(false)
    }
  }

  const createNote = (note) => API.post('notes', '/notes', { body: note })

  return (
    <div className='NewNote'>
      <Form onSubmit={handleSubmit}>
        <div>
          <textarea
            id='content'
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <div>
          <input
            type='file'
            id='file'
            onChange={handleFileChange}
          />
        </div>
        <LoaderButton type='submit' isLoading={isLoading} disabled={!validateForm()}>
          Create
        </LoaderButton>
      </Form>
    </div>
  )
}

export default NewNote
