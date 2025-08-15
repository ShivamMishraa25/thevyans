import React, { useState } from 'react'
import Post from '../components/Post.jsx'
import { Link } from 'react-router-dom';

function Homepage() {
    // 10 posts, some with multiple images/videos/mix
    const posts = [
        {
            title: "Welcome to The Vyans Blog",
            date: "June 2024",
            author: "Admin",
            content: "Discover insights, stories, and updates from our team. Stay tuned for regular posts on technology, design, and more.",
            images: [
                "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
            ]
        },
        {
            title: "Modern UI/UX Trends",
            date: "May 2024",
            author: "Jane Doe",
            content: "Explore the latest trends in user interface and experience design. Learn how to create aesthetic and functional web applications.",
            videos: [
                "https://www.youtube.com/embed/3tmd-ClpJxA"
            ]
        },
        {
            title: "Our Team Retreat",
            date: "April 2024",
            author: "Team Vyans",
            content: "A glimpse into our recent team retreat. Collaboration, fun, and new ideas!",
            images: [
                "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
                "https://picsum.photos/id/237/200/300"
            ]
        },
        {
            title: "React Tips & Tricks",
            date: "March 2024",
            author: "John Smith",
            content: "Boost your React productivity with these essential tips and tricks.",
            videos: [
                "https://www.youtube.com/embed/dGcsHMXbSOA",
                "https://www.youtube.com/embed/Ke90Tje7VS0"
            ]
        },
        {
            title: "Design Inspiration",
            date: "February 2024",
            author: "Emily Lee",
            content: "Check out some of our favorite design inspirations this month.",
            images: [
                "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
            ]
        },
        {
            title: "How We Work Remotely",
            date: "January 2024",
            author: "Remote Team",
            content: "Tips and tools for effective remote collaboration.",
            images: [
                "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
            ],
            videos: [
                "https://www.youtube.com/embed/ysz5S6PUM-U"
            ]
        },
        {
            title: "Tech Stack 2024",
            date: "December 2023",
            author: "Tech Lead",
            content: "Our favorite technologies for building modern web apps.",
            images: [
                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
            ]
        },
        {
            title: "Celebrating Achievements",
            date: "November 2023",
            author: "HR",
            content: "Celebrating our team's milestones and achievements.",
            images: [
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1465101178521-c1a4c8a0a8b7?auto=format&fit=crop&w=600&q=80"
            ],
            videos: [
                "https://www.youtube.com/embed/ScMzIvxBSi4"
            ]
        },
        {
            title: "Frontend vs Backend",
            date: "October 2023",
            author: "Dev Team",
            content: "A fun comparison between frontend and backend development.",
            videos: [
                "https://www.youtube.com/embed/tgbNymZ7vqY"
            ]
        },
        {
            title: "Year in Review",
            date: "September 2023",
            author: "Editor",
            content: "A look back at our favorite moments and posts from the past year.",
            images: [
                "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
            ],
            videos: [
                "https://www.youtube.com/embed/3tmd-ClpJxA",
                "https://www.youtube.com/embed/dGcsHMXbSOA"
            ]
        }
    ];

    const about = {
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&q=80",
        englishContent: "We are The Vyans, a team passionate about sharing knowledge and stories in technology, design, and innovation. Our blog is dedicated to providing valuable insights and inspiration for modern creators and thinkers.",
        hindiContent: "हम द व्यांस हैं, जो तकनीक, डिज़ाइन और नवाचार में ज्ञान और कहानियाँ साझा करने के लिए समर्पित हैं। हमारा ब्लॉग आधुनिक रचनाकारों और विचारकों के लिए मूल्यवान जानकारी और प्रेरणा प्रदान करता है।"
    }

    const [navOpen, setNavOpen] = useState(false)
    const [hindi, setHindi] = useState(false)

    // Hindi/English text for nav, contact, footer, brand
    const navText = hindi
        ? { brand: "द व्यांस", about: "परिचय", contact: "संपर्क", login: "लॉगिन" }
        : { brand: "The Vyans", about: "About", contact: "Contact", login: "Login" }
    const contactTitle = hindi ? "संपर्क करें" : "Contact Us"
    const footerText = hindi
        ? `© ${new Date().getFullYear()} द व्यांस. सर्वाधिकार सुरक्षित.`
        : `© ${new Date().getFullYear()} The Vyans. All rights reserved.`

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
                            <rect y="6" width="28" height="3" rx="1.5" fill="#222"/>
                            <rect y="13" width="28" height="3" rx="1.5" fill="#222"/>
                            <rect y="20" width="28" height="3" rx="1.5" fill="#222"/>
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
                        images={post.images}
                        videos={post.videos}
                    />
                ))}
            </section>

            {/* Contact Section */}
            <section id="contact" className="homepage-contact">
                <div className="homepage-contact-title">{contactTitle}</div>
                <form className="homepage-contact-form">
                    <input type="text" placeholder="Your Name" className="homepage-input" />
                    <input type="email" placeholder="Your Email" className="homepage-input" />
                    <textarea placeholder="Your Message" className="homepage-input homepage-textarea" />
                    <button type="submit" className="homepage-button">Send Message</button>
                </form>
            </section>

            {/* Footer */}
            <footer className="homepage-footer">
                {footerText}
            </footer>
        </div>
    )
}

export default Homepage