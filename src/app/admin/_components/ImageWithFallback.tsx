import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import fallbackImage from "../../../../public/ImageError.jpg";

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string; // Optional fallback source
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = fallbackImage, // Default to imported fallback image
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      className="w-auto h-auto"
      {...rest}
      src={imgSrc}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

export default ImageWithFallback;
