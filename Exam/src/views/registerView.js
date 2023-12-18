import { html } from "../../node_modules/lit-html/lit-html.js";
import * as userService from '../services/userService.js';

const registerTemplate = (submitHandler) => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="register-form" @submit=${submitHandler}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="#">Login</a></p>
            </form>
          </div>
        </section>
`;

export const registerView = (ctx) => {

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('re-password');

        if (repass !== password) {
            alert('Password missmatch');

            return;
        }

        if (email != '' && password != '') {
            userService.register(email, password)
            .then(() => {
                ctx.page.redirect('/');
            })
            .catch(err => {
                alert(err);
            })
        } else{
            alert('Make sure fields are filled');
        }
    }

    ctx.render(registerTemplate(submitHandler))
}