export default function Kotisivu(){
    //ihan vaan placeholderi
    return(
    <> 
    <h1>Kotisivu</h1>
    <p>tämä on kotisivu</p>
    </>
    )
}


// LUONNOS KIRJAUTUMISELLE JA rekistöröimiseen.

{
    /*
import React from 'react';
import { useState } from 'react';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registeredUsers = []; // Tallennetaan rekisteröidyt käyttäjät tähän

  const isUserRegistered = (username, email) => {
    // Tarkistetaan, onko käyttäjä jo rekisteröitynyt samoilla tiedoilla
    return registeredUsers.some(user => user.username === username || user.email === email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      console.log('Logging in with:', { email });
    } else {
      // Tarkista, ettei samaa käyttäjätunnusta tai sähköpostia ole jo käytetty
      if (isUserRegistered(username, email)) {
        console.log('User already registered with the same username or email.');
      } else {
        console.log('Registering with:', { name, email, phoneNumber, username, password });
        // Tallenna rekisteröity käyttäjä
        registeredUsers.push({ name, email, phoneNumber, username, password });
      }
    }

    setName('');
    setEmail('');
    setPhoneNumber('');
    setUsername('');
    setPassword('');
  };

  return (
    <div>

    <h1>Huutis House</h1>

     <h2>Missä tarinat ja kaupat kohtaa</h2>


      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        {!isLogin && (
          <div>
            <label>Phone Number:</label>
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
        )}
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        {!isLogin && (
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Don\'t have an account? Register here.' : 'Already have an account? Login here.'}
      </p>
    </div>
  );
};

export default AuthForm;
    */
}