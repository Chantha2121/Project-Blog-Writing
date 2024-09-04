import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill styles
import './Write.scss';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

function Write() {
  const location = useLocation();
  const state = location.state || {};
  const [value, setValue] = useState(state.desc || '');
  const [title, setTitle] = useState(state.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state.cat || '');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const upload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post('upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return res.data.filename; // Return the filename for use in form submission
      } else {
        console.log('No file selected');
        return null;
      }
    } catch (err) {
      console.error('Error uploading file:', err.response ? err.response.data : err.message);
      return null;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload(); // Ensure upload is awaited
    try {
      if (state.id) {
        // Update existing post
        await axios.put(`posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : state.img, // Use existing image if no new image is uploaded
        });
      } else {
        // Create new post
        await axios.post(`posts`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          uid: 1, // Replace with the actual user ID from context or authentication
        });
      }
      // Redirect to home page after success
      navigate('/');
    } catch (err) {
      console.error('Error saving post:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Enter title here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div className="editContent">
          <ReactQuill value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1 className="texth">Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <div>
            <input
              style={{ display: 'none' }}
              type="file"
              id="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file">Upload file</label>
          </div>
          <button>Save as a draft</button>
          <button onClick={handleClick}>Publish</button>
        </div>
        <div className="item">
          <h1 className="texth">Category</h1>
          <div className="category">
            {['art', 'science', 'technology', 'cinema', 'design', 'food'].map((category) => (
              <label key={category}>
                <input
                  type="radio"
                  name="cat"
                  value={category}
                  id={category}
                  checked={cat === category}
                  onChange={(e) => setCat(e.target.value)}
                />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
