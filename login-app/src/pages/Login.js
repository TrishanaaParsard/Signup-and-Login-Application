//Styled components
import {StyledFormArea, StyledFormButton, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyRightText} from './../components/Styles'

//formik
import {Formik, Form} from 'formik';
import {TextInput} from "./../components/FormLib";
import * as Yup from 'yup';

//icons
import {FiMail, FiLock} from 'react-icons/fi';

//loader
import {Bars} from 'react-loader-spinner';

//auth & redux
import { connect } from 'react-redux';
import { loginUser } from '../auth/actions/userActions';
import { useNavigate, useParams } from 'react-router-dom';

const Login = ({loginUser}) => {
    const navigate = useNavigate();
    const {useEmail} = useParams();

    return(
       <div>
        <StyledFormArea>
            <StyledTitle color={colors.theme}size={30}>
                Member Login
            </StyledTitle>
            <Formik
                    initialValues={{
                        email: useEmail,
                        password: "",
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Invalid email address.")
                                .required("Required"),
                            password: Yup.string()
                                .min(8, "Password is too short.")
                                .max(20, "Password is too long.")
                                .required("Reqiured"),
                        })
                    }
                    onSubmit={(values, {setSubmitting, setFieldError}) =>{
                        console.log(values);
                        loginUser(values, navigate, setFieldError, setSubmitting);
                    }}
                >
                {({isSubmitting}) => (
                    <Form>
                        <TextInput 
                            name="email"
                            type="text"
                            label="Email Address"
                            placeholder="example@example.com"
                            icon={<FiMail/>}
                        />
                        <TextInput
                             name="password"
                             type="password"
                             label="Password"
                             placeholder="********"
                             icon={<FiLock/>}
                        />
                        <ButtonGroup>
                          {!isSubmitting && <StyledFormButton type='submit'>  Login </StyledFormButton>}
                            
                            {isSubmitting && (
                                <Bars
                                    type="ThreeDots"
                                    color={colors.theme}
                                    height={50}
                                    width={100}
                                />
                            )}
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
            <ExtraText>
                New Here? <TextLink to="/signup">Signup</TextLink>
            </ExtraText>
        </StyledFormArea>
        <CopyRightText>
            All rights reserved &copy;2022
        </CopyRightText>
       </div>
    );
}

export default connect(null, {loginUser}) (Login);