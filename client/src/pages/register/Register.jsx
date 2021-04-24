import { useRef } from 'react';
import { useHistory } from 'react-router';
import './register.css';
import axios from 'axios';

export default function Register() {
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const username = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      };

      try {
        await axios.post('auth/register', user);
        history.push('/login');
      } catch (error) {}
    }
  };
  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Social</h3>
          <span className='loginDesc'>Connect with friends</span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={handleSubmit}>
            <input
              className='loginInput'
              required
              ref={username}
              placeholder='Username'
            />
            <input
              className='loginInput'
              placeholder='Email'
              required
              ref={email}
              type='email'
            />
            <input
              className='loginInput'
              placeholder='Password'
              required
              type='password'
              ref={password}
              minLength='6'
            />
            <input
              className='loginInput'
              placeholder='Password Again'
              type='password'
              required
              ref={passwordAgain}
              minLength='6'
            />
            <button className='loginButton' type='submit'>
              Create Account
            </button>
            <button className='loginRegister'>Log Into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
