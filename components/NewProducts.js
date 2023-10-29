import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h1`
  margin: 0;
  font-weight: 3rem;
  padding-top: 30px;
  color: #aaa;
`;

export default function NewProducts({products}) {
  return(
    <Center>
      <Title>Latest Products</Title>
      <ProductsGrid products={products} />
    </Center>
    
  );
}