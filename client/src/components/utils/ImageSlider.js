import React from 'react'
import {Carousel} from 'antd';

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {props.image.map((item, index) =>
                (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }} 
                        src={`https://madzon.herokuapp.com/${item}`} />

                    </div>
                ))}
             </Carousel>
        </div>
    )
}

export default ImageSlider
