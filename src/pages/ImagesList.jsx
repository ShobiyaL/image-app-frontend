import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from '../components/ImageCard';

const ImagesList = ({ token }) => {
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  console.log(token);
  let fetchImages = async () => {
    const response = await axios.get(
      'https://image-app-backend.onrender.com/api/images',
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
      }
    );
    console.log(response.data.data);
    setImages([
      ...response.data.data.map((image) => {
        return {
          ...image,
          url: `https://image-app-backend.onrender.com/api/images/${image.img}`,
        };
      }),
    ]);
  };
  console.log(images);
  useEffect(() => {
    fetchImages();
  }, [token]);
  const renderedImages = images.map((image) => {
    return <ImageCard key={image.id} image={image} token={token} />;
  });
  return (
    <div className='row row-cols-1 row-cols-md-4 row-cols-lg-5 g-2 ms-4 mt-5'>
      {renderedImages}
    </div>
  );
};

export default ImagesList;
