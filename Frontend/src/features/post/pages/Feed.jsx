import React from "react";
import "../style/Feed.scss";
const Feed = () => {
  return (
    <main className="feed-page">
      <div className="feed">
        <div className="posts">
          <div className="post">
            <div className="user">
              <div className="img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1791752462600-e3ef63bce539?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                  alt=""
                />
              </div>

              <p>Username</p>
            </div>
            <img
              src="https://plus.unsplash.com/premium_photo-1667121496100-ca96e50fbb29?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              alt=""
            />
            <div className="bottom">
              <p className="caption">caption caption</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Feed;
