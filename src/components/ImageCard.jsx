import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ImageCard = ({ image, token }) => {
  // console.log(image);
  const [imageUrl, setImageUrl] = useState(null);
  let imgUrls = async () => {
    const res = await axios.get(
      `http://localhost:8002/api/image/${image.img}`,
      {
        header: {
          Authorzation: `Bearer ${token}`,
        },
      }
    );
    // console.log(res.data.image);

    setImageUrl(res.data.image);
    return res;
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