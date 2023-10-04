import Header from '@/components/Header';
import Center from '@/components/Center';
import styled from 'styled-components';
import Button from '@/components/Button';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/components/CartContext';
import axios from 'axios';
import Table from '@/components/Table';
import Input from '@/components/Input';

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 1px solid rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  img{
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 5px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage(){
  const {cartProducts, addProduct, removeProduct} = useContext(CartContext);
  const [products, setProducts] = useState([]);

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [streetAddress,setStreetAddress] = useState('');
  const [country,setCountry] = useState('');

  useEffect(() => {
    if(cartProducts.length > 0){
      axios.post('/api/cart', {ids: cartProducts})
      .then(res => {
        setProducts(res.data);
      })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function moreOfThisProduct(id){
    addProduct(id);
  }

  function lessOfThisProduct(id){
    removeProduct(id);
  }

  async function goToPayment(){
    const res = await axios.post('/api/checkout', {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (res.data.url){
      window.location = res.data.url;
    }
  }

  let total = 0;
  for(const productID of cartProducts){
    const price = products.find(product => product._id === productID)?.price || 0;
    total += price;
  }

  if(window.location.href.includes('success')){
    return(
      <>
        <Header />
        <Center>
          <Box>
            <h1>Thank you for your purchase!</h1>
            <p>
              We will email you when your order is 
              ready to be shipped.
            </p>
          </Box>
        </Center>
      </>
    )
  }

  return(
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && (
              <div>Your cart is empty</div>
            )}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt=""/>
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => lessOfThisProduct(product._id)} >
                          -
                        </Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product._id).length}
                        </QuantityLabel>
                        <Button 
                          onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>${product.price * cartProducts.filter(id => id === product._id).length}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Total: ${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
                <Input type="text"
                        placeholder="Name"
                        value={name}
                        name="name"
                        onChange={ev => setName(ev.target.value)} />
                <Input type="text"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={ev => setEmail(ev.target.value)}/>
                <CityHolder>
                  <Input type="text"
                          placeholder="City"
                          value={city}
                          name="city"
                          onChange={ev => setCity(ev.target.value)}/>
                  <Input type="text"
                          placeholder="Postal Code"
                          value={postalCode}
                          name="postalCode"
                          onChange={ev => setPostalCode(ev.target.value)}/>
                </CityHolder>
                <Input type="text"
                        placeholder="Street Address"
                        value={streetAddress}
                        name="streetAddress"
                        onChange={ev => setStreetAddress(ev.target.value)}/>
                <Input type="text"
                        placeholder="Country"
                        value={country}
                        name="country"
                        onChange={ev => setCountry(ev.target.value)}/>
                <Button block primary 
                  onClick={goToPayment}>
                  Continue to payment
                </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}