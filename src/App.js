// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import FirebaseAuthService from './FirebaseAuthService';
import './App.css';

import LoginForm from './components/LoginForm';

function App() {
  const [user, setUser] = useState(null)

  FirebaseAuthService.subscribeToAuthChanges(setUser)
  return (
    <div className="App">
      <div className='title-row'>
        <div className='title'>
          <h1>Firebase Recipes</h1>
        </div>
        <LoginForm existingUser={user} />
      </div>
    </div>
  );
}

export default App;
