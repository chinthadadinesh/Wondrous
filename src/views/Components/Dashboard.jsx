import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/icons
// core components
import TextField from '@material-ui/core/TextField';
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InputAdornment from "@material-ui/core/InputAdornment";
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
import MenuItem from '@material-ui/core/MenuItem';

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
const styles = theme => ({
  card: {
    maxWidth: '50%',

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
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [], cities: [],
      search: "",
      allposts: [],

    }
    this.getposts = this.getposts.bind(this)
    this.getcities = this.getcities.bind(this)
    
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.getDat = this.getDat.bind(this)
    this.handlecity = this.handlecity.bind(this)
  }
 
  getDat(toSearch, objects) {
    return new Promise((resolve, reject) => {
      let dat = objects.filter(function (object) {
        let searchStatus = 0;
        console.log(object['city'])
      

          for (const key in object) {
            if (object.hasOwnProperty(key)) {
              var patt = new RegExp(toSearch);
              if (patt.test(object[key]) ) {
                searchStatus = 1;
             
            }
          }
        }
       
        if (searchStatus) {
          return true;
        }
      });
      resolve(dat);
    });
  }
  handleSearchChange(e) {
    let toSearch = e.target.value;
    console.log(toSearch, "search");
    if (toSearch == "" || toSearch == undefined) {
      this.setState({
        posts: this.state.allposts,
        pageNumber: 1,
        totalCount: this.state.allposts.length,
        perPage: 8,
        activePage: 1,

      });
    } else {
      let objects;
      if(this.state.city){
        objects = this.state.allposts.filter((post)=>(
            post.city==this.state.city
        ));
      }
      else{
        objects = this.state.allposts;
      }
     
      this.getDat(toSearch, objects)
        .then(dat => {
          console.log(dat, "data1111");
          this.setState({

           posts: dat,
          });
        
        })
        .catch((err) => {

          console.log(err)
        })
    }
  }
  handlecity(e) {
    console.log(e, "data")
    let posts;
    if(e.target.value){
       posts=this.state.allposts.filter((post)=>(
        post['city']==e.target.value

      ))
      this.setState({
        [e.target.name]: e.target.value,
        posts:posts
      })
    }
    else{
      this.setState({
        [e.target.name]: e.target.value,
        posts:this.state.allposts
      })
    }
  
   
  }
  getcities() {
    fetch("/api/getcities", {
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
            cities: status.rows
          })
        }
      })
      .catch(err => {
        console.log(err);

      });
  }
  componentDidMount() {
    if(localStorage.getItem("id")){
      this.getposts()
      this.getcities()
    }
    else{
      this.props.history.push("/login-page")
    }
  
  }
  addvote(id) {
    fetch("/api/addvote/" + id, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },

    })
      .then(response => response.json())
      .then(status => {
        if (status.code == 200) {
          this.getposts()
        }
      })
      .catch(err => {
        console.log(err);

      });
  }
  getposts() {
    fetch("/api/getallposts", {
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
           errorOnLoad: false,
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
          <div style={{ padding: '10px' }}>
            <div>

              <CustomInput
                labelText="Search..."
                id="first"
                name="search"

                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  type: "text",
                  name: "search",
                  onChange: this.handleSearchChange,

                  endAdornment: (
                    <InputAdornment position="end">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <TextField
                id="filled-select-currency"
                select
                name="city"
                className={classes.textField}
                value={this.state.city}
                onChange={this.handlecity}

                helperText="Please select your city"
                margin="normal"
                variant="filled"
              >
                <MenuItem value="">
                  ""
            </MenuItem>
                {this.state.cities.map(option => (
                  <MenuItem key={option.city_id} value={option.city_id}>
                    {option.city_name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <h4>{this.state.posts.length } Results Found</h4>
            </div>

          {
            this.state.posts.map((post) => (
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
          }

        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(componentsStyle)(Dashboard);
