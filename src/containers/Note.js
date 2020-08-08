import React, { useRef, useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { API, Storage } from 'aws-amplify'
import { onError } from '../libs/error'
import config from '../config'
import LoaderButton from '../components/LoaderButton'

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

  const formatFilename = (str) => str.replace(/^\w+-/, '')
  
  const handleFileChange = (event) => {
    file.current = event.target.files[0]
  }
  
  const handleSubmit =  async (event) => {
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
    <div className='Notes'>
      {note && (
        <form onSubmit={handleSubmit}>
          <div id='content'>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
          {note.attachment && (
            <form>
              Attachment
              <div>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={note.attachmentURL}
                >
                  {formatFilename(note.attachment)}
                </a>
                </div>
            </form>
          )}
          <form id='file'>
            {!note.attachment && <label>Attachment</label>}
            <input onChange={handleFileChange} type='file' />
          </form>
          <LoaderButton
            type='submit'
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  )
}

export default Note
