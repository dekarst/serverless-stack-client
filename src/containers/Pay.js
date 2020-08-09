import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { API } from 'aws-amplify'
import { Elements, StripeProvider } from 'react-stripe-elements'
import BillingForm from '../components/BillingForm'
import { onError } from '../libs/error'
import config from '../config'

const Container = styled.div`
  background: rgba(255,255,255,.4);
  padding: 1em;
  & a {
    text-decoration: none;
  }
`

const Pay = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    setStripe(window.Stripe(config.STRIPE_KEY))
  }, [])

  const billUser = (details) => API.post('notes', '/billing', { body: details })

  const handleFormSubmit = async (storage, { token, error }) => {
    if (error) {
      onError(error)
      return
    }
    setIsLoading(true)
    try {
      await billUser({
        storage,
        source: token.id
      })
      alert("Your card has been charged successfully!")
      history.push("/")
    } catch (e) {
      onError(e)
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <StripeProvider stripe={stripe}>
        <Elements>
          <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
        </Elements>
      </StripeProvider>
    </Container>
  )
}

export default Pay
