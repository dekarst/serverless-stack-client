import React, { useRef, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { API, Storage } from 'aws-amplify'
import { s3Upload } from '../libs/aws'
import { onError } from '../libs/error'
import config from '../config'
import LoaderButton from '../components/LoaderButton'

const Form = styled.form`
  width: 80%;
  margin: 1em auto;
  display: flex;
  flex-direction: column;
  & textarea {
    width: 100%;
    height: 10em;
  }
  & button {
    font-size: 1em;
  }
`

const Note = () => {
  const { id } = useParams()
  const history = useHistory()
  const file = useRef(null)

  const [note, setNote] = useState(null)
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const loadNote = () => API.get('notes', `/notes/${id}`)
    const onLoad = async () => {
      try {
        const note = await loadNote()
        const { content, attachment } = note
        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment)
        }
        setContent(content)
        setNote(note)
      } catch (e) {
        onError(e)
      }
    }
    onLoad()
  }, [id])

  const validateForm = () => content.length > 0

  const isImage = (name) => name && name.match(/.(jpg|jpeg|png|gif|svg)$/i)

  const formatFilename = (str) => str.replace(/^\w+-/, '')
  
  const handleFileChange = (event) => {
    file.current = event.target.files[0]
  }

  const saveNote = (note) => API.put('notes', `/notes/${id}`, { body: note })
  
  const handleSubmit = async (event) => {
    let attachment
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
      if (file.current) {
        attachment = await s3Upload(file.current)
      }
      await saveNote({
        content,
        attachment: attachment || note.attachment
      })
      history.push('/notes')
    } catch (e) {
      onError(e)
      setIsLoading(false)
    }
  }
  
  const handleDelete = async (event) => {
    event.preventDefault()
    const confirmed = window.confirm(
      'Are you sure you want to delete this note?'
    )
    if (!confirmed) {
      return
    }
    setIsDeleting(true)
  }
  
  return (
    <div>
      {note && (
        <Form onSubmit={handleSubmit}>
          <textarea 
            value={content}
            onChange={e => setContent(e.target.value)}
          />

          <div>
            {isImage(note.attachment) && <img alt='note-img' src={note.attachmentURL} />}
          </div>

          {note.attachment && (
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={note.attachmentURL}
            >
              {formatFilename(note.attachment)}
            </a>
          )}

          <div>
            <input onChange={handleFileChange} type='file' />
          </div>

          <LoaderButton
            onClick={handleSubmit} 
            type='submit' 
            isLoading={isLoading} 
            disabled={!validateForm()}
            >
            Save
          </LoaderButton>
          <LoaderButton onClick={handleDelete} isLoading={isDeleting}>
            Delete
          </LoaderButton>
        </Form>
      )}
    </div>
  )
}

export default Note
