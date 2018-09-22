import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import swal from 'sweetalert'
import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


import image from "assets/img/bg7.jpg";
import { withRouter } from "react-router-dom";

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      cities:[],
      userid:localStorage.getItem("id"),
      form:{

      }
    };
    this.inputChange=this.inputChange.bind(this)
    this.register=this.register.bind(this)
    this.getcities=this.getcities.bind(this)
  }
  componentDidMount(){
    if(localStorage.getItem("id")){
     console.log("id found")
    }
    else{
      this.props.history.push("/login-page")
    }
  }
  getcities(){
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
               cities:status.rows
           })
          } 
        })
        .catch(err => {
          console.log(err);
          
        });
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  register(e) {
    e.preventDefault()
if(this.state.city && this.state.description ){
  var formBody = [];

  formBody.push("table=" + encodeURIComponent("posts"));
  
  formBody.push("description=" + encodeURIComponent(this.state.description));
  formBody.push("city=" + encodeURIComponent(this.state.city));
  formBody.push("userId=" + encodeURIComponent(this.state.userid));


  formBody = formBody.join("&");

    fetch("/api/adddata", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody

    })
      .then(response => response.json())
      .then(status => {
        if (status.code == 200) {
          swal("Your post added successfully", "", "success")
            .then((value) => {
              this.props.history.push("/myposts")
            })
        } 
        else {
          swal("error in Post")
        }

      })
      .catch(err => {
        console.log(err);
        swal("Error in posting", "", "error");
      });
}
else{
  swal("all fields are required","","error")
}
 }

  async inputChange(e) {
    let property = e.target.name;
    let value = e.target.value;
    let error = '';
    let prev = await this.state.form;
    prev[property] = await value;
    await this.setState({
      form: prev
    })
    await console.log(this.state);
  
  }
  componentDidMount() {
      this.getcities()
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Wondrous"
         rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>New Post</h4>
                      </CardHeader>
                    {/* <p className={classes.divider}>Registration</p> */}
                    <CardBody>
                    <TextField
                     id="filled-multiline-flexible"
                     label="Post Data"
                     multiline
                         rowsMax="10"
          value={this.state.description}
          onChange={this.handleChange('description')}
        
          
          helperText="Description"
          variant="Post Description"
        />
                      <TextField
          id="filled-select-currency"
          select
         
          className={classes.textField}
          value={this.state.city}
          onChange={this.handleChange('city')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your city"
          margin="normal"
          variant="filled"
        >
          {this.state.cities.map(option => (
            <MenuItem key={option.city_id} value={option.city_id}>
              {option.city_name}
            </MenuItem>
          ))}
        </TextField>
                     
                    
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button onClick={this.register} simple color="primary" size="lg">
                       Post
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
{/* <Footer whiteFont /> */}
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(withRouter(NewPost));
