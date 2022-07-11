const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {
  }

  async create(data) {
    return data;
  }

  async find() {
    try {
      const rta = await models.User.findAll();
      /*  const query = 'SELECT * FROM tasks';
      const rta = await pool.query(query); */
      return rta;
    } catch (err) {
      console.error(`[TASKS]: Message error: ${err}`);
      console.error(`[TASKS]: Routine error: ${err.routine}`);
    }
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
