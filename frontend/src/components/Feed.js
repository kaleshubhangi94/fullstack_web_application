import React from 'react';

function Feed({ posts }) {
  return (
    <div>
      <h2>Feed</h2>
      {posts.map((post) => (
        <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <img src={post.photoUrl} alt={post.caption} style={{ width: '100px', height: '100px' }} />
          <p>{post.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default Feed;
