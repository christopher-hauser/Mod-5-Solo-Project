import React, { useState } from 'react';

import './Carousel.css'

export const CarouselItem = ({ children, width, image }) => {
    console.log(image);
    return (
        <div className='carousel-item' style={{width: width}}>
            <img src={image}></img>
        </div>
    )
}


const Carousel = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = newIndex => {
        if (newIndex < 0 ) {
            newIndex = 0;
        }
        else if (newIndex >= React.Children.count(children)) {
            newIndex = React.Children.count(children) - 1;
        }

        setActiveIndex(newIndex);
    }

    return (
        <div className='carousel'>
            <div className='inner' style={{ transform: `translateX(-${activeIndex * 50}%)`}}>
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, {width: "50%" })
                })}
            </div>
            <div className='indicators'>
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
            </div>
        </div>
    )
}

export default Carousel;
