import React, { useState, useEffect } from 'react'
import '../css/admin.css'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

function AdminPanel() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  // State for new post
  const [post, setPost] = useState({
    title: '',
    date: '',
    author: '',
    content: '',
    images: [],
    videos: []
  })
  const [imageInput, setImageInput] = useState('')
  const [videoInput, setVideoInput] = useState('')

  // State for about section
  const [about, setAbout] = useState({
    image: null,
    englishContent: '',
    hindiContent: ''
  })
  const [aboutLoading, setAboutLoading] = useState(false);

  // Handlers for post
  const handlePostChange = e => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }
  const handleAddImage = () => {
    if (imageInput.trim()) {
      setPost({ ...post, images: [...post.images, imageInput.trim()] })
      setImageInput('')
    }
  }
  const handleAddVideo = () => {
    if (videoInput.trim()) {
      setPost({ ...post, videos: [...post.videos, videoInput.trim()] })
      setVideoInput('')
    }
  }
  const handleRemoveImage = idx => {
    setPost({ ...post, images: post.images.filter((_, i) => i !== idx) })
  }
  const handleRemoveVideo = idx => {
    setPost({ ...post, videos: post.videos.filter((_, i) => i !== idx) })
  }
  const handlePostSubmit = e => {
    e.preventDefault()
    // TODO: Save post to backend
    alert('Post submitted!\n' + JSON.stringify(post, null, 2))
    setPost({
      title: '',
      date: '',
      author: '',
      content: '',
      images: [],
      videos: []
    })
  }

  // Handlers for about
  const handleAboutChange = e => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setAbout({ ...about, image: files[0] });
    } else {
      setAbout({ ...about, [name]: value });
    }
  }
  const handleAboutSubmit = async e => {
    e.preventDefault();
    setAboutLoading(true);
    const formData = new FormData();
    formData.append("englishContent", about.englishContent);
    formData.append("hindiContent", about.hindiContent);
    if (about.image) {
      formData.append("image", about.image);
    }
    try {
      const res = await fetch("http://localhost:5100/about", {
        method: "PUT",
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        alert("About section updated!\n" + JSON.stringify(data, null, 2));
      } else {
        alert("Error updating about section: " + data.message);
      }
    } catch (err) {
      alert("Error updating about section: " + err.message);
    } finally {
      setAboutLoading(false);
    }
  }

  return (
    <div className="admin-panel-container">
      <h1 className="admin-panel-title">Admin Panel</h1>
      <div className="admin-panel-sections">
        {/* Upload New Post */}
        <section className="admin-panel-section">
          <h2 className="admin-panel-section-title">Upload New Post</h2>
          <form className="admin-panel-form" onSubmit={handlePostSubmit}>
            <input
              className="admin-panel-input"
              type="text"
              name="title"
              placeholder="Title"
              value={post.title}
              onChange={handlePostChange}
              required
            />
            <input
              className="admin-panel-input"
              type="text"
              name="date"
              placeholder="Date (e.g. June 2024)"
              value={post.date}
              onChange={handlePostChange}
              required
            />
            <input
              className="admin-panel-input"
              type="text"
              name="author"
              placeholder="Author"
              value={post.author}
              onChange={handlePostChange}
              required
            />
            <textarea
              className="admin-panel-textarea"
              name="content"
              placeholder="Content"
              value={post.content}
              onChange={handlePostChange}
              required
            />
            {/* Images */}
            <div className="admin-panel-media-group">
              <input
                className="admin-panel-input"
                type="url"
                placeholder="Image URL"
                value={imageInput}
                onChange={e => setImageInput(e.target.value)}
              />
              <button type="button" className="admin-panel-btn" onClick={handleAddImage}>Add Image</button>
            </div>
            <div className="admin-panel-media-list">
              {post.images.map((img, idx) => (
                <div key={idx} className="admin-panel-media-item">
                  <img src={img} alt={`img${idx}`} className="admin-panel-thumb" />
                  <button type="button" className="admin-panel-remove-btn" onClick={() => handleRemoveImage(idx)}>Remove</button>
                </div>
              ))}
            </div>
            {/* Videos */}
            <div className="admin-panel-media-group">
              <input
                className="admin-panel-input"
                type="url"
                placeholder="YouTube Embed Link"
                value={videoInput}
                onChange={e => setVideoInput(e.target.value)}
              />
              <button type="button" className="admin-panel-btn" onClick={handleAddVideo}>Add Video</button>
            </div>
            <div className="admin-panel-media-list">
              {post.videos.map((vid, idx) => (
                <div key={idx} className="admin-panel-media-item">
                  <span className="admin-panel-video-url">{vid}</span>
                  <button type="button" className="admin-panel-remove-btn" onClick={() => handleRemoveVideo(idx)}>Remove</button>
                </div>
              ))}
            </div>
            <button type="submit" className="admin-panel-submit-btn">Submit Post</button>
          </form>
        </section>
        {/* Edit About Section */}
        <section className="admin-panel-section">
          <h2 className="admin-panel-section-title">Edit About Section</h2>
          <form className="admin-panel-form" onSubmit={handleAboutSubmit}>
            <input
              className="admin-panel-input"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleAboutChange}
              required
              disabled={aboutLoading}
            />
            {about.image && typeof about.image === "object" && (
              <img
                src={URL.createObjectURL(about.image)}
                alt="Preview"
                style={{ maxWidth: "120px", margin: "10px 0" }}
              />
            )}
            <textarea
              className="admin-panel-textarea"
              name="englishContent"
              placeholder="English Content"
              value={about.englishContent}
              onChange={handleAboutChange}
              required
              disabled={aboutLoading}
            />
            <textarea
              className="admin-panel-textarea"
              name="hindiContent"
              placeholder="Hindi Content"
              value={about.hindiContent}
              onChange={handleAboutChange}
              required
              disabled={aboutLoading}
            />
            <button type="submit" className="admin-panel-submit-btn" disabled={aboutLoading}>
              {aboutLoading ? "Updating..." : "Update About"}
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default AdminPanel