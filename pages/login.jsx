import React, { Component } from "react";
import OwnHeader from "../components/Header.jsx";
import Link from "next/link";
import Request from "../components/utils/request";
import { hash } from "../components/utils/utils";
import { Grid, Image, Button, Form, Input, Message } from "semantic-ui-react";
import BlockchainWrapper from "../components/utils/BlockchainWrapper";

const request = new Request();

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
        this.state = { msgtext: "" };
    }

    handleLogin = async () => {
        let user = {
            password: hash(this.state.pw),
            username: this.state.username
        };
        let res = await request.callLogin(user);

        if (res.data.type === "success") {
            window.location.replace("/");
        } else {
            this.setState({ msgtext: res.data.message });
            this.setState({ visible: true });
        }
    };

    render() {
        return (
            <div>
                <OwnHeader />
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5} />
                        <Grid.Column width={6}>
                            <Form className="-loginform">
                                <Image src="/static/golddiggertext.png" alt="Avatar" className="ui centered grid -avatar" />

                                <Message error visible={this.state.visible}>
                                    <Message.Header>Login fehlgeschlagen!</Message.Header>
                                    <p>{this.state.msgtext}</p>
                                </Message>

                                <Form.Field className="-login-field">
                                    <label className="-login-label">E-Mail-Adresse</label>
                                    <Input
                                        type="text"
                                        onChange={(e) => this.setState({ username: e.target.value })}
                                        name="username"
                                        placeholder="E-Mail"
                                    />
                                </Form.Field>

                                <Form.Field className="-login-field">
                                    <label htmlFor="password" className="-login-label">
                                        Passwort
                                    </label>
                                    <Input
                                        name="password"
                                        onChange={(e) => this.setState({ pw: e.target.value })}
                                        type="password"
                                        placeholder="Passwort"
                                    />
                                </Form.Field>

                                <div className="ui centered grid page grid -login-btn-form">
                                    <Button className="-login-btn" onClick={this.handleLogin}>
                                        Login
                                    </Button>
                                    <span className="-psw">
                                        <a href="#">Passwort vergessen?</a>
                                    </span>
                                    <span className="-reg-span">
                                        <Link prefetch href="/register">
                                            <a>Noch nicht registriert? Jetzt registrieren</a>
                                        </Link>
                                    </span>
                                </div>
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={5} />
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Login;
