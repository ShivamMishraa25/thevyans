import React from 'react'

function Post({ title, date, author, content }) {
  return (
    <article className="homepage-post">
      <div className="homepage-post-title">{title}</div>
      <div className="homepage-post-meta">{date} &middot; {author}</div>
      <div className="homepage-post-content">{content}</div>
    </article>
  )
}

export default Post