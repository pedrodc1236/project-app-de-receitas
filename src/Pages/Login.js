import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';

function Login({ history }) {
  const [validation, setValidation] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleValidation = () => {
    const SIX = 6;
    const emailValidation = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
      .test(email);
    const passwordValidation = password.length > SIX;
    if (emailValidation && passwordValidation) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  };

  const handleChange = ({ target }) => {
    if (target.name === 'email') {
      setEmail(target.value);
    }
    if (target.name === 'password') {
      setPassword(target.value);
    }
  };

  useEffect(() => {
    handleValidation();
  });

  const HandleLocalStorage = () => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    const userEmail = { email };
    localStorage.setItem('user', JSON.stringify(userEmail));
    history.push('/foods');
  };

  return (
    <form>
      <input
        data-testid="email-input"
        type="email"
        name="email"
        placeholder="Email"
        onChange={ handleChange }
        value={ email }
        required
      />
      <input
        data-testid="password-input"
        type="password"
        name="password"
        placeholder="Senha"
        onChange={ handleChange }
        value={ password }
        required
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        onClick={ HandleLocalStorage }
        disabled={ validation }
      >
        Enter
      </button>
    </form>
  );
}

Login.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
};

export default Login;
