import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";

interface CarouselSlide {
  id: string | number;
  content: React.ReactNode; // Can be an image URL, text, or custom JSX
  altText?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  options?: Parameters<typeof useEmblaCarousel>[0];
}

const Carousel: React.FC<CarouselProps> = ({ slides, options }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, ...options }, [Autoplay()]);

  console.log("Rendering Carousel with", slides.length, "slides");

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide) => (
          <div className="embla__slide flex-[0_0_100%] min-w-0" key={slide.id}>
            <Card className="m-1 md:m-2 shadow-none border-none">
              <CardContent className="flex aspect-[2/1] md:aspect-[3/1] items-center justify-center p-0">
                {typeof slide.content === 'string' ? (
                  <img src={slide.content} alt={slide.altText || `Slide ${slide.id}`} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  slide.content
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {/* Consider adding navigation dots/arrows if design requires */}
    </div>
  );
};

export default Carousel;