import React, { useState, useEffect } from 'react';
import Post from '../components/Post.jsx';
import { Link } from 'react-router-dom';

function Homepage() {
    const [navOpen, setNavOpen] = useState(false);
    const [hindi, setHindi] = useState(false);
    const [about, setAbout] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [visibleCount, setVisibleCount] = useState(5);
    const [fullscreenImg, setFullscreenImg] = useState(null);

    // Hindi/English text for nav, contact, footer, brand
    const navText = hindi
        ? { brand: "द व्यांस", about: "परिचय", contact: "संपर्क", login: "लॉगिन" }
        : { brand: "The Vyans", about: "About", contact: "Contact", login: "Login" };
    const contactTitle = hindi ? "संपर्क करें" : "Contact Us";
    const footerText = hindi
        ? `© ${new Date().getFullYear()} द व्यांस. सर्वाधिकार सुरक्षित.`
        : `© ${new Date().getFullYear()} The Vyans. All rights reserved.`;

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError('');
            try {
                const [aboutRes, postsRes] = await Promise.all([
                    fetch('https://thevyans-backend.onrender.com/about'),
                    fetch('https://thevyans-backend.onrender.com/posts')
                ]);
                const aboutData = await aboutRes.json();
                const postsData = await postsRes.json();
                if (!aboutRes.ok) throw new Error(aboutData.message || 'Failed to fetch about');
                if (!postsRes.ok) throw new Error(postsData.message || 'Failed to fetch posts');
                setAbout(aboutData);
                setPosts(postsData.sort((a, b) => b._id.localeCompare(a._id)));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="homepage-container">
            {/* Navigation */}
            <nav className="homepage-nav">
                <div className="homepage-brand">{navText.brand}</div>
                <div className="homepage-nav-actions">
                    <button
                        className="homepage-lang-btn"
                        onClick={() => setHindi(h => !h)}
                    >
                        {hindi ? "English" : "हिन्दी"}
                    </button>
                    <button
                        className="homepage-hamburger"
                        aria-label="Toggle navigation"
                        onClick={() => setNavOpen(!navOpen)}
                    >
                        <svg width="28" height="28" viewBox="0 0 28 28">
                            <rect y="6" width="28" height="3" rx="1.5" fill="#fff"/>
                            <rect y="13" width="28" height="3" rx="1.5" fill="#fff"/>
                            <rect y="20" width="28" height="3" rx="1.5" fill="#fff"/>
                        </svg>
                    </button>
                </div>
                <div
                    className={`homepage-nav-links${navOpen ? ' open' : ''}`}
                >
                    <a href="#about" className="homepage-nav-link" onClick={()=>setNavOpen(false)}>{navText.about}</a>
                    <a href="#contact" className="homepage-nav-link" onClick={()=>setNavOpen(false)}>{navText.contact}</a>
                    <Link to="/login" className="homepage-nav-link" onClick={()=>setNavOpen(false)}>{navText.login}</Link>
                </div>
            </nav>

            {/* About Section */}
            <section id="about" className="homepage-about-section">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div style={{ color: 'red' }}>{error}</div>
                ) : about ? (
                    <>
                        <img
                            src={about.image}
                            alt="Profile"
                            className="homepage-about-img"
                        />
                        <div className="homepage-about-text">
                            <h2>{hindi ? "परिचय" : "About Us"}</h2>
                            <p>
                                {hindi ? about.hindiContent : about.englishContent}
                            </p>
                        </div>
                    </>
                ) : null}
            </section>

            {/* Posts Section */}
            <section id="posts" className="homepage-posts">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div style={{ color: 'red' }}>{error}</div>
                ) : posts.length > 0 ? (
                    <>
                        {posts.slice(0, visibleCount).map((post, idx) => (
                            <Post
                                key={post._id || idx}
                                title={post.title}
                                date={post.date}
                                author={post.author}
                                content={post.content}
                                images={post.images}
                                videos={post.videos}
                                onImageClick={img => setFullscreenImg(img)}
                            />
                        ))}
                        {visibleCount < posts.length && (
                            <button
                                className="homepage-more-posts-btn"
                                onClick={() => setVisibleCount(c => c + 5)}
                                style={{ display: 'block' }}
                            >
                                {hindi ? "और पोस्ट्स" : "More Posts"}
                            </button>
                        )}
                    </>
                ) : (
                    <div>No posts found.</div>
                )}
            </section>

            {/* Fullscreen Image Modal */}
            {fullscreenImg && (
                <div className="homepage-img-modal" onClick={() => setFullscreenImg(null)}>
                    <div className="homepage-img-modal-content" onClick={e => e.stopPropagation()}>
                        <img src={fullscreenImg} alt="Fullscreen" className="homepage-img-modal-img" />
                        <button
                            className="homepage-img-modal-download"
                            onClick={async () => {
                                try {
                                    const response = await fetch(fullscreenImg, { mode: 'cors' });
                                    const blob = await response.blob();
                                    const url = window.URL.createObjectURL(blob);
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = fullscreenImg.split('/').pop() || 'image.jpg';
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    window.URL.revokeObjectURL(url);
                                } catch (e) {
                                    alert('Failed to download image.');
                                }
                            }}
                        >
                            {hindi ? "डाउनलोड करें" : "Download"}
                        </button>
                        <button className="homepage-img-modal-close" onClick={() => setFullscreenImg(null)}>&times;</button>
                    </div>
                </div>
            )}

            {/* Contact Section */}
            <section id="contact" className="homepage-contact">
                <div className="homepage-contact-title">{contactTitle}</div>
                <form className="homepage-contact-form">
                    <input
                        type="text"
                        placeholder={hindi ? "आपका नाम" : "Your Name"}
                        className="homepage-input"
                    />
                    <input
                        type="email"
                        placeholder={hindi ? "आपका ईमेल" : "Your Email"}
                        className="homepage-input"
                    />
                    <textarea
                        placeholder={hindi ? "आपका संदेश" : "Your Message"}
                        className="homepage-input homepage-textarea"
                    />
                    <button type="submit" className="homepage-button">
                        {hindi ? "संदेश भेजें" : "Send Message"}
                    </button>
                </form>
                <div className="homepage-contact-links-row">
                    <a href="tel:+918299365307" className="homepage-contact-link-row">
                        <span className="homepage-contact-link-label">{hindi ? "फोन:" : "Phone:"}</span>
                        +91-8299365307
                    </a>
                    <a href="mailto:vyansgroup@gmail.com" className="homepage-contact-link-row">
                        <span className="homepage-contact-link-label">{hindi ? "ईमेल:" : "Email:"}</span>
                        vyansgroup@gmail.com
                    </a>
                    <a href="mailto:anshu@thevyans.com" className="homepage-contact-link-row">
                        <span className="homepage-contact-link-label">{hindi ? "ईमेल:" : "Email:"}</span>
                        anshu@thevyans.com
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="homepage-footer">
                {footerText}
            </footer>
        </div>
    );
}

export default Homepage;