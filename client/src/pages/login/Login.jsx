import { useContext, useRef } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFecthing, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Social</h3>
          <span className='loginDesc'>Connect with friends</span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={handleClick}>
            <input
              className='loginInput'
              type='email'
              required
              placeholder='Email'
              ref={email}
            />
            <input
              className='loginInput'
              type='password'
              required
              placeholder='Password'
              ref={password}
              minLength='6'
            />
            <button className='loginButton' type='submit' disabled={isFecthing}>
              {isFecthing ? 'loading' : 'Log In'}
            </button>
            <span className='loginForgot'>Forgot password?</span>
            <button className='loginRegister'>Create a New Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
