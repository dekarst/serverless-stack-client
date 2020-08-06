import { useState } from 'react'

const useFormFields = (initialState) => {
  const [fields, setFields] = useState(initialState)

  return [
    fields,
    function(event) {
      setFields({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ]
}

export default useFormFields
