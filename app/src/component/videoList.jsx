import React from "react";

const VideoList = ({ videos }) => {
  return (
    <ul className="list-group video-list">
      {videos.map((video, index) => (
        <li key={index} className="list-group-item">
          {video}
        </li>
      ))}
    </ul>
  );
};

export default VideoList;
