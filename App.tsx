import React, { useState } from 'react';
import Header from './components/Header';
import ProfileSidebar from './components/ProfileSidebar';
import CreatePost from './components/CreatePost';
import PostCard from './components/PostCard';
import JobsSidebar from './components/JobsSidebar';
import ConnectionsSidebar from './components/ConnectionsSidebar';
import { posts as initialPosts } from './data/mockData';
import { Post } from './types';

function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Profile */}
          <div className="lg:col-span-3">
            <div className="sticky top-20">
              <ProfileSidebar />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-6">
            <div className="space-y-6">
              <CreatePost />
              
              {/* Posts Feed */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onLike={handleLike}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Sidebar - Jobs and Connections */}
          <div className="lg:col-span-3">
            <div className="sticky top-20 space-y-6">
              <JobsSidebar />
              <div className="hidden xl:block">
                <ConnectionsSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;