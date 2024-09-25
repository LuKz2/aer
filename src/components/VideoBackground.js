import React from 'react';
import styled from 'styled-components';

const VideoBackground = ({ video }) => {
  return (
    <VideoContainer>
      <Video autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </Video>
      <GradientOverlay />
    </VideoContainer>
  );
};

export default VideoBackground;

// Styled Components

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #121212 120%);
`;
