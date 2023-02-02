import React from 'react'

const Rating = (props) => {
    const {rating,numReviews}=props;
  return (
    <div className='rating'>
        <span>
            <i className={
                rating>=1?'fas fa-star':rating>=0.5 ?'fas fa-star-half-alt':'fas fa-star'
            }/>
        </span>
        <span>
            <i className={
                rating>=2?'fas fa-star':rating>=0.5 ?'fas fa-star-half-alt':'fas fa-star'
            }/>
        </span>
        <span>
            <i className={
                rating>=3?'fas fa-star':rating>=0.5 ?'fas fa-star-half-alt':'fas fa-star'
            }/>
        </span>
        <span>
            <i className={
                rating>=4?'fas fa-star':rating>=0.5 ?'fas fa-star-half-alt':'fas fa-star'
            }/>
        </span>
        <span>
            <i className={
                rating>=5?'fas fa-star':rating>=0.5 ?'fas fa-star-half-alt':'fas fa-star'
            }/>
        </span>
        <span className='review'>
            {numReviews} reviews
        </span>
        
    </div>

  )
}

export default Rating