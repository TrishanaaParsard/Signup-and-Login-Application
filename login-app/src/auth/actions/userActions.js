import axios from "axios";
import { sessionService } from "redux-react-session";
import { useNavigate} from "react-router-dom";

// the local endpoint
const localUrl = "http://localhost:5000/";
const currentUrl = localUrl;

// Login
export const loginUser = (credentials, navigate, setFieldError, setSubmitting) => {
    // Make checks and gets data
    return () => {
    axios.post(`${currentUrl}user/login`, credentials, 
    {
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        }
    }
    ).then((response) => {
        const {data} = response;

        if(data.status === "FAILED"){
            const {message} = data;

            // Check for specific error
            if (message.includes("credentials")){
                setFieldError("email", message);
                setFieldError("password", message);
            } else if (message.includes("password")){
                setFieldError("password", message);
            } else if (message.toLowerCase().includes("email")){
                setFieldError("email", message);
            }

        } else if (data.status === "SUCCESS"){
            const userData = data.data[0];

            const token = userData._id;

            sessionService.saveSession(token).then(() => {
                sessionService.saveUser(userData).then(() => {
                    navigate('/dashboard');
                }).catch(err => console.error(err))
            }).catch(err => console.error(err))
        }

        // complete submission
        setSubmitting(false);

    }).catch(err => console.error(err))
}
};

//Sign up
export const signupUser = (credentials, navigate, setFieldError, setSubmitting) => {
    return (dispatch) => {
        axios.post(`${currentUrl}user/signup`, credentials, 
        {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            }
        }
        ).then((response) => {
            const {data} = response;

            if (data.status === "FAILED"){
                const {message} = data; 

                // Checking for specific error
                if (message.includes("email")){
                    setFieldError("email", message);
                } else if (message.includes("password")){
                    setFieldError("password", message);
                } 
            } else if ( data.status === "PENDING"){
                // Display message for email verification
                // email, password ignore this comment
                const {email} = credentials;
                const navigate = useNavigate();
                navigate(`/emailsent/${email}`);


                //ignore this one too
               //dispatch( loginUser ({email, password}, navigate, setFieldError, setSubmitting));
            }
             // complete submission
             setSubmitting(false);

        }).catch(err => console.error(err))
    }
};

export const logoutUser = ()=> {
    return() => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        const navigate = useNavigate();
        navigate('/');
    }
}