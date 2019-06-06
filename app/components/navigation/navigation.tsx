import "./navigation.scss";
import { Resources } from "resources"
import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActionCreators from "../../redux/modules/users/users";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid } from "@material-ui/core";

const DashboardLink = props => <Link to="/dashboard" {...props} />
const AccountsLink = props => <Link to="/accounts" {...props} />
const JobsLink = props => <Link to="/jobs" {...props} />
const UsersLink = props => <Link to="/users" {...props} />
const HealthLink = props => <Link to="/health" {...props} />
const SettingsLink = props => <Link to="/settings" {...props} />

const styles = (theme: Theme) => ({
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    tabNav: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
});

interface INavigationComponentState {
    anchorEl: any;
    mobileMoreAnchorEl: any;
    value: number;
}

const initialState: INavigationComponentState = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    value: 0,
};

interface INavigationComponentProps {
    history: any;
    isAuthed: boolean;
    isFetching: boolean;
    error: string;
    classes: any;
    fetchAndHandleAuthentication: (history: any) => void;
    handleLogout: (history: any) => void;
}

class NavigationComponent extends React.Component<INavigationComponentProps, INavigationComponentState> {
    static propTypes = {
        isAuthed: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired,
        fetchAndHandleAuthentication: PropTypes.func.isRequired,
        handleLogout: PropTypes.func.isRequired,
    }
    constructor(props: INavigationComponentProps) {
        super(props);
        this.state = initialState;
    }
    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    }
    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    }
    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    }
    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const isMenuOpen = Boolean(this.state.anchorEl);
        const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);
        const renderMenu = (
            <Menu
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem component={SettingsLink} onClick={this.handleMenuClose}>{Resources.Navigation.Settings}</MenuItem>
                <MenuItem onClick={() => this.props.handleLogout(this.props.history)}>{Resources.Navigation.SignOut}</MenuItem>
            </Menu>
        );
        const renderMobileMenu = (
            <Menu
                anchorEl={this.state.mobileMoreAnchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMobileMenuClose} component={DashboardLink}>{Resources.Navigation.Dashboard}</MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose} component={AccountsLink}>{Resources.Navigation.Accounts}</MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose} component={JobsLink}>{Resources.Navigation.Jobs}</MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose} component={UsersLink}>{Resources.Navigation.Users}</MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose} component={HealthLink}>{Resources.Navigation.Health}</MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose} component={SettingsLink}>{Resources.Navigation.Settings}</MenuItem>
                <MenuItem onClick={() => this.props.handleLogout(this.props.history)}>{Resources.Navigation.SignOut}</MenuItem>
            </Menu>
        );
        return (
            <div>
                <div className={this.props.classes.sectionDesktop}>
                    <div className={this.props.classes.tabNav}>
                        <AppBar position="static" color="default">
                            <Toolbar>
                                <Grid
                                    justify="space-between"
                                    alignItems="center"
                                    container
                                    spacing={24}
                                >
                                    <Grid item>
                                        <Typography variant="h6" color="inherit" noWrap>
                                            {Resources.Navigation.Senthil}
                                        </Typography>
                                    </Grid>
                                    {this.props.isAuthed &&
                                        <Grid item>
                                            <Tabs
                                                value={this.state.value}
                                                onChange={this.handleChange}
                                                variant="scrollable"
                                                scrollButtons="on"
                                                indicatorColor="primary"
                                                textColor="primary"
                                            >
                                                <Tab label={Resources.Navigation.Dashboard} component={DashboardLink}></Tab>
                                                <Tab label={Resources.Navigation.Accounts} component={AccountsLink}></Tab>
                                                <Tab label={Resources.Navigation.Jobs} component={JobsLink}></Tab>
                                                <Tab label={Resources.Navigation.Users} component={UsersLink}></Tab>
                                                <Tab label={Resources.Navigation.Health} component={HealthLink}></Tab>
                                            </Tabs>
                                        </Grid>
                                    }
                                    {this.props.isAuthed &&
                                        <Grid item>
                                            <IconButton
                                                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                                                aria-haspopup="true"
                                                onClick={this.handleProfileMenuOpen}
                                                color="inherit"
                                            >
                                                <AccountCircle />
                                            </IconButton>
                                        </Grid>
                                    }
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </div>
                </div>
                <div className={this.props.classes.sectionMobile}>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Grid
                                justify="space-between"
                                alignItems="center"
                                container
                                spacing={24}
                            >
                                <Grid item>
                                    <Typography variant="h6" color="inherit" noWrap>
                                        {Resources.Navigation.Senthil}
                                    </Typography>
                                </Grid>
                                {this.props.isAuthed &&
                                    <Grid item>
                                        <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                            <MoreIcon />
                                        </IconButton>
                                    </Grid>
                                }
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </div>
                {renderMenu}
                {renderMobileMenu}
            </div>
        )
    }
}

export const Navigation = connect(
    (state: any) => {
        return ({ isAuthed: state.isAuthed, isFetching: state.isFetching, error: state.error });
    },
    (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(withStyles(styles)(NavigationComponent));