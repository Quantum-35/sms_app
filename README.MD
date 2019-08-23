## Welcome to indorse Challenge1 Backend.

[![Build Status](https://travis-ci.com/Quantum-35/indorse-challenge1.svg?branch=develop)](https://travis-ci.com/Quantum-35/indorse-challenge1)
[![Coverage Status](https://coveralls.io/repos/github/Quantum-35/indorse-challenge1/badge.svg?branch=develop)](https://coveralls.io/github/Quantum-35/indorse-challenge1?branch=develop)

1. Clone this Repo and `cd` to api.
2. Run `yarn install` to install all required dependencies.
3. Create `.env` file and copy variables from `.env.example`.
    - Make sure you have Sendgrid Account. `Create for free`.
    - Add your sendgrid email as your `SENDERS_EMAIL`.
4. Run `sequelize db:migrate`. Ensure you have sequelize installed or use `npx sequelize-cli db:migrate` to create migrations.
5. Use postman to test the endpoints.
    - signup ```http://localhost:3000/api/auth/signup```.
    - login ```http://localhost:3000/api/auth/login```.
    - Verify account ```http://localhost:3000/api/auth/verify-account```.

NOTE: Once you signup, you will receive a validation email that will open the browser once clicked  and validate the account.
- Check email in your spam folder if you don't receive it.


