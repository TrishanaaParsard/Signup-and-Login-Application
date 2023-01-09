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
import { signupUser } from '../auth/actions/userActions';
import { useNavigate } from 'react-router-dom';

const Signup = ({signupUser}) => {
    const navigate = useNavigate();
    return(
       <div>
        <StyledFormArea>
            <StyledTitle color={colors.theme}size={30}>
                Member Signup
            </StyledTitle>
            <Formik 
            initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
                }} 
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email("Invalid email address!")
                        .required("Required"),
                    password: Yup.string()
                        .min(8, "Password is too short!")
                        .max(30, "Password is too long!")
                        .required("Required"),
                    confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Passwords must match")
                })}
                 onSubmit={(values, {setSubmitting, setFieldError}) => {
                    console.log(values);
                    signupUser(values, navigate, setFieldError, setSubmitting)
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
                        <TextInput
                             name="confirmPassword"
                             type="password"
                             label="Confirm Password"
                             placeholder="********"
                             icon={<FiLock/>}
                        />
                        <ButtonGroup>
                          {!isSubmitting && <StyledFormButton type='submit'>  Signup </StyledFormButton>}
                            
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
                Already have an Account? <TextLink to="/login">Login</TextLink>
            </ExtraText>
        </StyledFormArea>
        <CopyRightText>
            All rights reserved &copy;2022
        </CopyRightText>
       </div>
    );
}

export default connect(null, {signupUser}) (Signup);