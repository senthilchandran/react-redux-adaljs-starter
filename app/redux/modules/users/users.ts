import { User } from "models";
import { authenticate, logout } from "components";

const AUTH_USER = "AUTH_USER";
const UNAUTH_USER = "UNAUTH_USER";
const FETCHING_USER = "FETCHING_USER";
const FETCHING_USER_FAILURE = "FETCHING_USER_FAILURE";
const FETCHING_USER_SUCCESS = "FETCHING_USER_SUCCESS";

const authUser = (userName: string, user: User) => {
  return {
    type: AUTH_USER,
    userName,
    user,
  }
}

export const unauthUser = () => {
  return {
    type: UNAUTH_USER,
  }
}

const fetchingUser = () => {
  return {
    type: FETCHING_USER,
  }
}

const fetchingUserFailure = (error: string) => {
  return {
    type: FETCHING_USER_FAILURE,
    error: "Error fetching user.",
  }
}

const fetchingUserSuccess = (userName: string, user: User, timestamp: Date) => {
  return {
    type: FETCHING_USER_SUCCESS,
    userName,
    user,
    timestamp,
  }
}

export const fetchAndHandleAuthentication = (history: any) => {
  return (dispatch: any) => {
    dispatch(fetchingUser());
    authenticate().then((user: any) => {
      dispatch(fetchingUserSuccess(user.userName, user, new Date()));
      dispatch(authUser(user.userName, user));
      history.push("/dashboard");
    }).catch((error) => dispatch(fetchingUserFailure(error)));
  };
}

export const handleLogout = (history: any) => {
    return (dispatch: any) => {
        logout().then(() => {
            dispatch(unauthUser());
            history.push("/");
        }).catch(error => {
            history.push("/dashboard");
        });
    };
}

const initialUserState: User = {
    userName: "",
    lastUpdated: new Date(),
    profile: null,
}

export const user = (state = initialUserState, action: any) => {
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return {
        ...state,
        userName: action.user.userName,
        lastUpdated: action.timestamp,
        profile: action.user.profile,
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  error: "",
  isAuthed: false,
  authedUserName: "",
  user: null,
}

export const users = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH_USER :
      return {
        ...state,
        isAuthed: true,
        authedUserName: action.user.userName,
      }
    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedUserName: "",
      }
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
          ...state,
          isFetching: false,
          error: "",
        }
        : {
          ...state,
          isFetching: false,
          error: "",
          user: user(state[action.user.userName], action),
        }
    default :
      return state
  }
}