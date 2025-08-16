import React from 'react'

function getYoutubeEmbedUrl(url) {
  // Handles both share and normal links
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") {
      // Share link: https://youtu.be/VIDEO_ID
      const videoId = u.pathname.slice(1);
      let embedUrl = `https://www.youtube.com/embed/${videoId}`;
      if (u.search) embedUrl += u.search; // preserve query params
      return embedUrl;
    }
    if (u.hostname.includes("youtube.com")) {
      // Watch link: https://www.youtube.com/watch?v=VIDEO_ID
      const params = u.searchParams;
      const videoId = params.get("v");
      if (videoId) {
        let embedUrl = `https://www.youtube.com/embed/${videoId}`;
        // preserve start time etc.
        const embedParams = [];
        if (params.get("t")) embedParams.push(`start=${params.get("t").replace('s','')}`);
        if (params.get("si")) embedParams.push(`si=${params.get("si")}`);
        if (embedParams.length) embedUrl += "?" + embedParams.join("&");
        return embedUrl;
      }
    }
    // fallback: return original
    return url;
  } catch {
    return url;
  }
}

function Post({ title, date, author, content, images, videos, onImageClick }) {
  return (
      <article className="homepage-post">
      <div className="homepage-post-title">{title}</div>
      <div className="homepage-post-meta">{date} &middot; {author}</div>
        <div className="homepage-post-content">{content}</div>
      {images && images.length > 0 && (
        <div className="homepage-post-media">
          {images.map((img, i) => (
            <img
              src={img}
              alt={title + ' ' + (i+1)}
              className="homepage-post-image"
              key={i}
              onClick={() => onImageClick(img)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      )}
      {videos && videos.length > 0 && (
        <div className="homepage-post-media">
          {videos.map((vid, i) => (
            <div className="homepage-post-video-wrapper" key={i}>
              <iframe
                src={getYoutubeEmbedUrl(vid)}
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