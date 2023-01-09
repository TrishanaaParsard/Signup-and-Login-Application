import { StyledTitle,StyledButton,ButtonGroup, StyledFormArea, colors} from "../components/Styles";

//auth & redux
import { connect } from "react-redux";
import { logoutUser } from "../auth/actions/userActions";

// React router
import { useNavigate } from "react-router-dom";

const Dashboard = ({logoutUser, user}) => {
    const navigate = useNavigate();
    return(
       <div>
        <StyledFormArea bg={colors.dark2}>
        <StyledTitle size={65}>
            Welcome, User!
        </StyledTitle>
        <ButtonGroup>
        <StyledButton to="#" onClick={() => logoutUser(navigate)}> Logout</StyledButton>
        </ButtonGroup>
        </StyledFormArea>
        
       </div>
    );
};

const mapStateToProps = ({ session})=> ({
    user: session.user,
})

export default connect(mapStateToProps, {logoutUser})(Dashboard);