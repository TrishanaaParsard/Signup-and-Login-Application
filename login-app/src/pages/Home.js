import { StyledTitle,StyledSubTitle,StyledButton,ButtonGroup} from "../components/Styles";



const Home = () => {
    return(
       <div>
        <StyledTitle size={65}>
            Welcome To Space with Triss
        </StyledTitle>
        <StyledSubTitle  size={25}>
            Feel Free to Exlpore my Page
        </StyledSubTitle>
        <ButtonGroup>
        <StyledButton to="/login"> Login</StyledButton>
        <StyledButton to="/signup">Signup</StyledButton>
        </ButtonGroup>
       </div>
    );
}

export default Home;