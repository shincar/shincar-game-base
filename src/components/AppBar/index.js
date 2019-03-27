import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appbar: {
  },
  title: {
    display: 'none',
    
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'flex'
  },
});

class PrimaryAppBar extends React.Component {
  state = {
    anchorEl: null,
    anchorMainMenuEl: null,
  };
  
  handleMainMenuOpen = event => {
    this.setState({ anchorMainMenuEl: event.currentTarget });
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ 
      anchorEl: null,
      anchorMainMenuEl: null,
    });
  };
  
  handleMenuCliced(route) {
    this.props.history.push(route);
    this.handleMenuClose();
  }

  render() {
    const { anchorEl, anchorMainMenuEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMainMenuOpen = Boolean(anchorMainMenuEl);

    const renderMainMenu = (
      <Menu
        anchorEl={anchorMainMenuEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMainMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={() => this.handleMenuCliced(ROUTES.LANDING)}>首頁</MenuItem>
        <MenuItem onClick={() => this.handleMenuCliced(ROUTES.HOME)}>主畫面</MenuItem>
      </Menu>
    );
    
    const renderProfileMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <div>
              <MenuItem onClick={() => this.handleMenuCliced(ROUTES.ACCOUNT)}>帳號資訊</MenuItem>
              {authUser.roles.includes(ROLES.ADMIN) && (
                <MenuItem onClick={() => this.handleMenuCliced(ROUTES.ADMIN)}>帳號管理</MenuItem>
              )}
            </div>
          ) : (
            <div>
              <MenuItem onClick={() => this.handleMenuCliced(ROUTES.SIGN_IN)}>登入</MenuItem>
            </div>
          )
        }
      </AuthUserContext.Consumer>
        
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar} position="static">
          <Toolbar>
            <IconButton className={classes.menuButton}
              aria-label="Open drawer"
              aria-owns={isMainMenuOpen ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMainMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.grow}>
            <Typography className={classes.title} variant="h6" align="center" color="inherit" noWrap>
              Adam & Alvin 的遊戲基地
            </Typography>
            </div>
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <AuthUserContext.Consumer>
                {
                  authUser => authUser ? 
                  (
                    <SignOutButton />
                  ) : (
                    <div />
                  )
                }
              </AuthUserContext.Consumer>
            </div>
          </Toolbar>
        </AppBar>
        {renderMainMenu}
        {renderProfileMenu}
      </div>
    );
  }
}

PrimaryAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
                withStyles(styles),
                withRouter,
               )(PrimaryAppBar);