import React from 'react';
import Slider from 'react-slick';

const SliderComponent = ({ arrImages }) => {
   
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000, // Adjust the autoplay speed as per your preference
    };

    return (
        <div className="max-w-2xl max-h-full mx-auto" >
            <Slider {...settings}>
                {arrImages.map((image) => (
                    <div key={image.name}>
                        <img src={image.banner_image_url} alt="slider" style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderComponent;
