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

function HeaderLinks1({ ...props }) {
 
  const { classes } = props;
 
  return (
    <List className={classes.list}>
     
     
      <ListItem className={classes.listItem}>
        <Link
        to={"/registration"}
          color="transparent"
         
          className={classes.navLink}
        >
          Signup
        </Link>
      </ListItem>
      
      <ListItem className={classes.listItem}>
        <Link
             to={"/login-page"}
          color="transparent"
       
          className={classes.navLink}
        >
          Signin
        </Link>
      </ListItem>
     
      
      
      
    </List>
  );
}

export default withStyles(headerLinksStyle)(withRouter(HeaderLinks1));
