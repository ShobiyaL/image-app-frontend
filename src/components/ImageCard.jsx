import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
const ImageCard = ({ image, token }) => {
  console.log(token);
  console.log(image, 'ImageCard');
  const [imageUrl, setImageUrl] = useState(null);
  let imgUrls = async () => {
    const res = await axios.get(
      `https://image-app-backend.onrender.com/api/image/${image.img}`,
      {
        header: {
          Authorzation: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
      }
    );
    console.log(res.data.image);

    setImageUrl(res.data.image);
    // return res;
  };

  useEffect(() => {
    imgUrls();
  }, []);

  return (
    <div className='col'>
      <div className='card' style={{ width: '13rem' }}>
        <img
          src={imageUrl}
          className='card-img-top'
          alt='...'
          style={{ width: '206px', height: '206px' }}
        />
        <div className='card-body'>
          <p className='card-text'>{image.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
