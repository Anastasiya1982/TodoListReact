 import React from "react";
 import {Field, reduxForm} from "redux-form";
import {Input} from "./FormControls/FormsControls";



const LoginForm = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"email"} name={"email"}
                       component={Input}
                        //validate={[requiredField]}
                />
            </div>
            <div>
                <Field placeholder={"Password"} name={"password"} type={"password"}
                       component={Input}
                        //validate={[requiredField]}
                />
            </div>
            <div>
                <Field component={"input"} name={"rememberMe"} type={"checkbox"}/> remember
            </div>
            {props.error && <div className={"formSummaryError"}>
                {props.error}
            </div>
            }
            <div>
                <button>Log in</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props:any) => {

    return <div>
        <h1>LOGIN </h1>
        <LoginReduxForm onSubmit={props.onSubmit}/>
    </div>
}



export default Login;