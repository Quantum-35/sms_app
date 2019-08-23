import chaiHttp from 'chai-http';
import chai from 'chai';
import dotenv from 'dotenv';

import server from '../src/index';
import db from '../src/sequelize/models';
import userData from './helpers/testData';

const { User } = db;
const { expect } = chai;
const { userCredentials, fakeToken } = userData;
chai.use(chaiHttp);

dotenv.config();

describe('user Authentication', () => {
    after(async () => {
        await User.destroy({
          where: {
            email: 'testmail5@gmail.com'
          }
        });
      });

    it('should signup  new user successfully', (done) => {
        chai.request(server)
            .post('/api/auth/signup')
            .send(userCredentials)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).deep.equal('Email sent successfully')
                done();
            });
    });

    it('should fail to signup  new user with invalid credentials', (done) => {
        chai.request(server)
            .post('/api/auth/signup')
            .send({})
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.message).to.be.an('array')
                done();
            });
    });

    it('should fail to login with invalid credentials', (done) => {
        chai.request(server)
            .post('/api/auth/login')
            .send({})
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.message).deep.equal('Invalid username or Password!')
                done();
            });
    });

    it('should fail to login with invalid credentials', (done) => {
        chai.request(server)
            .post('/api/auth/login')
            .send({
                username: "John",
                password: "HardPassword"
            })
            .end((err, res) => {
                expect(res.status).to.equal(400);
                expect(res.body.message).deep.equal('Invalid username or Password!!!')
                done();
            });
    });

    it('should fail to login with unverified email', (done) => {
        chai.request(server)
            .post('/api/auth/login')
            .send({
                username: "test2",
                password: "HardPassword"
            })
            .end((err, res) => {
                expect(res.status).to.equal(403);
                expect(res.body.message).deep.equal('Your Account is not verified. Please check your email.')
                done();
            });
    });

    it('should login with correct credentials', (done) => {
        chai.request(server)
            .post('/api/auth/login')
            .send({
                username: "testUser",
                password: "HardPassword"
            })
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.message).deep.equal('Logged in successfully')
                done();
            });
    });

    it('should throw an error if validation token expires', (done) => {
        chai.request(server)
            .get(`/api/auth/verify-account?token=${fakeToken}`)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res.body.message).deep.equal('Invalid or Expired token')
                done();
            });
    });
});