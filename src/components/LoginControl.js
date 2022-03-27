import React from "react";
import Greeting from "./Greeting";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

class LoginControl extends React.Component
{
    constructor(props)
    {
        super(props);
        // this.handleLoginClick = this.handleLoginClick.bind(this);
        // this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    // Prefer to use experimental public class syntax so commenting out above bindings in constructor.
    handleLoginClick = () =>
    {
        this.setState({isLoggedIn: true});
    }

    // Prefer to use experimental public class syntax so commenting out above bindings in constructor.
    handleLogoutClick = () =>
    {
        this.setState({isLoggedIn: false});
    }

    render()
    {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        button =  isLoggedIn ? <LogoutButton onClick={this.handleLogoutClick} /> : <LoginButton onClick={this.handleLoginClick} />
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

export default LoginControl;
