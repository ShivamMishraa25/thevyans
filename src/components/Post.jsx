import React from 'react'

function Post({ title, date, author, content, images, videos }) {
  return (
      <article className="homepage-post">
      <div className="homepage-post-title">{title}</div>
      <div className="homepage-post-meta">{date} &middot; {author}</div>
        <div className="homepage-post-content">{content}</div>
      {images && images.length > 0 && (
        <div className="homepage-post-media">
          {images.map((img, i) => (
            <img src={img} alt={title + ' ' + (i+1)} className="homepage-post-image" key={i} />
          ))}
        </div>
      )}
      {videos && videos.length > 0 && (
        <div className="homepage-post-media">
          {videos.map((vid, i) => (
            <div className="homepage-post-video-wrapper" key={i}>
              <iframe
                src={vid}
                title={title + ' video ' + (i+1)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="homepage-post-video"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  )
}

export default Post