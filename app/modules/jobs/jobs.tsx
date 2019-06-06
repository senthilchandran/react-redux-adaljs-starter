import { Resources } from "resources";
import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from "../../redux/modules/users/users";
import { User } from "../../models";

interface IJobsComponentState {
}

const initialState: IJobsComponentState = {
};

interface IJobsComponentProps {
    isAuthed: boolean;
    currentUser: User;
}

class JobsComponent extends React.Component<IJobsComponentProps, IJobsComponentState> {
    static propTypes = {
        isAuthed: PropTypes.bool.isRequired,
    }
    constructor(props: IJobsComponentProps) {
        super(props);
        this.state = initialState;
    }
    render() {
        return (
            <div>
                <h1>Jobs page!</h1>
                <h2>{this.props.currentUser.userName}</h2>
            </div>
        )
    }
}

export const Jobs = connect(
    (state: any) => {
        return ({ isAuthed: state.isAuthed, currentUser: state.user });
    },
    (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(JobsComponent);

