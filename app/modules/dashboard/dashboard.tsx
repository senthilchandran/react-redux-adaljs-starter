import { Resources } from "resources";
import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from "../../redux/modules/users/users";
import { User } from "../../models";

interface IDashboardComponentState {
}

const initialState: IDashboardComponentState = {
};

interface IDashboardComponentProps {
    isAuthed: boolean;
    currentUser: User;
}

class DashboardComponent extends React.Component<IDashboardComponentProps, IDashboardComponentState> {
    static propTypes = {
        isAuthed: PropTypes.bool.isRequired,
    }
    constructor(props: IDashboardComponentProps) {
        super(props);
        this.state = initialState;
    }
    render() {
        return (
            <div>
                <h1>Dashboard page!</h1>
                <h2>Welcome {this.props.currentUser.userName}!</h2>
            </div>
        )
    }
}

export const Dashboard = connect(
    (state: any) => {
        return ({ isAuthed: state.isAuthed, currentUser: state.user });
    },
    (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(DashboardComponent);

