import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ReeValidate from 'ree-validate';
import classNames from 'classnames';
import AuthService from '../services';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button
} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import autoBind from "auto-bind";
import "../../sass/carousal.scss";
function Banner(props) {
    if (props.newProp) console.log(props.newProp);
    const contentPosition = props.contentPosition
        ? props.contentPosition
        : "left";
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems - 1;

    let items = [];
    const content = (
        <Grid item xs={12 / totalItems} key="content">
            <CardContent className="Content">
                <Typography className="Title">{props.item.Name}</Typography>

                <Typography className="Caption">{props.item.Caption}</Typography>

                <Button variant="outlined" className="ViewButton">
                    View Now
                </Button>
            </CardContent>
        </Grid>
    );

    for (let i = 0; i < mediaLength; i++) {
        const item = props.item.Items[i];

        const media = (
            <Grid item xs={12 / totalItems} key={item.Name}>
                <CardMedia className="Media" image={item.Image} title={item.Name}>
                    <Typography className="MediaCaption">{item.Name}</Typography>
                </CardMedia>
            </Grid>
        );

        items.push(media);
    }

    if (contentPosition === "left") {
        items.unshift(content);
    } else if (contentPosition === "right") {
        items.push(content);
    } else if (contentPosition === "middle") {
        items.splice(items.length / 2, 0, content);
    }

    return (
        <Card raised className="Banner">
            <Grid container spacing={0} className="BannerGrid">
                {items}
            </Grid>
        </Card>
    );
}
const items = [
    {
        Name: "Pizza begin",
        Image: "https://source.unsplash.com/featured/?macbook",
        contentPosition: "left",
        Items: [
            {
                Name: "Macbook Pro",
                Image: "https://source.unsplash.com/featured/?macbook"
            },
            {
                Name: "iPhone",
                Image: "https://source.unsplash.com/featured/?iphone"
            }
        ]
    },
    {
        Name: "Home Appliances",
        Caption: "Say no to manual home labour!",
        contentPosition: "middle",
        Items: [
            {
                Name: "Washing Machine WX9102",
                Image: "https://source.unsplash.com/featured/?washingmachine"
            },
            {
                Name: "Learus Vacuum Cleaner",
                Image: "https://source.unsplash.com/featured/?vacuum,cleaner"
            }
        ]
    },
    {
        Name: "Decoratives",
        Caption: "Give style and color to your living room!",
        contentPosition: "right",
        Items: [
            {
                Name: "Living Room Lamp",
                Image: "https://source.unsplash.com/featured/?lamp"
            },
            {
                Name: "Floral Vase",
                Image: "https://source.unsplash.com/featured/?vase"
            }
        ]
    }
];
class Home extends Component {
  constructor() {
    super();

    this.validator = new ReeValidate({
      email: 'required|email',
      password: 'required|min:6',
    });

    this.state = {
        autoPlay: true,
        animation: "fade",
        indicators: true,
        timeout: 500,
        navButtonsAlwaysVisible: false,
        navButtonsAlwaysInvisible: false,
        cycleNavigation: true,
      loading: false,
      email: '',
      password: '',
      errors: {},

      response: {
        error: false,
        message: '',
      },
    };
      autoBind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    // If a field has a validation error, we'll clear it when corrected.
    const { errors } = this.state;
    if (name in errors) {
      const validation = this.validator.errors;
      this.validator.validate(name, value).then(() => {
        if (!validation.has(name)) {
          delete errors[name];
          this.setState({ errors });
        }
      });
    }
  };

