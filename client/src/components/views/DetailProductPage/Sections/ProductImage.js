import React, {useState, useEffect} from 'react';
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
    const [Images, setImages] = useState([])
    useEffect(() => {
        
        if(props.detail.image && props.detail.image.length > 0) {
            let images = []
                
            props.detail.image.map(item => {
                    images.push({
                        original: `http://localhost:5000/${item}`,
                        thunbnail: `http://localhost:5000/${item}`
                    })
            })
            console.log(images)
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

  