import { Email, Facebook, Instagram, LinkedIn, Phone, Pinterest, Room, Twitter } from "@mui/icons-material";
import { styled } from "styled-components"
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;

    ${mobile({flexDirection:"column"})}
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1`
`;

const Desc = styled.p`
    margin: 20px 0px;
`;

const SocialContainer = styled.div`
    display: flex;
    cursor: pointer;

`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;


const Center = styled.div`
    flex:1;
    padding: 20px;
    ${mobile({display:"none"})}

`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;

const Right = styled.div`
    flex:1;
    padding: 20px;
    ${mobile({backgroundColor:"#fff8f8"})}

`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

export const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>ADHII.</Logo>
            <Desc>
                There are many variations of passages of Lorem ipsum available, bu the majority have suffered
                alteration in some form, by injected humour, or randomised words which dont even slightly believable.
            </Desc>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <Facebook/>
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Instagram/>
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Twitter/>
                </SocialIcon>
                <SocialIcon color="E60023">
                    <Pinterest/>
                </SocialIcon>
                <SocialIcon color="3b5999">
                    <LinkedIn/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Men Fashion</ListItem>
                <ListItem>Women Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms & condn</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem><Room style = {{marginRight: "10px"}}/>66 laymon drive, clayton south 3166</ContactItem>
            <ContactItem><Phone style = {{marginRight: "10px"}}/>+61454534543</ContactItem>
            <ContactItem><Email style = {{marginRight: "10px"}}/>adhii.e-ccomerce@gmail.com</ContactItem>
            <Payment src = "https://help.zazzle.com/hc/article_attachments/360010513393/Logos-01.png"/>
        </Right> 

    </Container>
  )
}
