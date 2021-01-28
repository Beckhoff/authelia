export function getEmbeddedVariable(variableName: string) {
    const value = document.body.getAttribute(`data-${variableName}`);
    if (value === null) {
        throw new Error(`No ${variableName} embedded variable detected`);
    }

    return value;
}

export function getRememberMe() {
    return getEmbeddedVariable("rememberme") === "true";
}

export function getResetPassword() {
    return getEmbeddedVariable("resetpassword") === "true";
}

export function getSystemUseNotification() {
    return getEmbeddedVariable("systemusenotification");
}
