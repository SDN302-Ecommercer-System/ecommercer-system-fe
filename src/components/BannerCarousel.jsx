import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export function BannerCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <img src='/img/banner-image.png' alt="Slide 1" className='object-cover'/>
        </div>

        <div className="embla__slide">
          <img src='/img/banner-image-2.png' alt="Slide 2" className='object-cover'/>
        </div>

        <div className="embla__slide">
          <img src='/img/banner-image-3.png' alt="Slide 3" className='object-cover'/>
        </div>
      </div>
    </div>
  )
}
