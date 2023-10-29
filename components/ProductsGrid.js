import styled from "styled-components";
import ProductBox from "@/components/ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding-top: 30px;
`;

export default function ProductsGrid({products}){
  return(
    <StyledProductsGrid>
      {products?.length > 0 && products.map((product) => (
        <ProductBox key={product._id} {...product} />
      ))}
    </StyledProductsGrid>
  );
}