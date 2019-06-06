import { Resources } from "resources";
import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from "../../redux/modules/users/users";
import { User } from "../../models";

interface IAccountsComponentState {
}

const initialState: IAccountsComponentState = {
};

interface IAccountsComponentProps {
    isAuthed: boolean;
    currentUser: User;
}

class AccountsComponent extends React.Component<IAccountsComponentProps, IAccountsComponentState> {
    static propTypes = {
        isAuthed: PropTypes.bool.isRequired,
    }
    constructor(props: IAccountsComponentProps) {
        super(props);
        this.state = initialState;
    }
    render() {
        return (
            <div>
                <h1>Accounts page!</h1>
                <h2>{this.props.currentUser.userName}</h2>
            </div>
        )
    }
}

export const Accounts = connect(
    (state: any) => {
        return ({ isAuthed: state.isAuthed, currentUser: state.user });
    },
    (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(AccountsComponent);

