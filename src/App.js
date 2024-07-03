import React, { useState } from 'react';
import { Button, ButtonOr, ButtonGroup, Header, Icon, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import SignIn from './sign-in';
import SignUp from './sign-up';

function App() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const openSignIn = () => {
    setSignInOpen(true);
    setSignUpOpen(false);
  };

  const openSignUp = () => {
    setSignInOpen(false);
    setSignUpOpen(true);
  };

  return (
    <div>
      <Segment clearing>
        <Header as='h3' floated='left'>
          <div className="font-weight-bold">Stock Manage</div>
        </Header>
        <Header floated='right'>
          <Button basic onClick={openSignIn}>
            <Icon disabled name='user circle' />
            Sign in or create an account
          </Button>
        </Header>
      </Segment>
      <div className="hero-section">
        <div className="overlay">
          <Header as="h1" className="display-4">Make your life Easier with this Web application</Header>
          <div className="mt-4">
            <ButtonGroup>
              <Button color='white' onClick={openSignIn}>
                Sign in
              </Button>
              <ButtonOr />
              <Button color='black' onClick={openSignUp}>
                Sign up
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
      <SignIn
        triggerText="Sign in"
        signInButtonText="Submit"
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSignUpClick={openSignUp}
      />
      <SignUp
        triggerText="Sign up"
        signInButtonText="Submit"
        open={signUpOpen}
        onClose={() => setSignUpOpen(false)}
      />
    </div>
  );
}

export default App;
