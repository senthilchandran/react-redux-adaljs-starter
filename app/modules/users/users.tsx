import { Resources } from "resources";
import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from "../../redux/modules/users/users";
import { User } from "../../models";

interface IUsersComponentState {
}

const initialState: IUsersComponentState = {
};

interface IUsersComponentProps {
    isAuthed: boolean;
    currentUser: User;
}

class UsersComponent extends React.Component<IUsersComponentProps, IUsersComponentState> {
    static propTypes = {
        isAuthed: PropTypes.bool.isRequired,
    }
    constructor(props: IUsersComponentProps) {
        super(props);
        this.state = initialState;
    }
    render() {
        return (
            <div>
                <h1>Users page!</h1>
                <h2>{this.props.currentUser.userName}</h2>
            </div>
        )
    }
}

export const Users = connect(
    (state: any) => {
        return ({ isAuthed: state.isAuthed, currentUser: state.user });
    },
    (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(UsersComponent);

