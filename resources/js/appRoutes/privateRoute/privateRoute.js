import React, { useRef, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import { LOGIN_ROUTE } from "../routeConstants";
import { useIdleTimer } from 'react-idle-timer';
import AuthService from "../../services";
const PrivateRoute = ({ component, exact, path, isAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const timeout = 1800000000;
  const [remaining, setRemaining] = useState(timeout);
  const [elapsed, setElapsed] = useState(0);
  const [lastActive, setLastActive] = useState(+new Date());
  const [isIdle, setIsIdle] = useState(false);

  const handleOnActive = () => setIsIdle(false);
  const handleOnIdle = () => {
    dispatch(AuthService.logout())
    setIsIdle(true)
  };

  const {
    reset,
    pause,
    resume,
    getRemainingTime,
    getLastActiveTime,
    getElapsedTime
  } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle
  });

  const handleReset = () => reset();
  const handlePause = () => pause();
  const handleResume = () => resume();

  useEffect(() => {
    setRemaining(getRemainingTime());
    setLastActive(getLastActiveTime());
    setElapsed(getElapsedTime());

    setInterval(() => {

      setRemaining(getRemainingTime());
      setLastActive(getLastActiveTime());
      setElapsed(getElapsedTime());
    }, 1000);
  }, []);
  return (
    <React.Fragment>
      {isAuthenticated ? (
        <Route exact={exact} path={path} component={component} />
      ) : (
        <Redirect to={LOGIN_ROUTE} />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
