var DataTypes = require("sequelize").DataTypes;
var _m_event = require("./m_event");
var _m_set = require("./m_set");
var _m_users = require("./m_users");

function initModels(sequelize) {
  var m_event = _m_event(sequelize, DataTypes);
  var m_set = _m_set(sequelize, DataTypes);
  var m_users = _m_users(sequelize, DataTypes);

  return {
    m_event,
    m_set,
    m_users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
