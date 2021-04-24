import './online.css';

export default function Online({ user }) {
  return (
    <ul className='friendList'>
      <li className='friendListItems'>
        <div className='rightbarImgContainer'>
          <img
            className='rightbarProfileImg'
            src={user.profilePicture}
            alt=''
          />
          <span className='rightbarOnline'></span>
        </div>
        <span className='rightbarUsername'>{user.username}</span>
      </li>
    </ul>
  );
}
