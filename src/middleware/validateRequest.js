import Joi from '@hapi/joi';
import _ from 'lodash';
import validations from '../utils/validateUser';
import db from '../sequelize/models';

const { User } = db;

export const validateRequest= validate => (req, res, next) => {
    const data = req.body;
    if(_.has(validations, validate)) {
        const validateSchema = _.get(validations, validate);
        const err = Joi.validate(data, validateSchema, { abortEarly: false });

        if (!err.error) {
            req.body = data;
            next();
        } else {
            const allErrors = [];
            err.error.details.forEach((errors) => {
                const findError = allErrors.filter(error => error === errors.context.label);
                if (findError.length === 0) {
                  allErrors.push(errors.context.label);
                }
              });
            return res.status(400).send({
                message: allErrors,
            });
        }
    }
}

export const validateUsername = (req, res, next) => {
    const { username } = req.body;
    if (username) {
        User.findAll({
            where: {
                username
            }
        })
        .then((data) => {
            if(data.length > 0) {
                return res.status(400).json({
                    status: 400,
                    message: 'User with that username already exist. Please choose another.'
                })
            }
            next();
        });
    }
}

export const validateEmail = (req, res, next) => {
    const { email } = req.body;
    if (email) {
        User.findAll({
            where: {
                email
            }
        })
        .then((data) => {
            if(data.length > 0) {
                return res.status(400).json({
                    status: 400,
                    message: 'User with that email already exist. Please choose another.'
                })
            }
            next();
        });
    }
}