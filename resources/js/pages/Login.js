import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ReeValidate from "ree-validate";
import classNames from "classnames";
import AuthService from "../services";
import cr1 from "../assets/carousalImage1.png";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Checkbox } from 'antd';
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
    },
];
class Login extends Component {
    constructor() {
        super();

        this.validator = new ReeValidate({
            email: "required|email",
            password: "required|min:6",
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
            email: "",
            password: "",
            errors: {},
            remember:false,
            response: {
                error: false,
                message: "",
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

        // Avoid validation until input has a value.
        if (value === "") {
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
        const { email, password ,remember } = this.state;
        const credentials = {
            email,
            password,
            remember
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
            errors.join(" ");
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
            autoPlay: !this.state.autoPlay,
        });
    }

    toggleIndicators() {
        this.setState({
            indicators: !this.state.indicators,
        });
    }

    toggleNavButtonsAlwaysVisible() {
        this.setState({
            navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible,
        });
    }

    toggleNavButtonsAlwaysInvisible() {
        this.setState({
            navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible,
        });
    }

    toggleCycleNavigation() {
        this.setState({
            cycleNavigation: !this.state.cycleNavigation,
        });
    }

    changeAnimation(event) {
        this.setState({
            animation: event.target.value,
        });
    }

    changeTimeout(event, value) {
        this.setState({
            timeout: value,
        });
    }
    render() {
        // If user is already authenticated we redirect to entry location.
        const { from } = this.props.location.state || {
            from: { pathname: "/" },
        };
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to={from} />;
        }
        const flickityOptions = {
            initialIndex: 2,
        };
        const { response, errors, loading } = this.state;

        return (
            <div>
                <div className="d-flex flex-column flex-md-row align-items-md-center py-container">
                    <div className="container">
                        <div className="row" style={{ marginTop: "30px" }}>
                            <div className="section-login col-lg-6">
                                <div className="card-login  mb-3">
                                    <div>
                                        <img
                                            src="logo.png"
                                            alt="logo"
                                            className={"py-5"}
                                        />
                                    </div>
                                    <div className={"card-body-header"}>
                                        <h5>Log in</h5>
                                        <p className={"title"}>
                                            Welcome to the Urban Optics. Please
                                            put your login credentials below to
                                            start using the app.
                                        </p>
                                    </div>
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
                                                <div
                                                    className="alert alert-danger"
                                                    role="alert"
                                                >
                                                    Credentials were incorrect.
                                                    Try again!
                                                </div>
                                            )}

                                            <div className="form-group row">
                                                <div
                                                    className={"col-lg-4 pd-0"}
                                                >
                                                    <p
                                                        className={"title"}
                                                        htmlFor="email"
                                                    >
                                                        {" "}
                                                        Email
                                                    </p>
                                                </div>
                                                <div
                                                    className={"col-lg-8 pd-0"}
                                                >
                                                    {" "}
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        className={classNames(
                                                            "form-control",
                                                            {
                                                                "is-invalid":
                                                                    "email" in
                                                                    errors,
                                                            }
                                                        )}
                                                        placeholder="Enter email"
                                                        required
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        onBlur={this.handleBlur}
                                                        disabled={loading}
                                                    />
                                                    {"email" in errors && (
                                                        <div className="invalid-feedback">
                                                            {errors.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="form-group row borderlastindex">
                                                <div
                                                    className={"col-lg-4 pd-0"}
                                                >
                                                    <p
                                                        className={"title"}
                                                        htmlFor="password"
                                                    >
                                                        {" "}
                                                        Password
                                                    </p>
                                                </div>
                                                <div
                                                    className={"col-lg-8 pd-0"}
                                                >
                                                    {" "}
                                                    <input
                                                        id="password"
                                                        type="password"
                                                        className={classNames(
                                                            "form-control",
                                                            {
                                                                "is-invalid":
                                                                    "password" in
                                                                    errors,
                                                            }
                                                        )}
                                                        name="password"
                                                        placeholder="Enter password"
                                                        required
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        onBlur={this.handleBlur}
                                                        disabled={loading}
                                                    />
                                                    {"password" in errors && (
                                                        <div className="invalid-feedback">
                                                            {errors.password}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="form-group ending-text">
                                                    <div
                                                        style={{
                                                            padding:
                                                                "11px 0px 0px 0px ",
                                                        }}
                                                    >
                                                        <Link
                                                            to="/forgot-password"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                                color: "#ccc",
                                                            }}
                                                        >
                                                            Forgot Password?
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="login-invite-text ending-text">
                                            <div>
                                            <Checkbox 
                                            onChange={()=>{this.setState({remember:!this.state.remember})}} 
                                            checked={this.state.remember}>Remember me</Checkbox>
                                            </div>
                                            <div>
                                            <button
                                                    type="submit"
                                                    className={classNames(
                                                        "btn btn-primary",
                                                        {
                                                            "btn-loading":
                                                                loading,
                                                        }
                                                    )}
                                                >
                                                    Login
                                                </button>
                                            </div>
                                                
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="password-reset-link text-center"></div>
                            </div>
                            <div
                                className="section-about col-lg-6 mb-4 mb-lg-0 carousal-body"
                                style={{ padding: 0 }}
                            >
                                <Swiper
                                    cssMode={true}
                                    navigation={true}
                                    pagination={true}
                                    mousewheel={true}
                                    keyboard={true}
                                    modules={[
                                        Navigation,
                                        Pagination,
                                        Mousewheel,
                                        Keyboard,
                                    ]}
                                    className="mySwiper"
                                >
                                    {items.map((item, index) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <div
                                                    style={{
                                                        width: "50em",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                        display: "grid",
                                                    }}
                                                >
                                                    <img
                                                        src={item.Image}
                                                        style={{
                                                            alignSelf: "center",
                                                        }}
                                                    ></img>
                                                    <div>{item.Name}</div>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Login);
