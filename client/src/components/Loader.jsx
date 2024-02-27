import React from 'react'
import GifLoader from '../images/loading.gif';

const Loader = () => {
  return (
    <div className='loader'>
    <div className="loader__image">
        <img src={GifLoader} alt="" />
    </div>
</div>
  )
}

export default Loader