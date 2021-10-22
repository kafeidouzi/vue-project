import React from 'react'

interface Gree {
  name:string
}

const Hello = (props: Gree) => <h1>Hello {props.name}</h1>

export default Hello