import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons

import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks1 from "components/Header/HeaderLinks1.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Email from "@material-ui/icons/Email";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CardHeader from "components/Card/CardHeader.jsx";


import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";
import swal from 'sweetalert'
import { withRouter } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      form:{}
    };
    this.inputChange=this.inputChange.bind(this)
    this.onlogin=this.onlogin.bind(this)
  }
  onlogin(e) {
    e.preventDefault()
if( this.state.form.email && this.state.form.password){
  var formBody = [];

  formBody.push("email=" + encodeURIComponent(this.state.form.email));
  formBody.push("password=" + encodeURIComponent(this.state.form.password));

  formBody = formBody.join("&");

    fetch("/api/userlogin", {
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
          localStorage.setItem("id",status.rows.userId)
         this.props.history.push("/dashboard")
        } else if(status.code==406){
          swal("email not registered","","error")
        }
        
        else if(status.code==402){
          swal("username/password mismatch","","error")
        }

      })
      .catch(err => {
        console.log(err);
        swal("username/password mismatch","","error")
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
          rightLinks={<HeaderLinks1 />}
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
                      <h4>Login</h4>
                     
                    </CardHeader>
                   
                    <CardBody>
                      
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          name:"email",
                          onChange:this.inputChange,
                          onBlur:this.inputChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          name:"password",
                          onChange:this.inputChange,
                          onBlur:this.inputChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button onClick={this.onlogin} simple color="primary" size="lg">
                        Login
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

export default withStyles(loginPageStyle)(withRouter(LoginPage));
