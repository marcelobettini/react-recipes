import React from 'react'
export default function Instructions({ title, steps }) {
  return (
    <section className='instructions'>
      <h3>{title}</h3>
      {steps.map((step, i) => (
        <p key={i}>{step}</p>
      ))}
    </section>
  )
}