import React from 'react';
import './image.scss';

export const ImageLoader = (
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);

  const onLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImgLoaded(true);
    if (props.onLoad) props.onLoad(e);
  };

  return (
    <div className={`image ${imgLoaded ? 'loaded' : ''}`}>
      <svg className='image-spinner' viewBox='0 0 50 50'>
        <circle
          className='path'
          cx='25'
          cy='25'
          r='20'
          fill='none'
          strokeWidth='5'
        ></circle>
      </svg>
      <img {...props} onLoad={onLoad} alt={props.alt} />
    </div>
  );
};
