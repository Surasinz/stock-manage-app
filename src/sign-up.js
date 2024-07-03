import React, { useReducer, useState } from 'react';
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
import './sign-up.css';

function handle(state, action) {
  switch (action.type) {
    case 'CONFIG_CLOSE_ON_DIMMER_CLICK':
      return { ...state, closeOnDimmerClick: action.value };
    case 'CONFIG_CLOSE_ON_ESCAPE':
      return { ...state, closeOnEscape: action.value };
    case 'OPEN_MODAL':
      return { ...state, open: true };
    case 'CLOSE_MODAL':
      return { ...state, open: false };
    default:
      throw new Error();
  }
}

function SignUp({ children, triggerText, signInButtonText }) {
  const [state, dispatch] = useReducer(handle, {
    closeOnEscape: true,
    closeOnDimmerClick: true,
    open: false,
    dimmer: undefined,
  });
  const { open, closeOnEscape, closeOnDimmerClick } = state;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const isPasswordDontMatch = confirmPass !== password;
  const isSignUpDisabled = !username || !email || password.length < 8 || isPasswordDontMatch;

  const handleModalClose = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPass('');
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <Grid columns={1}>
      <GridColumn>
        <Modal
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          open={open}
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
            <p>Email</p>
            <Input
              focus
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <p>Confirm Password</p>
            <Input
              focus
              type={confirmPasswordVisible ? 'text' : 'password'}
              placeholder='confirm password'
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className={isPasswordDontMatch ? 'password-mismatch' : ''}
              icon={
                <Icon
                  name={confirmPasswordVisible ? 'eye slash' : 'eye'}
                  link
                  onClick={toggleConfirmPasswordVisibility}
                />
              }
            />
            {isPasswordDontMatch && <p style={{ color: 'red' }}>Passwords don't match</p>}
          </ModalContent>
          <ModalActions>
            <Button
              onClick={handleModalClose}
              positive
              disabled={isSignUpDisabled}
            >
              {signInButtonText}
            </Button>
          </ModalActions>
        </Modal>
      </GridColumn>
    </Grid>
  );
}

export default SignUp;
