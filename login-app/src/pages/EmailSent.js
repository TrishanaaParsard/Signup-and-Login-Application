import { StyledTitle,StyledButton,ButtonGroup, StyledFormArea, colors, ExtraText} from "../components/Styles";

// React router
import { useParams } from "react-router-dom";

const EmailSent = () => {
    const {userEmail} = useParams();

    return(
       <div>
        <StyledFormArea bg={colors.dark2}>
        <StyledTitle size={65}> Account Confirmation </StyledTitle>
        <ExtraText color={colors.light1}> An email with your account confimation link has been sent to your email: <b> {userEmail} </b> </ExtraText>
        <ExtraText color={colors.light1}> Check your email and come back to proceed. </ExtraText>
        <ButtonGroup>
        <StyledButton to={`/login/${userEmail}`}> Proceed</StyledButton>
        </ButtonGroup>
        </StyledFormArea>
        
       </div>
    );
}

export default EmailSent;