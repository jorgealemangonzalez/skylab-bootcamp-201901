import React from 'react'
import '../Search/index.sass'

function Feedback({ message, level }) {
    return <section className={`col-11 ml-5 m-2 alert alert-danger feedback ${level ? `feedback--${level}` : ''}`}>{message}</section>
}

export default Feedback