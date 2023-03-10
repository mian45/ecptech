import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import ReeValidate from 'ree-validate';
import classNames from 'classnames';
import AuthService from '../services';
import cr1 from "../assets/carousalImage1.png";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
const items = [
  {
      Name: "slide 1",
      Image: cr1,
      contentPosition: "left",
  },
  {
      Name: "slide 2",
      Image: cr1,
      contentPosition: "left",
     
  },
  {
      Name: "slide 3",
      Image: cr1,
      contentPosition: "right",
  }
];
class ForgotPassword extends Component {
  constructor() {
    super();

    this.validator = new ReeValidate({
      email: 'required|email',
    });

    this.state = {
      loading: false,
      email: '',
      errors: {},
      response: {
        error: false,
        message: '',
      },
    };
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
    const validation = this.validator.errors;

    // Avoid validation until input has a value.
    if (value === '') {
      return;
    }

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
    const credentials = {
      email: this.state.email,
    };

    // Set response state back to default.
    this.setState({ response: { error: false, message: '' } });

    this.validator.validateAll(credentials).then((success) => {
      if (success) {
        this.setState({ loading: true });
        this.submit(credentials);
      }
    });
  };

  submit(credentials) {
    this.props
      .dispatch(AuthService.resetPassword(credentials))
      .then((res) => {
        this.forgotPasswordForm.reset();
        const response = {
          error: false,
          message: res.message,
        };
        this.setState({ loading: false, success: true, response });
      })
      .catch((err) => {
        this.forgotPasswordForm.reset();
        const errors = Object.values(err.errors);
        errors.join(' ');
        const response = {
          error: true,
          message: errors,
        };
        this.setState({ response });
        this.setState({ loading: false });
      });
  }

  render() {
    // If user is already authenticated we redirect to entry location.
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    const { response, errors, loading } = this.state;
      return  <div>
          <div className="d-flex flex-column flex-md-row align-items-lg-center py-container" >
              <div className="container ">

                  <div className="row" style={{marginTop:"30px"}}>
                      <div className="section-login col-lg-6">

                          <div className="card-login  mb-3">
                              <div>
                                  <img src='logo.png' alt='logo' className={"py-5"}/>
                              </div>
                              <div className={"card-body-header"}><h5>Password Recovery</h5>
                                  <p className={"title"}>Please fill in the email you've used to create a Urban Optics account and we'll send you a reset link.</p></div>
                              <div className="card-body">

                                  <form
                                      className="form-horizontal"
                                      method="POST"
                                      onSubmit={this.handleSubmit}
                                      ref={(el) => {
                                          this.forgotPasswordForm = el;
                                      }}
                                  >

                                      <div className="form-group row borderlastindex">
                                          <div className={"col-lg-4 pd-0"}>
                                              <p className={"title"} htmlFor="email"> Email</p>
                                          </div>
                                          <div className={"col-lg-8 pd-0"}>
                                                                 <div className="form-group">
                                                                    <input
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
                                                                      <div className="invalid-feedback">
                                                                        {errors.email}
                                                                      </div>
                                                                    )}

                                          </div>
                                      </div>

                                      </div>



                                      <div className="login-invite-text ending-text">

                                          <button
                                              type="submit"
                                              className={classNames("btn btn-primary",{
                                                  'btn-loading': loading,

                                              })}
                                          >
                                              Reset My Password
                                          </button>
                                      </div>
                                      <div className="form-group text-center py-5 ending-text" >
                                          <Link to="/" style={{textDecoration:"none",color:"#ccc"}}>Back to Login</Link>
                                      </div>
                                  </form>
                              </div>
                          </div>

                          <div className="password-reset-link text-center">

                          </div>
                      </div>
                      <div className="section-about col-lg-6 mb-4 mb-lg-0 carousal-body" style={{padding:0}}>
                      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {items.map((item, index) => {
                                        return (
                                            <SwiperSlide>
                                            <div style={{width:"50em",justifyContent:"center",alignItems:"center",display:"grid"}}>
                                                <img src={item.Image} style={{alignSelf:"center"}}></img>
                                                <div>{item.Name}</div>
                                            </div></SwiperSlide>
                                        );
                                    })}
        
      </Swiper>
                      </div>
                  </div>
              </div>
          </div>
      </div>
   }
}

ForgotPassword.defaultProps = {
  location: {
    state: {
      pathname: '/',
    },
  },
};

ForgotPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    state: {
      pathname: PropTypes.string,
    },
  }),
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(ForgotPassword);
