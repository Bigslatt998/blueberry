import React, {useState, useEffect} from 'react'
import './Star.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar, faUser as farUser } from '@fortawesome/free-regular-svg-icons'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { db } from '../../../firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// type Props = {}
interface StarRatingProps{
    initialRating?: number;
    onRatingChange?: (rating: number) => void;
    // size?: number;
    color?: string;
    className?: string;
    productName: string;
}

const StarRating: React.FC<StarRatingProps> =({
    initialRating = 0,
    onRatingChange,
    // size = 24,
    color = '#718ff1',
    className= '',
    productName
}) => {
    const [rating, setRating] = useState(initialRating)
    const [hover, setHover] = useState(0)
    const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate();

     // Listen for auth state changes
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])

  // Load rating from Firestore on mount or when user/productId changes
  useEffect(() => {
    const fetchRating = async () => {
      if (!user) return
      try {
        const ratingDocRef = doc(db, 'ratings', `${user.uid}_${productName}`)
        const docSnap = await getDoc(ratingDocRef)
        if (docSnap.exists()) {
          setRating(docSnap.data().rating)
        }
      } catch (error) {
        console.error('Error loading rating:', error)
      }
    }
    fetchRating()
  }, [user, productName])

    const saveRating = async (newRating: number) => {
    if (!user) return
    try {
      const ratingDocRef = doc(db, 'ratings', `${user.uid}_${productName}`)
      await setDoc(ratingDocRef, {
        userId: user.uid,
        productName,
        rating: newRating,
        updatedAt: new Date()
      })
    } catch (error) {
      console.error('Error saving rating:', error)
    }
  }
  
      const handleClick = (newRating: number) => {
    if (!user) {
      Swal.fire({
      icon: 'warning',
      title: 'Please log in',
      text: 'You need to log in to rate products.',
      confirmButtonText: 'Go to Login'
    }).then(result => {
      if (result.isConfirmed) {
        navigate('/login');
      }
    });
    return;
    }
    setRating(newRating)
    if (onRatingChange) {
      onRatingChange(newRating)
    }
    saveRating(newRating)
  }

    return (
   <div className={`star ${className}`}>
        {[...Array(5)].map((_, idx) => {
            const ratingValue = idx + 1;

            return (
                <label key={idx} className='StarLabel'>
                    <input type='radio'
                            name={`rating-${productName}`}
                            value={ratingValue}
                            checked={rating === ratingValue}
                            onChange={() => handleClick(ratingValue)}/>
                <i ><FontAwesomeIcon icon={ratingValue <= (hover || rating ) ? faStar : farStar}
                    color={ratingValue <= (hover || rating ) ? color: 'black'}
                     onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}/></i>
                    
                </label>
            )
        })}
    </div>
  )
                // <i><FontAwesomeIcon icon={farStar}/></i>
}

export default StarRating

// color={ratingValue <= (hover || rating ) ? color: 'green'}
//                 size={size} onMouseEnter={() => setHover(ratingValue)}
//                 onMouseLeave={() => setHover(0)}