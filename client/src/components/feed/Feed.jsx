import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Feed() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get('posts/timeline/6071ac6cd84a0e08f8b86f8c');
      setPost(res.data);
    };
    fetchPost();
  }, []);

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <Share />
        {post.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
