import { Resources } from "resources";
import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from "../../redux/modules/users/users";
import { User } from "../../models";

interface IHealthComponentState {
}

const initialState: IHealthComponentState = {
};

interface IHealthComponentProps {
    isAuthed: boolean;
    currentUser: User;
}

class HealthComponent extends React.Component<IHealthComponentProps, IHealthComponentState> {
    static propTypes = {
        isAuthed: PropTypes.bool.isRequired,
    }
    constructor(props: IHealthComponentProps) {
        super(props);
        this.state = initialState;
    }
    render() {
        return (
            <div>
                <h1>Health page!</h1>
                <h2>{this.props.currentUser.userName}</h2>
            </div>
        )
    }
}

export const Health = connect(
    (state: any) => {
        return ({ isAuthed: state.isAuthed, currentUser: state.user });
    },
    (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(HealthComponent);

