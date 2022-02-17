import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function ImageSlider({ sliderData }) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return(
        <div className='pb-5'>
            <Slider {...settings}>
                {sliderData.map((slide) => (
                    <div>
                        <img className='lg:h-[36rem] mx-auto' src={slide.image}/>
                    </div>
                ))}
            </Slider>
        </div>
    )
}