import React, { useState, useEffect } from 'react';
import '../css/admin.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for posts list
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState('');
  const [postsPage, setPostsPage] = useState(1);
  const POSTS_PER_PAGE = 5;

  useEffect(() => {
    if (!user || !user.token) navigate('/login');
  }, [user, navigate]);

  const fetchPosts = async () => {
    if (!user || !user.token) return;
    setPostsLoading(true);
    setPostsError('');
    try {
      const res = await fetch('http://localhost:5100/posts', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.status === 401) {
        navigate('/login');
        return;
      }
      const data = await res.json();
      if (res.ok) {
        // Sort by latest first (assuming _id is ObjectId)
        setPosts(data.sort((a, b) => b._id.localeCompare(a._id)));
      } else {
        setPostsError(data.message || 'Failed to fetch posts');
      }
    } catch (err) {
      setPostsError(err.message);
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, [user, navigate]);

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`http://localhost:5100/posts/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.status === 401) {
        navigate('/login');
        return;
      }
      const data = await res.json();
      if (res.ok) {
        // Refetch posts after delete
        fetchPosts();
      } else {
        alert('Error deleting post: ' + data.message);
      }
    } catch (err) {
      alert('Error deleting post: ' + err.message);
    }
  };

  // State for new post
  const [post, setPost] = useState({
    title: '',
    date: '',
    author: '',
    content: '',
    images: [], // will hold File objects
    videos: [] // will hold YouTube share links
  });
  const [postLoading, setPostLoading] = useState(false);

  // State for about section
  const [about, setAbout] = useState({
    image: null,
    englishContent: '',
    hindiContent: ''
  });
  const [aboutLoading, setAboutLoading] = useState(false);

  // Handlers for post
  const handlePostChange = e => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageFilesChange = e => {
    setPost({ ...post, images: Array.from(e.target.files) });
  };

  const handleAddVideo = e => {
    e.preventDefault();
    const videoUrl = post.videoInput?.trim();
    if (videoUrl) {
      setPost({ ...post, videos: [...post.videos, videoUrl], videoInput: '' });
    }
  };

  const handleVideoInputChange = e => {
    setPost({ ...post, videoInput: e.target.value });
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setPost({ ...post, images: [...post.images, imageInput.trim()] });
      setImageInput('');
    }
  };

  const handleRemoveImage = idx => {
    setPost({ ...post, images: post.images.filter((_, i) => i !== idx) });
  };
  const handleRemoveVideo = idx => {
    setPost({ ...post, videos: post.videos.filter((_, i) => i !== idx) });
  };

  const handlePostSubmit = async e => {
    e.preventDefault();
    setPostLoading(true);
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('date', post.date);
    formData.append('author', post.author);
    formData.append('content', post.content);
    post.images.forEach((img, idx) => {
      formData.append('images', img);
    });
    post.videos.forEach((vid, idx) => {
      formData.append('videos', vid);
    });
    try {
      const res = await fetch('http://localhost:5100/post', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      });
      const data = await res.json();
      if (res.status === 401) {
        navigate('/login');
        return;
      }
      if (res.ok) {
        alert('Post submitted!\n' + JSON.stringify(data, null, 2));
        setPost({
          title: '',
          date: '',
          author: '',
          content: '',
          images: [],
          videos: [],
          videoInput: ''
        });
        // Refetch posts after new post
        fetchPosts();
      } else {
        alert('Error submitting post: ' + data.message);
      }
    } catch (err) {
      alert('Error submitting post: ' + err.message);
    } finally {
      setPostLoading(false);
    }
  };

  // Handlers for about
  const handleAboutChange = e => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setAbout({ ...about, image: files[0] });
    } else {
      setAbout({ ...about, [name]: value });
    }
  };
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
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      });
      const data = await res.json();
      if (res.status === 401) {
        navigate('/login');
        return;
      }
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
  };

  // Pagination logic
  const paginatedPosts = posts.slice(0, postsPage * POSTS_PER_PAGE);

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
            />
            <input
              className="admin-panel-input"
              type="text"
              name="author"
              placeholder="Author"
              value={post.author}
              onChange={handlePostChange}
            />
            <textarea
              className="admin-panel-textarea"
              name="content"
              placeholder="Content"
              value={post.content}
              onChange={handlePostChange}
            />
            {/* Images */}
            <div className="admin-panel-media-group">
              <input
                className="admin-panel-input"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageFilesChange}
                disabled={postLoading}
              />
            </div>
            <div className="admin-panel-media-list">
              {post.images.map((img, idx) => (
                <div key={idx} className="admin-panel-media-item">
                  <img src={typeof img === 'string' ? img : URL.createObjectURL(img)} alt={`img${idx}`} className="admin-panel-thumb" />
                  <button type="button" className="admin-panel-remove-btn" onClick={() => handleRemoveImage(idx)} disabled={postLoading}>Remove</button>
                </div>
              ))}
            </div>
            {/* Videos */}
            <div className="admin-panel-media-group">
              <input
                className="admin-panel-input"
                type="url"
                placeholder="YouTube Share Link"
                name="videoInput"
                value={post.videoInput || ''}
                onChange={handleVideoInputChange}
                disabled={postLoading}
              />
              <button type="button" className="admin-panel-btn" onClick={handleAddVideo} disabled={postLoading}>Add Video</button>
            </div>
            <div className="admin-panel-media-list">
              {post.videos.map((vid, idx) => (
                <div key={idx} className="admin-panel-media-item">
                  <span className="admin-panel-video-url">{vid}</span>
                  <button type="button" className="admin-panel-remove-btn" onClick={() => handleRemoveVideo(idx)} disabled={postLoading}>Remove</button>
                </div>
              ))}
            </div>
            <button type="submit" className="admin-panel-submit-btn" disabled={postLoading}>
              {postLoading ? "Submitting..." : "Submit Post"}
            </button>
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
        {/* List All Posts */}
        <section className="admin-panel-section">
          <h2 className="admin-panel-section-title">All Posts</h2>
          {postsLoading ? (
            <div>Loading posts...</div>
          ) : postsError ? (
            <div style={{ color: 'red' }}>{postsError}</div>
          ) : (
            <>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {paginatedPosts.map(post => (
                  <li key={post._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.7rem', background: '#f4f6fa', borderRadius: '0.5rem', padding: '0.6rem 1rem' }}>
                    <span style={{ fontWeight: 500 }}>{post.title}</span>
                    <button className="admin-panel-remove-btn" onClick={() => handleDeletePost(post._id)} style={{ marginLeft: '1rem' }}>Delete</button>
                  </li>
                ))}
              </ul>
              {posts.length > paginatedPosts.length && (
                <button className="admin-panel-btn" style={{ marginTop: '1rem' }} onClick={() => setPostsPage(postsPage + 1)}>More</button>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminPanel;