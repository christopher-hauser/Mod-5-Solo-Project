import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { deleteOneImage } from '../store/images'

import './Carousel.css'

export const CarouselItem = ({ children, width, image }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)

    return (
        <div className='carousel-item' style={{ width: width }}>
            <img src={image.image}></img>
            {user?.id === image.userId && !image.profileImg && (
                <button type="button" id='delete-image'
                    onClick={async (e) => {
                        e.preventDefault();
                        const deleted = await dispatch(deleteOneImage(image))
                            .catch(async res => {
                                return res
                            })
                        if (deleted) {
                            history.push(`/spots/${image.spotId}`);
                        }
                    }}
                >Delete
                </button>
            )}

            {user?.id === image.userId && image.profileImg && (
                <NavLink to={`/spots/${image.spotId}/update`}>
                    Profile Image
                </NavLink>
            )}
        </div>
    )
}


const Carousel = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = newIndex => {
        if (newIndex < 0) {
            newIndex = 0;
        }
        else if (newIndex === React.Children.count(children) - 1) {
            newIndex = React.Children.count(children) - 2;
        }

        setActiveIndex(newIndex);
    }

    return (
        <div className='carousel'>
            <div className='inner' style={{ transform: `translateX(-${activeIndex * 50}%)` }}>
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, { width: "50%" })
                })}
            </div>
            <div className='indicators'>
                <>
                    <button id='click-left' onClick={() => {
                        updateIndex(activeIndex - 1);
                    }}>
                        {'<'}
                    </button>
                    <button id='click-right' onClick={() => {

                        updateIndex(activeIndex + 1);

                    }}>
                        {'>'}
                    </button>
                </>
            </div>
        </div>
    )
}

export default Carousel;
