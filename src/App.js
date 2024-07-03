// App.js
import React from 'react';
import { Button, ButtonOr, ButtonGroup, Header, Icon, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import SignIn from './sign-in';
import SignUp from './sign-up';

function App() {
  return (
    <div>
      <Segment clearing>
        <Header as='h3' floated='left'>
          <div className="font-weight-bold">Stock Manage</div>
        </Header>
        <Header floated='right'>
          <SignIn triggerText="Sign in or create an account" signInButtonText="Sign in">
            <Button basic>
              <Icon disabled name='user circle' />
              Sign in or create an account
            </Button>
          </SignIn>
        </Header>
      </Segment>
      <div className="hero-section">
        <div className="overlay">
          <Header as="h1" className="display-4">Make your life Easier with this Web application</Header>
          <div className="mt-4">
            <ButtonGroup>
            <SignIn triggerText="Sign in" signInButtonText="Sign in">
            <Button color='white'>
              Sign in
            </Button>
          </SignIn>
              <ButtonOr />
              <SignUp triggerText="Sign up" signInButtonText="Sign up">
            <Button color='black'>
            Sign up
            </Button>
          </SignUp>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
