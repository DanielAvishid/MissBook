import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews, onDeleteReview }) {
  return (
    <ul className='review-list'>
      {reviews.map(review => (
        <li key={review.id}>
          <ReviewPreview review={review} onDeleteReview={onDeleteReview} />
        </li>
      ))}
    </ul>
  )
}
