import React, {useState, useEffect} from 'react';
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
    const [Images, setImages] = useState([])
    useEffect(() => {
        
        if(props.detail.image && props.detail.image.length > 0) {
            let images = []
                
            props.detail.image.map(item => (
                    images.push({
                        original: `https://madzon.herokuapp.com/${item}`,
                        thunbnail: `https://madzon.herokuapp.com/${item}`
                    })
    ))
            setImages(images)
        }
    }, [props.detail]) /* props.detail 값이 바뀔때마다 LifeCycle */
    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProductImage

  