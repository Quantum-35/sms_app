import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import db from '../../sequelize/models';
import EmailService from '../../utils/Email';

const { User } = db;
const { sendValidationEmail } = EmailService;

class AuthController {
    static async signup(req, res) {
        const {body: {
            firstName, lastName, email, password, username,
            bio, gender,phoneNumber
        }} = req;

        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: 400,
                error: "Invalid input" 
            })
        }
        const newUser = await User.create({
            firstName,
            lastName, email, verified:false,
            password: bcrypt.hashSync(password, 8),
            username,
            bio, gender,
            phone:phoneNumber

        });
        if(newUser) {
            try {
                const token = jwt.sign({username}, process.env.SECRET_KEY, {expiresIn: '2h'});
                const client = {
                    firstName, lastName, email, username, token
                }
                await sendValidationEmail(client);
                return res.status(200).json({
                    status: 200,
                    message: "Email sent successfully"
                })
                
            } catch (error) {
                return res.status(400).json({
                    status: 400,
                    message: "Email not sent."
                })
            }
            
        }

        return res.status(400).json({
            status: 400,
            message: "Sign up not successful, please check your input"
        })
    }

    static async login(req, res) {
        const { body: { username, password } } = req;
        try {
            await User.findAll({
                where: {
                    username: username
                }
            }).then((data) => {
                if(data.length > 0) {
                    const queryPassword = data[0].dataValues.password;
                    if(!data[0].dataValues.verified) {
                        return res.status(403).json({
                            status: 200,
                            message: "Your Account is not verified. Please check your email."
                        }); 
                    }else if (bcrypt.compareSync(password, queryPassword)) {
                        const {id, username, email} = data[0].dataValues;
                        const token = jwt.sign({username,id, email}, process.env.SECRET_KEY, {expiresIn: '8h'});
                        return res.status(200).json({
                            status: 200,
                            message: "Logged in successfully",
                            token: token
                        });
                    }
                    return res.status(400).json({
                        status: 400,
                        message: "Invalid username or Password!!!"
                    });
                }
                return res.status(400).json({
                    status: 400,
                    message: "Invalid username or Password!!"
                });
            })
        } catch (error) {
            return res.status(400).json({
                    status: 400,
                    message: "Invalid username or Password!"
                });
        }
    }

    static async verifyAccount(req, res) {
        const { token } = req.query;
        let user;
        try {
            user = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            return res.status(401).json({
                status: 401,
                message: "Invalid or Expired token"
            })
        }
        if (user) {
            try {
                await User.update(
                    { verified: true },
                    { where: { username: user.username }},
                    );
                return res.status(202).json({
                    status: 202,
                    message: "Account verified."
                })
            } catch (error) {
                return res.status(406).json({
                    status: 406,
                    message: "Could not verify the Account."
                })
            }
        }
        return res.status(401).json({
            status: 401,
            message: "Invalid or Expired token"
        })
    }

    static async deleteContact(req, res) {
        try {
          const { id } = req.params;
          const deletedContact = await User.destroy({ returning: true, where: { id }})
          if (!deletedContact) return res.status(404).json({
            error: 'Contact not found!'
          });
          return res.status(200).json({
            message: 'Contact delete successfully!',
            deletedContact
          });
        } catch (error) {
          return res.status(500).json({
            error: 'An error occurred when trying to delete the contact!'
          });
        }
      }
}

export default AuthController;