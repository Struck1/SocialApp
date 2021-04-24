import './friend.css';

export default function Friend({ user }) {
  return (
    <ul className='sidebarFriendList'>
      <li className='sidebarFriend'>
        <img className='sidebarImg' src={user.profilePicture} alt='' />
        <span className='sideBarFriendName'>{user.username} </span>
      </li>
    </ul>
  );
}
