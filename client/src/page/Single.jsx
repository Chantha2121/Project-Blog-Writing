import React, { useEffect, useState, useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Single.scss';
import Menu from './Menu';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/authContext.js'

function Single() {
  const { currentUser } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/posts/${id}`);
      navigate('/');
      // Redirect or update UI after deletion
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }
   const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className='single'>
      <div className="content">
        <img src={`/upload/${post.img}`  || '/path/to/default/image.jpg'} alt="Main content" />
        <div className="user">
          <img src={post.userImg || '/path/to/default/profile.jpg'} alt="Profile" />
          <div className="user-info">
            <span>{post.username || 'Unknown'}</span>
            <p className='day'>Posted: {moment(post.date).fromNow()}</p>
          </div>
          {currentUser && currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}><FaEdit className='icon edit' /></Link>
              <button onClick={() => handleDelete(post.id)}><FaTrash className='icon delete' /></button>
            </div>
          )}
        </div>
        <div className="text-content">
          <h1>{post.title}</h1>
          <p>{getText(post.desc)}</p>
        </div>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
}

export default Single;
