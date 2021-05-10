import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type MapDispatchToProps = {
    login: (email: string, password: string, rememberMe: boolean) => void
}
type MapStatePropsType = {
    isAuth: boolean
}
type LoginPropsType = MapDispatchToProps & MapStatePropsType

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    console.log("rerender LoginForm")
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required]} component={Input} name={"email"} placeholder={"Email"}/>
            </div>
            <div>
                <Field validate={[required]} component={Input} name={"password"} placeholder={"Password"} type={"password"}/>
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"checkbox"}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
})
const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
        props.login(formData.email,formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default connect(mapStateToProps, {login})(Login);