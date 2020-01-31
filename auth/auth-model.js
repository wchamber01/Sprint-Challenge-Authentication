const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findByUser,
  findById,
  remove
};

function find() {
  return db("users").select("id", "username", "department");
}

function findBy(filter) {
  return db("users").where("users.department", filter);
  // .select("id", "username", "department");
}

function findByUser(filter) {
  return db("users").where("users.userName", filter);
  // .select("id", "username", "department");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function remove(id) {
  return db("users")
    .where("id", id)
    .del();
}
