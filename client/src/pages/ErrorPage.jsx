import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className='error-page'>
      <div className="center">
        <Link to='/' className='btn primary'>Volver a la tienda</Link>
        <h2>Página no encontrada</h2>
      </div>
    </section>
  )
}

export default ErrorPage