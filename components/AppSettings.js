import styled from 'styled-components';
import { motion } from 'framer-motion';
import InputField from './InputField';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../styles/globals';
import CheckBox from './CheckBox';

export default function AppSettings() {

  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [firstNameChanged, setFirstNameChanged] = useState(false);
  const [lastNameChanged, setLastNameChanged] = useState(false);
  const [companyNameChanged, setCompanyNameChanged] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [daysLoading, setDaysLoading] = useState(true);

  const dispatch = useDispatch();
  const GET_STATE = useSelector((state) => state);

  useEffect(() => {
    if (GET_STATE.loginData.profileImage) {
      setImage(GET_STATE.loginData.profileImage);
    }

    if (GET_STATE.isAdmin) {
      GET_STATE.loginData.days.split('').map((day, index) => {
        if (index === 0) dispatch({ type: 'SET_MONDAY', payload: parseInt(day) });
        if (index === 1) dispatch({ type: 'SET_TUESDAY', payload: parseInt(day) });
        if (index === 2) dispatch({ type: 'SET_WEDNESDAY', payload: parseInt(day) });
        if (index === 3) dispatch({ type: 'SET_THURSDAY', payload: parseInt(day) });
        if (index === 4) dispatch({ type: 'SET_FRIDAY', payload: parseInt(day) });
        if (index === 5) dispatch({ type: 'SET_SATURDAY', payload: parseInt(day) });
        if (index === 6) dispatch({ type: 'SET_SUNDAY', payload: parseInt(day) });
      })
      setDaysLoading(false);
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

  const handleCompanyName = (e) => {
    setCompanyNameChanged(true);
    dispatch({
      type: 'SET_COMPANY_NAME',
      payload: e.target.value
    })
  }

  const handleSave = async () => {
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

  const handleSaveAdmin = async () => {

    const newOpeningDays = `${GET_STATE.monday ? 1 : 0}${GET_STATE.tuesday ? 1 : 0}${GET_STATE.wednesday ? 1 : 0}${GET_STATE.thursday ? 1 : 0}${GET_STATE.friday ? 1 : 0}${GET_STATE.saturday ? 1 : 0}${GET_STATE.sunday ? 1 : 0}`;

    await fetch('/api/updateadmin', {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        data: {
          id: GET_STATE.loginData.id,
          name: companyNameChanged ? GET_STATE.companyName : GET_STATE.loginData.name,
          days: newOpeningDays,
          image: imageChanged ? image : GET_STATE.loginData.profileImage
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          dispatch({
            type: 'SET_LOGIN_DAYS',
            payload: newOpeningDays
          })
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
          <>
            <h3>Settings</h3>
            <h4>Change company name</h4>
            <span>Current: {GET_STATE.loginData.name}</span>
            <input placeholder="First name" type="text" onChange={(e) => handleCompanyName(e)} />
            <h4>Opening days</h4>
            {daysLoading ? <p>Loading opening days...</p> : (
              <>
                <CheckBox title={'Monday'} index={0} setter={'SET_MONDAY'} getter={'monday'} />
                <CheckBox title={'Tuesday'} index={1} setter={'SET_TUESDAY'} getter={'tuesday'} />
                <CheckBox title={'Wednesday'} index={2} setter={'SET_WEDNESDAY'} getter={'wednesday'} />
                <CheckBox title={'Thursday'} index={3} setter={'SET_THURSDAY'} getter={'thursday'} />
                <CheckBox title={'Friday'} index={4} setter={'SET_FRIDAY'} getter={'friday'} />
                <CheckBox title={'Saturday'} index={5} setter={'SET_SATURDAY'} getter={'saturday'} />
                <CheckBox title={'Sunday'} index={6} setter={'SET_SUNDAY'} getter={'sunday'} />
              </>
            )}
            <h4>Choose company logo</h4>
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
              <button onClick={() => handleSaveAdmin()} className="btn--primary">Save</button>
            </div>
          </>
        ) : (
            <>
              <h3>Settings</h3>
              <h4>Change name</h4>
              <span>Current: {GET_STATE.loginData.firstName} {GET_STATE.loginData.lastName}</span>
              <input placeholder="First name" type="text" onChange={(e) => handleFirstName(e)} />
              <input placeholder="Last name" type="text" onChange={(e) => handleLastName(e)} />
              <h4>Choose profile picture</h4>
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
  
  h4 {
    color: ${COLORS.orange};
    font-weight: 700;
  }

  span {
    /* font-style: italic;
    font-size: 10px; */
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