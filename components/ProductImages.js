import styled from "styled-components";
import { useState } from "react";

const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
  `;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${props => props.active ? `
    border-color: #ccc;
  ` : `
    border-color: transparent;
    opacity: 0.7;
  `}
  height: 40px;
  padding: 3px;
  cursor: pointer;
  border-radius: 5px;
`;


export default function ProductImages({images}){
  const [mainImage, setMainImage] = useState(images?.[0]);

  return(
    <>
      <BigImageWrapper>
        <BigImage src={mainImage} alt="product image" />
      </BigImageWrapper>
      <ImageButtons>
        {images.map(image => (
          <ImageButton 
            key={image}
            active={image===mainImage} 
            onClick={() => setMainImage(image)}> 
            <Image src={image} alt="product image" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  )
}