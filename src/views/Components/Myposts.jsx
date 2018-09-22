import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
const styles = theme => ({
  card: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
 
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
 });
class Myposts extends React.Component {
  constructor(props){
    super(props)
    this.state={
      posts:[]
    }
    this.getposts=this.getposts.bind(this)
  }
  componentDidMount(){
    if(localStorage.getItem("id")){
      this.getposts()
    }
    else{
      this.props.history.push("/login-page")
    }
    
  }
  getposts(){
    fetch("/api/getmyposts/"+localStorage.getItem("id"), {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },

    })
      .then(response => response.json())
      .then(status => {
        if (status.code == 200) {
          this.setState({
            posts: status.rows.slice(0, 8),
            allposts: status.rows,

          })
        }
      })
      .catch(err => {
        console.log(err);

      });
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          brand="Wondrous"
          rightLinks={<HeaderLinks />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax image={require("assets/img/bg2.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>Wondrous</h1>
                  <h3 className={classes.subtitle}>
                    Find your Favorite Food in Your Favorite city.
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main, classes.mainRaised)}>
        {
           this.state.posts.length?( this.state.posts.map((post) => (
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      {post.name.slice(0, 1).toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={post.name}
                  subheader={post.posteddate.slice(0, 10)}
                />

                <CardContent>
                  <Typography component="p" style={{ paddingLeft: '30px' }}>
                    {post.description} , {post.city_name}
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <a onClick={() => this.addvote(post.postId)}>
                    <IconButton aria-label="Add to favorites" >
                      <FavoriteIcon />
                    </IconButton>
                  </a>
                  {post.votes}


                </CardActions>

              </Card>

            ))
          ):(<h1>No posts Found</h1>)
          }   
       
        </div>
      </div>
    );
  }
}
Myposts.propTypes = {
  classes: PropTypes.object.isRequired,
 };

export default withStyles(componentsStyle)(withRouter(Myposts));
