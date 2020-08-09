import React, { useState } from 'react'
import styled from 'styled-components'
import { CardElement, injectStripe } from 'react-stripe-elements'
import LoaderButton from './LoaderButton'
import useFormFields from '../hooks/useFormFields'

const Amount = styled.div`
  display: flex;
  & div {
    margin-left: .5em;
  }
`

const Name = styled.div`
  margin: .5em 0;
`

const Input = styled.input`
  width: 100%;
  font-size: 1em;
`

const BillingForm = ({ isLoading, onSubmit, ...props }) => {
  const [fields, handleFieldChange] = useFormFields({
    name: '',
    storage: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCardComplete, setIsCardComplete] = useState(false)
  isLoading = isProcessing || isLoading
  const validateForm = () => {
    return (
      fields.name !== '' &&
      fields.storage !== '' &&
      isCardComplete
    )
  }

  const handleSubmitClick = async (event) => {
    event.preventDefault()
    setIsProcessing(true)
    const { token, error } = await props.stripe.createToken({ name: fields.name })
    setIsProcessing(false)
    onSubmit(fields.storage, { token, error })
  }

  return (
    <form onSubmit={handleSubmitClick}>
      <Amount>
        <Input
          min='0'
          type='number'
          id='storage'
          value={fields.storage}
          onChange={handleFieldChange}
          placeholder='Amount'
        />
        <div>USD</div>
      </Amount>
      <Name>
        <div>Cardholder&apos; name</div>
        <Input
          type='text'
          id='name'
          value={fields.name}
          onChange={handleFieldChange}
          placeholder='Name on the card'
        />
      </Name>
      <div>Credit Card Info</div>
      <CardElement
        onChange={e => setIsCardComplete(e.complete)}
        style={{
          base: { 
            fontSize: '1.1em',
            lineHeight: '2em', 
            fontFamily: 'sans-serif',
            color: 'chartreuse'
          }
        }}
      />
      <LoaderButton
        type='submit'
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Purchase
      </LoaderButton>
    </form>
  )
}

export default injectStripe(BillingForm)
