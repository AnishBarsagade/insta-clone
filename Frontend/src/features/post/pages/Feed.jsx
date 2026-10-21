import React, { use, useEffect } from "react";
import "../style/Feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";

const Feed = () => {
  const { feed, handleGetFeed, loading } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is loading.</h1>
      </main>
    );
  }
  return (
    <main className="feed-page">
      <div className="feed">
        <div className="posts">
          {feed.map((post) => {
            return <Post user={post.user} post={post} loading={loading} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
