// to use this search (npm i @emotion/react @emotion/styled)to fix the icon installing error.
import { Search, AddShoppingCartOutlined, Badge, ShoppingCartCheckoutOutlined } from '@mui/icons-material';
import React from 'react'
import { styled } from 'styled-components'
import { mobile } from "../responsive"
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

// eslint-disable-next-line
const Container = styled.div`   // this is styled components just to ignore repeated use of divi componts
    height: 60px;
    ${mobile({ height: "50px" })}
`;
// eslint-disable-next-line
const Wrapper = styled.div`

    padding :10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}

`;

// eslint-disable-next-line 
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;

`;
// eslint-disable-next-line 
const Language = styled.span`

    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}

`;
// eslint-disable-next-line 
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`

    border: none;
    ${mobile({ width: "50px" })}
    
 `;

const Center = styled.div`
 flex: 1;
 text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "24px" })}

`;
const Right = styled.div`
 flex: 1;
 display: flex;
 align-items: center;
 justify-content: flex-end;
 ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)
    console.log(quantity);
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder="search" />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center><Logo>ADHII.</Logo></Center>
                <Right>
                    <MenuItem>REGISTER</MenuItem>
                    <MenuItem>SIGN IN</MenuItem>
                    <Link to="/cart">
                    <MenuItem>
                        {/* <Badge badgecontent={quantity} color="primary"> */}
                            <AddShoppingCartOutlined badgecontent={quantity} color="primary"/>
                        {/* </Badge> */}
                    </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;
