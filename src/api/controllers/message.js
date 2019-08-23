import jwt from 'jsonwebtoken';

import db from '../../sequelize/models';

const { Message } = db;

class MessageController {
    static async getAllSmsSentByContact(req, res) {
        const { id } = req.params;
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if(err) {
                    return res.status(400).send({
                        success: false,
                        message: 'Invalid token'
                    })
                } else {
                    req.decoded = decoded;
                    await Message.findAll({
                        where: {
                            senderId: decoded.id
                        }
                    }).then(data => {
                        if(data.length > 0) {
                            console.log(data[0].dataValues);
                            return res.status(200).json({
                                success: true,
                                messages: data
                            })
                        }
                        return res.status(400).json({
                            success: false,
                            message: 'No messages at the moment'
                        })
                    })
                }
            });
        }
    }

    static async getAllSmsSentToContact(req, res) {
        const { id } = req.params;
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if(err) {
                    return res.status(400).send({
                        success: false,
                        message: 'Invalid token'
                    })
                } else {
                    req.decoded = decoded;
                    await Message.findAll({
                        where: {
                            receiverId: decoded.id
                        }
                    }).then(data => {
                        if(data.length > 0) {
                            console.log(data)
                            return res.status(200).json({
                                success: true,
                                messages: data
                            })
                        }
                        return res.status(400).json({
                            success: false,
                            message: 'No messages at the moment'
                        })
                    })
                }
            });
        }
    }

    static async sendSMStoContacts(req, res) {
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

        const { messageBody, receiverId } = req.body;

        if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if(err) {
                    return res.status(400).send({
                        success: false,
                        message: 'Invalid token'
                    })
                } else {
                    req.decoded = decoded;
                    const newMessage = await Message.create({
                        message: messageBody,
                        receiverId,
                        senderId: decoded.id,
                    });
                    if(newMessage) {
                        return res.status(201).json({
                            success: true,
                            message: 'Message created successfully'
                        })
                    }
                    return res.status(400).json({
                        success: false,
                        message: 'An error occurred while creating the massage'
                    })
                }
            });
        }
    }
    
}

export default MessageController;