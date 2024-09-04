import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {
  const [posts, setPost] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`posts/${cat}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='home'>
      <div className="posts">
        {posts.map((post) => (
          <div className='post' key={post.id}>
            <div className="img">
              <img src={`/upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link to={`/post/${post.id}`}>
                <h1 className='title'>{post.title}</h1>
                <p>{getText(post.desc)}</p>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
