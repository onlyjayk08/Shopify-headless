import Image from 'next/image'
import ProductForm from './ProductForm'
import RecommendedList from './RecommendedList'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductPageContent({ product }) {

  const images = []

  product.images.edges.map((image, i) => {
    images.push(
      // <SwiperSlide key={`slide-${i}`}>
      //   <Image src={image.node.originalSrc} alt={image.node.altText} layout="fill" objectFit="cover" />
      // </SwiperSlide>
      {
        src: images.node? image.node.originalSrc: "",
        key: `image-${i}`
      }
    )
  })

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <div>
        <div>
          <div className='pb-10'>
            <Slider {...settings}>
              {images.map((slide) => (
                <div key={slide.key}>
                  <img className='lg:h-[36rem] mx-auto' src={slide.src} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <ProductForm product={product} />
      </div>
      <div>
        {
        product.collections.edges[0] ?
        <RecommendedList current={product.id} products={product.collections.edges[0].node.products.edges}/>:
        null 
        }
        
      </div>
    </div>
  )
}
