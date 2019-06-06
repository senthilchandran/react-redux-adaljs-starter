import { Resources } from "resources"
import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from "../../redux/modules/users/users";
import { authContext } from "../../../configs/adalConfig";

export const authenticate = () => {
    let token: any = authContext.getCachedToken(authContext.config.loginResource);
    let user: any = authContext.getCachedUser();
    let isAuthenticated: boolean = token !== null && token.length > 0;
    let loginError: string = authContext.getLoginError();
    fetch("/api/admin", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8"
        }
    }).then((result: any) => {
    });
    return new Promise((resolve, reject) => {
        if (isAuthenticated) {
            resolve({
                userName: user.userName,
                lastUpdated: new Date(),
                profile: user.profile
            });
        } else {
            reject({
            });
        }
    });
}

export const logout = () => {
    return new Promise((resolve, reject) => {
        try {
            authContext.logOut();
            resolve("Logged out!");
        } catch {
            reject("Error logging out.");
        }
    });
}

interface IAuthenticationComponentState {
}

const initialState: IAuthenticationComponentState = {
};

interface IAuthenticationComponentProps {
    history: any;
    isAuthed: boolean;
    isFetching: boolean;
    error: string;
    fetchAndHandleAuthentication: (history: any) => void;
}

class AuthenticationComponent extends React.Component<IAuthenticationComponentProps, IAuthenticationComponentState> {
    static propTypes = {
        isAuthed: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        fetchAndHandleAuthentication: PropTypes.func.isRequired,
    }
    constructor(props: IAuthenticationComponentProps) {
        super(props);
        this.state = initialState;
    }
    componentDidMount() {
        this.props.fetchAndHandleAuthentication(this.props.history);
    }
    render() {
        return (<div>Authenticating...</div>)
    }
}

export const Authentication = connect(
    (state: any) => {
        return ({ isAuthed: state.isAuthed, isFetching: state.isFetching, error: state.error });
    },
    (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(AuthenticationComponent);