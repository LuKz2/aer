import React from 'react';
import styled from 'styled-components';

const VideoBackground = ({ video }) => {
  return (
    <Video autoPlay loop muted disablePictureInPicture>
      <source src={video} type="video/mp4" />
    </Video>
  );
};

export default VideoBackground;

const Video = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;
