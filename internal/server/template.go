package server

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"text/template"

	"github.com/valyala/fasthttp"

	"github.com/authelia/authelia/internal/logging"
	"github.com/authelia/authelia/internal/utils"
)

var alphaNumericRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

// ServeTemplatedFile serves a templated version of a specified file,
// this is utilised to pass information between the backend and frontend
// and generate a nonce to support a restrictive CSP while using material-ui.
func ServeTemplatedFile(publicDir, file, base, rememberMe, resetPassword, session, theme, systemUseNotification string) fasthttp.RequestHandler {
	logger := logging.Logger()

	f, err := assets.Open(publicDir + file)
	if err != nil {
		logger.Fatalf("Unable to open %s: %s", file, err)
	}

	b, err := ioutil.ReadAll(f)
	if err != nil {
		logger.Fatalf("Unable to read %s: %s", file, err)
	}

	tmpl, err := template.New("file").Parse(string(b))
	if err != nil {
		logger.Fatalf("Unable to parse %s template: %s", file, err)
	}

	return func(ctx *fasthttp.RequestCtx) {
		nonce := utils.RandomString(32, alphaNumericRunes)

		switch extension := filepath.Ext(file); extension {
		case ".html":
			ctx.SetContentType("text/html; charset=utf-8")
		default:
			ctx.SetContentType("text/plain; charset=utf-8")
		}

		switch {
		case publicDir == swaggerAssets:
			ctx.Response.Header.Add("Content-Security-Policy", fmt.Sprintf("base-uri 'self' ; default-src 'self' ; img-src 'self' https://validator.swagger.io data: ; object-src 'none' ; script-src 'self' 'unsafe-inline' 'nonce-%s' ; style-src 'self' 'nonce-%s'", nonce, nonce))
		case os.Getenv("ENVIRONMENT") == dev:
			ctx.Response.Header.Add("Content-Security-Policy", fmt.Sprintf("default-src 'self' 'unsafe-eval'; object-src 'none'; style-src 'self' 'nonce-%s'", nonce))
		default:
			ctx.Response.Header.Add("Content-Security-Policy", fmt.Sprintf("default-src 'self' ; object-src 'none'; style-src 'self' 'nonce-%s'", nonce))
		}

		err := tmpl.Execute(ctx.Response.BodyWriter(), struct{ Base, CSPNonce, RememberMe, ResetPassword, Session, Theme, SystemUseNotification string }{Base: base, CSPNonce: nonce, RememberMe: rememberMe, ResetPassword: resetPassword, Session: session, Theme: theme, SystemUseNotification: systemUseNotification})
		if err != nil {
			ctx.Error("An error occurred", 503)
			logger.Errorf("Unable to execute template: %v", err)

			return
		}
	}
}
