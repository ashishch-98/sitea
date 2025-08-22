import { JSX } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';

interface SlidesMultiListField {
  fields: {
    image: ImageField;
  };
}

interface Fields {
  slides: SlidesMultiListField[];
}

type SliderProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SliderDefaultComponent = (props: SliderProps): JSX.Element => (
  <div className={`component carousel ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Slick Carousel</span>
    </div>
  </div>
);

export const Default = (props: SliderProps): JSX.Element => {
  if (props.fields) {
    const { fields } = props;
    return (
      <div id="default-carousel" className="relative w-full slider" data-carousel="slide">
        <Slider {...settings}>
          {fields?.slides?.map((slide, index) => (
            <div key={index}>
              <Image field={slide?.fields?.image} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  return <SliderDefaultComponent {...props} />;
};
