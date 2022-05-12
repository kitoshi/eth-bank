import React, { ChangeEvent } from 'react'
export default function TestFunc() {
  const [value, setValue] = React.useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <>
      <h1>Hi {value} 👋</h1>
      <input value={value} onChange={handleInputChange} />
    </>
  )
}