  handleBlur = (e) => {
    const { name, value } = e.target;

    // Avoid validation until input has a value.
    if (value === '') {
      return;
    }

    const validation = this.validator.errors;
    this.validator.validate(name, value).then(() => {
      if (validation.has(name)) {
        const { errors } = this.state;
        errors[name] = validation.first(name);
        this.setState({ errors });
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const credentials = {
      email,
      password,
    };

    this.validator.validateAll(credentials).then((success) => {
      if (success) {
        this.setState({ loading: true });
        this.submit(credentials);
      }
    });
  };

  submit = (credentials) => {
    this.props.dispatch(AuthService.login(credentials)).catch((err) => {
      this.loginForm.reset();
      const errors = Object.values(err.errors);
      errors.join(' ');
      const response = {
        error: true,
        message: errors,
      };
      this.setState({ response });
      this.setState({ loading: false });
    });
  };
    toggleAutoPlay() {
        this.setState({
            autoPlay: !this.state.autoPlay
        });
    }

    toggleIndicators() {
        this.setState({
            indicators: !this.state.indicators
        });
    }

    toggleNavButtonsAlwaysVisible() {
        this.setState({
            navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible
        });
    }

    toggleNavButtonsAlwaysInvisible() {
        this.setState({
            navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible
        });
    }

    toggleCycleNavigation() {
        this.setState({
            cycleNavigation: !this.state.cycleNavigation
        });
    }

    changeAnimation(event) {
        this.setState({
            animation: event.target.value
        });
    }

    changeTimeout(event, value) {
        this.setState({
            timeout: value
        });
    }
  render() {
    // If user is already authenticated we redirect to entry location.
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to={from} />;
    }
      const flickityOptions = {
          initialIndex: 2
      }
    const { response, errors, loading } = this.state;

    return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-md-center" style={{overflow:"hidden",position:"fixed"}}>
          <div className="container-fluid">

            <div className="row">
              <div className="section-login col-lg-6">

                <div className="card-login  mb-3">
                    <div>
                        {/*<img src={}*/}
                        {/*    />*/}
                    </div>
                    <div className={"card-body-header"}><h5>Log in</h5>
                        <p className={"title"}>Welcome to the Urban Optics. Please put your login credentials below to start using the app.</p></div>
                    <div className="card-body">

                    <form
                      className="form-horizontal"
                      method="POST"
                      onSubmit={this.handleSubmit}
                      ref={(el) => {
                        this.loginForm = el;
                      }}
                    >
                      {response.error && (
                        <div className="alert alert-danger" role="alert">
                          Credentials were incorrect. Try again!
                        </div>
                      )}

                        <div className="form-group row">
                            <div className={"col-lg-4 pd-0"}>
                                <p className={"title"} htmlFor="email"> Email Address</p>
                            </div>
                            <div className={"col-lg-8 pd-0"}> <input
                                id="email"
                                type="email"
                                name="email"
                                className={classNames('form-control', {
                                    'is-invalid': 'email' in errors,
                                })}
                                placeholder="Enter email"
                                required
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                disabled={loading}
                            />

                                {'email' in errors && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}</div>
                        </div>

                        <div className="form-group row">
                            <div className={"col-lg-4 pd-0"}>
                                <p className={"title"} htmlFor="password"> Password</p>
                            </div>
                            <div className={"col-lg-8 pd-0"}> <input
                                id="password"
                                type="password"
                                className={classNames('form-control', {
                                    'is-invalid': 'password' in errors,
                                })}
                                name="password"
                                placeholder="Enter password"
                                required
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                disabled={loading}
                            />
                                {'password' in errors && (
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                )}</div>
                        </div>


                      <div className="form-group text-center">
                        <button
                          type="submit"
                          className={classNames('btn btn-primary', {
                            'btn-loading': loading,
                          })}
                        >
                          Sign In
                        </button>
                      </div>

                      <div className="login-invite-text text-center">
                        {"Don't have an account?"}
                        {' '}
                        <Link to="/register">Register</Link>
                        .
                      </div>
                    </form>
                  </div>
                </div>

                <div className="password-reset-link text-center">
                  <Link to="/forgot-password">Forgot Your Password?</Link>
                </div>
              </div>
                <div className="section-about col-lg-6 mb-4 mb-lg-0 carousal-body">
                    <Carousel
                        className="Example"
                        autoPlay={this.state.autoPlay}
                        animation={this.state.animation}
                        indicators={this.state.indicators}
                        timeout={this.state.timeout}
                        cycleNavigation={this.state.cycleNavigation}
                        navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
                        navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
                        next={(now, previous) =>
                            console.log(
                                `Next User Callback: Now displaying child${now}. Previously displayed child${previous}`
                            )
                        }
                        prev={(now, previous) =>
                            console.log(
                                `Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`
                            )
                        }
                        onChange={(now, previous) =>
                            console.log(
                                `OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`
                            )
                        }

                    >
                        {items.map((item, index) => {
                            return (
                                <div style={{width:"50em"}}>
                                    sdsdf
                                </div>
                            );
                        })}
                    </Carousel>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
