const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

class UserService {
  constructor() {
    this.pool = pool;
  }

  async create(data) {
    return data;
  }

  async find() {
    try {
      const query = 'SELECT * FROM tasks';
      const rta = await pool.query(query);
      return rta.rows;
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
