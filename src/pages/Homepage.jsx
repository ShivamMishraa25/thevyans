import React, { useState } from 'react'
import Post from '../components/Post.jsx'

function Homepage() {
    // Dummy posts data
    const posts = [
        {
            title: "Welcome to The Vyans Blog",
            date: "June 2024",
            author: "Admin",
            content: "Discover insights, stories, and updates from our team. Stay tuned for regular posts on technology, design, and more."
        },
        {
            title: "Modern UI/UX Trends",
            date: "May 2024",
            author: "Jane Doe",
            content: "Explore the latest trends in user interface and experience design. Learn how to create aesthetic and functional web applications."
        }
    ];

    const [navOpen, setNavOpen] = useState(false);

    return (
        <div className="homepage-container">
            {/* Navigation */}
            <nav className="homepage-nav">
                <div className="homepage-brand">The Vyans</div>
                {/* Hamburger icon for mobile */}
                <button
                    className="homepage-hamburger"
                    aria-label="Toggle navigation"
                    onClick={() => setNavOpen(!navOpen)}
                >
                    <svg width="28" height="28" viewBox="0 0 28 28">
                        <rect y="6" width="28" height="3" rx="1.5" fill="#222"/>
                        <rect y="13" width="28" height="3" rx="1.5" fill="#222"/>
                        <rect y="20" width="28" height="3" rx="1.5" fill="#222"/>
                    </svg>
                </button>
                {/* Nav Links */}
                <div
                    className={`homepage-nav-links${navOpen ? ' open' : ''}`}
                >
                    <a href="#about" className="homepage-nav-link" onClick={()=>setNavOpen(false)}>About</a>
                    <a href="#posts" className="homepage-nav-link" onClick={()=>setNavOpen(false)}>Posts</a>
                    <a href="#contact" className="homepage-nav-link" onClick={()=>setNavOpen(false)}>Contact</a>
                </div>
            </nav>

            {/* About Section */}
            <section id="about" className="homepage-about-section">
                <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&q=80"
                    alt="Profile"
                    className="homepage-about-img"
                />
                <div className="homepage-about-text">
                    <h2>About Us</h2>
                    <p>
                        We are The Vyans, a team passionate about sharing knowledge and stories in technology, design, and innovation.
                        Our blog is dedicated to providing valuable insights and inspiration for modern creators and thinkers.
                    </p>
                </div>
            </section>

            {/* Posts Section */}
            <section id="posts" className="homepage-posts">
                {posts.map((post, idx) => (
                    <Post
                        key={idx}
                        title={post.title}
                        date={post.date}
                        author={post.author}
                        content={post.content}
                    />
                ))}
            </section>

            {/* Contact Section */}
            <section id="contact" className="homepage-contact">
                <div className="homepage-contact-title">Contact Us</div>
                <form className="homepage-contact-form">
                    <input type="text" placeholder="Your Name" className="homepage-input" />
                    <input type="email" placeholder="Your Email" className="homepage-input" />
                    <textarea placeholder="Your Message" className="homepage-input homepage-textarea" />
                    <button type="submit" className="homepage-button">Send Message</button>
                </form>
            </section>

            {/* Footer */}
            <footer className="homepage-footer">
                &copy; {new Date().getFullYear()} The Vyans. All rights reserved.
            </footer>
        </div>
    )
}

export default Homepage