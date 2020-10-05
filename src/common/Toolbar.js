import { AppBar, Fab, fade, IconButton, InputBase, ListItem, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Toolbar, withStyles } from "@material-ui/core";
import React from "react";
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from '@material-ui/icons/Send';
import BusinessIcon from '@material-ui/icons/Business';
import MissionIcon from '../icons/Mission';

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

const StyledMenuItem = withStyles((theme) => ({
root: {
    '&:focus': {
    backgroundColor: theme.palette.primary.main,
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
    },
    },
},
}))(MenuItem);
  
const useStyles = makeStyles((theme) => ({
    appBar: {
        top: "auto",
        bottom: 0
    },
    fabButton: {
        position: "absolute",
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: "0 auto"
    },
    grow: {
        flexGrow: 1
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
  }));

const ListItemLink = (props) => {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
    );

    return (
        <StyledMenuItem>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </StyledMenuItem>
    );
};

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

const ToolbarComponent = (props) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const { fabIcon, handleFabClick, color } = props;

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
      };

    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <IconButton 
                    edge="start" 
                    color="inherit" 
                    aria-label="open drawer"
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    onClick={handleMenuClick}
                    >
                    <MenuIcon />
                </IconButton>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <ListItemLink to="/clients" primary="Clients" icon={<SendIcon/>} color='inherit' editing={false} adding={false} listing={true} />
                    <ListItemLink to="/structures" primary="Structures" icon={<BusinessIcon/>} color='inherit'/>
                    <ListItemLink to="/missions" primary="Missions" icon={<MissionIcon/>} color='inherit'/>
                </StyledMenu>                

                {fabIcon ? <Fab color={color} aria-label="add Experience" className={classes.fabButton} onClick={handleFabClick} >{fabIcon}</Fab> : null}
                
                <div className={classes.grow} />
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase placeholder="Search..."
                        classes={{ 
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search'}}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
}

ToolbarComponent.propTypes = {
    fabIcon: PropTypes.element,
    handleFabClick: PropTypes.func,
    color: PropTypes.string,
};

export default ToolbarComponent;