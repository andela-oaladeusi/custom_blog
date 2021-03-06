import _ from 'lodash';
import validator from 'validator';
import GraphQLCustomError from '../utils/GraphQLCustomError';

const Helper = {
  orderedFor(rows, collection, field, singleObject) {
    const data = rows;
    const inGroupOfField = _.groupBy(data, field);
    return collection.map((element) => {
      const elementArray = inGroupOfField[element];
      if (elementArray) {
        return singleObject ? elementArray[0] : elementArray;
      }
      return singleObject ? {} : [];
    });
  },

  validateInputs(userInput, requiredFieldsArray = []) {
    const errors = [];
    for (let i = 0; i < requiredFieldsArray.length; i += 1) {
      if (!Object.keys(userInput).includes(requiredFieldsArray[i])) {
        errors.push({
          key: requiredFieldsArray[i],
          message: `${requiredFieldsArray[i]} field is required`
        });
      }
    }
    if (userInput.email && !validator.isEmail(userInput.email)) {
      errors.push({ key: 'email', message: 'Invalid email address' });
    }
    if (userInput.password && validator.isEmpty(userInput.password)) {
      errors.push({
        key: 'password',
        message: 'Password field cannot be empty'
      });
    }
    if (userInput.userName && validator.isEmpty(userInput.userName)) {
      errors.push({
        key: 'userName',
        message: 'userName field cannot be empty'
      });
    }
    if (userInput.limit && !validator.isInt(userInput.limit)) {
      errors.push({
        key: 'Limit',
        message: 'Invalid Limit'
      });
    }
    if (userInput.offset && !validator.isInt(userInput.offset)) {
      errors.push({
        key: 'Offsite',
        message: 'Invalid Offset'
      });
    }
    if (userInput.userId && !validator.isUUID(userInput.userId)) {
      errors.push({
        key: 'userId',
        message: 'Invalid userId'
      });
    }
    if (userInput.blogId && !validator.isUUID(userInput.blogId)) {
      errors.push({
        key: 'blogId',
        message: 'Invalid blogId'
      });
    }
    if (errors.length) throw new GraphQLCustomError(errors);
  },

  checkUserPermission() {
    return 'User';
  },

  Pagination(payload) {
    return payload;
  }
};

export default Helper;
