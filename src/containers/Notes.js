import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { API } from 'aws-amplify'
import { useAppContext } from '../libs/context'
import { onError } from '../libs/error'

const Container = styled.div`
  background: rgba(255,255,255,.4);
  padding: 1em;
  & a {
    text-decoration: none;
  }
`

const Note = styled.div`
  color: #333;
  border: 1px solid black;
  margin: .5em;
  padding: .5em;
`

const Info = styled.div`
  font-size: .5em;
  margin: 0;
`

const Notes = () => {
  const [notes, setNotes] = useState([])
  const { user } = useAppContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const onLoad = async () => {
      if(!user) return
      try {
        const notes = await loadNotes()
        setNotes(notes)
      } catch (e) {
        onError(e)
      }
      setIsLoading(false)
    }

    onLoad()
  }, [user])
  
  const loadNotes = () => API.get('notes', '/notes')

  const renderNotesList = notes => (
    <Container>
      {notes.map((note, i) => (
        <Link key={note.noteId} to={`/notes/${note.noteId}`}>
          <Note>
            <Info>{new Date(note.createdAt).toLocaleString()}</Info>
            {note.content}
          </Note>
        </Link>
      ))}
      <Link to="/notes/new"> 
        <b>{"\uFF0B"}</b> Add New
      </Link>
    </Container>
  )

  const renderInfo = () => <h1>Login to See!</h1>

  const renderNotes = () => (
    <>
    {isLoading || renderNotesList(notes)}
    </>
  )

  return user ? renderNotes() : renderInfo()
}

export default Notes
