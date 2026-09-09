import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button, Icon, Flex, Text, useTheme } from '@pega/cosmos-react-core';
import styled from 'styled-components';

const StyledCarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  background-color: #000;
`;

const SlidesContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
  height: ${({ height }) => height || '400px'};
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CaptionOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 1rem;
  text-align: center;
`;

const NavButton = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  ${({ direction }) => (direction === 'left' ? 'left: 10px;' : 'right: 10px;')}
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${({ active }) => (active ? '#fff' : 'rgba(255, 255, 255, 0.5)')};
  cursor: pointer;
  padding: 0;
  transition: background 0.3s ease;
`;

/**
 * Image Carousel Component for Pega Constellation
 */
export default function ImageCarousel(props) {
  const {
    getPConnect,
    images = [],
    autoPlay = true,
    autoPlayInterval = 5000,
    height = '400px',
    showArrows = true,
    showDots = true
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const validImages = useMemo(() => {
    if (Array.isArray(images) && images.length > 0) return images;
    // Default fallback if no images provided
    return [
      { url: 'https://via.placeholder.com/800x400?text=No+Image+1', alt: 'Placeholder 1', caption: 'No images configured' },
      { url: 'https://via.placeholder.com/800x400?text=No+Image+2', alt: 'Placeholder 2', caption: 'Please provide an image list' }
    ];
  }, [images]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % validImages.length);
  }, [validImages.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + validImages.length) % validImages.length);
  }, [validImages.length]);

  useEffect(() => {
    if (autoPlay && !isPaused) {
      const timer = setInterval(handleNext, autoPlayInterval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, autoPlayInterval, isPaused, handleNext]);

  if (!validImages.length) return null;

  return (
    <StyledCarouselWrapper
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SlidesContainer currentIndex={currentIndex} height={height}>
        {validImages.map((image, index) => (
          <Slide key={index}>
            <StyledImage src={image.url} alt={image.alt || `Slide ${index}`} />
            {image.caption && (
              <CaptionOverlay>
                <Text variant="h3">{image.caption}</Text>
              </CaptionOverlay>
            )}
          </Slide>
        ))}
      </SlidesContainer>

      {showArrows && validImages.length > 1 && (
        <>
          <NavButton direction="left" onClick={handlePrev} aria-label="Previous Slide">
            <Icon name="chevron-left" />
          </NavButton>
          <NavButton direction="right" onClick={handleNext} aria-label="Next Slide">
            <Icon name="chevron-right" />
          </NavButton>
        </>
      )}

      {showDots && validImages.length > 1 && (
        <DotsContainer>
          {validImages.map((_, index) => (
            <Dot
              key={index}
              active={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </DotsContainer>
      )}
    </StyledCarouselWrapper>
  );
}