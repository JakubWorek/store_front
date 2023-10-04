import styled from "styled-components";
import Center from "@/components/Center";
import ProductBox from "@/components/ProductBox";

const Title = styled.h1`
  margin: 0;
  font-weight: 3rem;
  padding-top: 30px;
  color: #aaa;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding-top: 30px;
`;

export default function NewProducts({products}) {
  return(
    <Center>
      <Title>Latest Products</Title>
      <ProductsGrid>
        {products?.length > 0 && products.map((product) => (
          <ProductBox {...product} />
        ))}
      </ProductsGrid>
    </Center>
    
  );
}