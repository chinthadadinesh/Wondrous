/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import { withRouter } from "react-router-dom";
// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
 
  const { classes } = props;
 
  return (
    <List className={classes.list}>
     
      <ListItem className={classes.listItem}>
        <Link
        to={"/dashboard"}
          color="transparent"
        
          className={classes.navLink}
        >
           Dashboard
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link
        to={"/myposts"}
          color="transparent"
         
          className={classes.navLink}
        >
          My Posts
        </Link>
      </ListItem>
      
      <ListItem className={classes.listItem}>
        <Link
             to={"/post"}
          color="transparent"
       
          className={classes.navLink}
        >
          New Post
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
           onClick={()=>{
             localStorage.clear()
            window.location="/login-page"
           }}
          color="transparent"
        
          className={classes.navLink}
        >
          Logout
        </Button>
      </ListItem>
      
      
      
    </List>
  );
}

export default withStyles(headerLinksStyle)(withRouter(HeaderLinks));
