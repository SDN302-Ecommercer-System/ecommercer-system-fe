import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useLocation } from 'react-router-dom';

export function BannerCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()])
    //get router access the page
    const location = useLocation();

  return (
    location.pathname === '/' && <div className="embla" ref={emblaRef}>
      <div className="embla__container">

        {/* picture 1 */}
        <div className="embla__slide">
          <img src='/img/banner-image.png' alt="Slide 1" className='object-cover'/>
        </div>

        {/* picture 2 */}
        <div className="embla__slide">
          <img src='/img/banner-image-2.png' alt="Slide 2" className='object-cover'/>
        </div>

        {/* picture 3 */}
        <div className="embla__slide">
          <img src='/img/banner-image-3.png' alt="Slide 3" className='object-cover'/>
        </div>
      </div>
    </div>
  )
}
