const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

export default {
    userCredentials: {
        "firstName": "test",
        "lastName": "mrTest",
        "email": "testmail5@gmail.com",
        "password": "HelloWorldKenya1",
        "confirmPassword": "HelloWorldKenya1",
        "username": "testUser5"
    },
    generateToken: function() {
        return jwt.sign(userCredentials.username, process.env.SECRET_KEY)
    },
    fakeToken: "eyJhbGciOiJIUzI1NiIsInR5icCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdpbGJlcnRvU2lsdmVyIiwiZW1haWwiOiJnaWxiZXJ0Lm5nZXl3byswN0BhbmRlbGEuY29tIiwiaWF0IjoxNTYwNjc2MzAzLCJleHAiOjE1NjA3MDUxMDN9.3xx8xBvVpcCRWJilN2hlZ0luauAelhK_vKTF6jq0QME"
}