import React from "react"
import { useEffect, useState } from "react"

export default function Form () {
  const loginForm = { username: "", password: "" }
  const [formData, setFormData] = useState(loginForm)
  const [loginInfo, setInfo] = useState('')

  function handleChange (event) {
    const { name, value } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  function handleSubmit (e) {
    e.preventDefault()
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }
    fetch('http://localhost:4000/login', options)
      .then(res => res.json())
      .then(res => {
        if (res.error) setInfo(res.error)
        if (res.token) {
          setInfo(res.token)
          localStorage.setItem('token', res.token)
          const userToken = localStorage.getItem('token')
          console.log('user token:', userToken)
        }
        setFormData(loginForm)
      })

  }


  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          placeholder="Username"
          onChange={ handleChange }
          name="username"
          value={ formData.username }
        />
        <input
          type="password"
          placeholder="Password"
          onChange={ handleChange }
          name="password"
          value={ formData.password }
        />
        <button>Login</button>
      </form>
      <p className="info">{ loginInfo }</p>
    </main>

  )
}
