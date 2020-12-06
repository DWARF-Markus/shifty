import styled from 'styled-components';
import { motion } from 'framer-motion';
import InputField from './InputField';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../styles/globals';

export default function AppSettings() {

  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [firstNameChanged, setFirstNameChanged] = useState(false);
  const [lastNameChanged, setLastNameChanged] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);

  const dispatch = useDispatch();
  const GET_STATE = useSelector((state) => state);

  useEffect(() => {
    if (GET_STATE.loginData.profileImage) {
      setImage(GET_STATE.loginData.profileImage);
    }
  }, [])

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'shifty');
    setLoading(true);
    const res = await fetch('https://api.cloudinary.com/v1_1/dj216sbz1/image/upload', {
      method: 'POST',
      body: data
    });
    const file = await res.json();

    setImage(file.secure_url);
    dispatch({
      type: 'SET_IMAGE',
      payload: file.secure_url
    })
    setLoading(false);
    setImageChanged(true);
  }

  const handleFirstName = (e) => {
    setFirstNameChanged(true);
    dispatch({
      type: 'SET_FIRST_NAME_UPDATE',
      payload: e.target.value
    })
  };

  const handleLastName = (e) => {
    setLastNameChanged(true);
    dispatch({
      type: 'SET_LAST_NAME_UPDATE',
      payload: e.target.value
    })
  };

  const handleSave = async () => {
    console.log(GET_STATE.loginData.id);
    await fetch('/api/updateuser', {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        data: {
          id: GET_STATE.loginData.id,
          firstName: firstNameChanged ? GET_STATE.firstName : GET_STATE.loginData.firstName,
          lastName: lastNameChanged ? GET_STATE.lastName : GET_STATE.loginData.lastName,
          image: imageChanged ? image : GET_STATE.loginData.profileImage
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          dispatch({
            type: 'SET_POP_UP',
            payload: 'Profile updated!'
          });
        } else {
          dispatch({
            type: 'SET_POP_UP_ERROR',
            payload: 'Something went wrong! Try again later',
          });
        }
      })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SettingsWrapper>
        {GET_STATE.isAdmin ? (
          <p>Admin settings here</p>
        ) : (
            <>
              <h3>Settings</h3>
              <p>Change name</p>
              <span>Current: {GET_STATE.loginData.firstName} {GET_STATE.loginData.lastName}</span>
              <input placeholder="First name" type="text" onChange={(e) => handleFirstName(e)} />
              <input placeholder="Last name" type="text" onChange={(e) => handleLastName(e)} />
              <p>Choose profile picture</p>
              <input
                type="file"
                name="file"
                onChange={(e) => handleImageUpload(e)}
              />
              {loading ? <p>Loading image...</p> : (
                <div>
                  <img src={image} style={{ width: '120px', marginTop: '15px' }} />
                </div>
              )}
              <div>
                <button onClick={() => handleSave()} className="btn--primary">Save</button>
              </div>
            </>
          )}
      </SettingsWrapper>
    </motion.div >
  )
}

const SettingsWrapper = styled.div`
  h3 {
    font-weight: 300;
    line-height: 1.2;
  }
  
  p {
    color: ${COLORS.orange};
    font-weight: 700;
  }

  span {
    font-style: italic;
    font-size: 10px;
  }

  button {
    margin-top: 10px;
  }

  input[type="text"] {
    padding: 10px;
    width: 100%;
    outline: none;
    border-radius: 5px;
    border: none;
    margin-top: 5px;
  }
`;