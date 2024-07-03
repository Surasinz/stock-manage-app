import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  GridColumn,
  Button,
  Grid,
  Modal,
  Input,
  Icon
} from 'semantic-ui-react';
import './sign-in.css';
import SignUp from './sign-up';

function handle(state, action) {
  switch (action.type) {
    case 'CONFIG_CLOSE_ON_DIMMER_CLICK':
      return { ...state, closeOnDimmerClick: action.value };
    case 'CONFIG_CLOSE_ON_ESCAPE':
      return { ...state, closeOnEscape: action.value };
    case 'OPEN_MODAL':
      return { ...state, isOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, isOpen: false };
    default:
      throw new Error();
  }
}

function SignIn({ open, children, triggerText, signInButtonText }) {
  const [state, dispatch] = useReducer(handle, {
    closeOnEscape: true,
    closeOnDimmerClick: true,
    isOpen: open,
    dimmer: undefined,
  });

  const { isOpen, closeOnEscape, closeOnDimmerClick } = state;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      dispatch({ type: 'OPEN_MODAL' });
    } else {
      dispatch({ type: 'CLOSE_MODAL' });
    }
  }, [isOpen]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const isSignInDisabled = !username || password.length < 8;

  const handleModalClose = () => {
    setUsername('');
    setPassword('');
    setError(null);
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleSignUpClick = () => {
    dispatch({ type: 'CLOSE_MODAL' });
    setShowSignUp(true);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/login', {
        params: {
          userName: username,
          password: password
        }
      });
      console.log('User logged in:', response.data);
      handleModalClose();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Grid columns={1}>
      <GridColumn>
        <Modal
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          open={state.isOpen}
          onOpen={() => dispatch({ type: 'OPEN_MODAL' })}
          onClose={handleModalClose}
          trigger={React.isValidElement(children) ? React.cloneElement(children, { onClick: () => dispatch({ type: 'OPEN_MODAL' }) }) : children}
        >
          <ModalHeader>{triggerText}</ModalHeader>
          <ModalContent>
            <p>ID</p>
            <Input
              focus
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p>Password</p>
            <Input
              focus
              type={passwordVisible ? 'text' : 'password'}
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                <Icon
                  name={passwordVisible ? 'eye slash' : 'eye'}
                  link
                  onClick={togglePasswordVisibility}
                />
              }
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
              Don’t have an account?{' '}
              <a href="#signup" onClick={handleSignUpClick}>
                Sign up
              </a>
            </p>
          </ModalContent>
          <ModalActions>
            <Button
              onClick={handleSignIn}
              positive
              disabled={isSignInDisabled}
            >
              {signInButtonText}
            </Button>
          </ModalActions>
        </Modal>
        {showSignUp && <SignUp open={showSignUp} onClose={() => setShowSignUp(false)} />}
      </GridColumn>
    </Grid>
  );
}

export default SignIn;
