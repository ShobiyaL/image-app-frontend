import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { TbSquareRoundedPlus } from 'react-icons/tb';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateImage = ({ token }) => {
  console.log(token);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles);
  }, []);

  let handleChange = (event) => {
    setDescription(event.target.value);
  };
  let handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', image[0]);
      formData.append('description', description);
      // console.log(formData);
      const response = await axios.post(
        'https://image-app-backend.onrender.com/api/images/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setDescription('');
      setImage([]);
      setIsLoading(false);
      if (response.data.status === 'success') {
        setUploaded(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*', //  accepted file types
  });
  return (
    <>
      <div className='inner'>
        <form className='mx-auto' onSubmit={handleSubmit}>
          <div className='mb-3 text-center'>
            <h4>Upload Image</h4>
          </div>
          <div className='mb-3'>
            <div className='form-floating'>
              <textarea
                className='form-control'
                placeholder='Leave a comment here'
                id='floatingTextarea2'
                style={{ height: '100px' }}
                value={description}
                onChange={handleChange}
              ></textarea>
              <label htmlFor='floatingTextarea2'>Description</label>
            </div>
          </div>
          <div {...getRootProps()} style={dropzoneStyles} className='mx-auto'>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <>
                <p>Drop your image</p>
                <div>
                  <TbSquareRoundedPlus size={30} />
                </div>
              </>
            )}
          </div>
          {uploaded ? <p>File has been uploaded</p> : ''}
          <button type='submit' className='btn btn-primary mt-4'>
            {isLoading ? (
              <div className='spinner-border text-light' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            ) : (
              ''
            )}{' '}
            save
          </button>
        </form>
      </div>
    </>
  );
};
const dropzoneStyles = {
  width: '100%',
  height: '200px',
  border: '2px dashed #ccc',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default CreateImage;
