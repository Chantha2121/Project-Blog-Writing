import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Menu.scss';

function Menu({ cat }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className='menu'>
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id} className="post-link">
          <div className="post">
            <img src={`/upload/${post.img}`} alt={post.title} />
            <h2>{post.title}</h2>
            <button>Read More</button>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Menu;
