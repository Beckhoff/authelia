import React, { ReactNode } from "react";

import { Grid, makeStyles, Container, Typography, Link } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import { ReactComponent as UserSvg } from "../assets/images/user.svg";

export interface Props {
    id?: string;
    children?: ReactNode;
    title?: string;
    showBrand?: boolean;
}

const LoginLayout = function (props: Props) {
    const style = useStyles();
    return (
        <Grid id={props.id} className={style.root} container spacing={0} alignItems="center" justify="center">
            <Container maxWidth="xs" className={style.rootContainer}>
                <Grid container>
                    <Grid item xs={12}>
                        <UserSvg className={style.icon}></UserSvg>
                    </Grid>
                    {props.title ? (
                        <Grid item xs={12}>
                            <Typography variant="h5" className={style.title}>
                                {props.title}
                            </Typography>
                        </Grid>
                    ) : null}
                    <Grid item xs={12} className={style.body}>
                        {props.children}
                    </Grid>
                    {props.showBrand ? (
                        <Grid item xs={12}>
                            <Link
                                href="https://github.com/authelia/authelia"
                                target="_blank"
                                className={style.poweredBy}
                            >
                                Powered by Authelia
                            </Link>
                        </Grid>
                    ) : null}
                </Grid>
            </Container>
            <div
                style={{
                    background: "linear-gradient(to right bottom, rgba(169,186,194,1), rgba(255,255,255,0) 50%)",
                    position: "fixed",
                    top: "0px",
                    left: "0px",
                    height: "400px",
                    width: "400px",
                }}
            ></div>
            <div
                style={{
                    background: "linear-gradient(to left top, rgba(169,186,194,1), rgba(255,255,255,0) 50%)",
                    position: "fixed",
                    bottom: "0px",
                    right: "0px",
                    height: "400px",
                    width: "400px",
                }}
            ></div>
        </Grid>
    );
};

export default LoginLayout;

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "90vh",
        textAlign: "center",
    },
    rootContainer: {
        paddingLeft: 32,
        paddingRight: 32,
    },
    title: {},
    icon: {
        margin: theme.spacing(),
        width: "380px",
        height: "120px",
    },
    body: {
        marginTop: theme.spacing(),
        paddingTop: theme.spacing(),
        paddingBottom: theme.spacing(),
    },
    poweredBy: {
        fontSize: "0.7em",
        color: grey[500],
    },
}));
