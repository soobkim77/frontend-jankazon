const LogIn = (props) => {
    return(
        <div className="inner-container">
            <div>
                <div className="header">
                    {props.log ? "Create a User" : "Log-In"}
                </div>
                <form className="box" onSubmit={props.handleLogin}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            value={props.user.username}
                            onChange={props.handleUsernameChange}
                            name="username"
                            className="login-input"
                            placeholder="Username"
                            autoComplete="off"
                            />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            value={props.user.password}
                            onChange={props.handlePasswordChange}
                            name="password"
                            className="login-input"
                            placeholder="Password"
                            autoComplete="off"
                            />
                    </div>

                    <button  type="submit"  value="submit" className="login-btn">{props.log ? "Create a User" : "Log-In"}</button>
                </form>
            </div>
        </div>
    )
}

export default LogIn