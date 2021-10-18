const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address3: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    cellphone: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    user_type: {
      type: DataTypes.ENUM('Company','Corporation','Association','Organization','Personal','Other'),
      allowNull: true
    },
    user_role: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "'0:Ａdministrator 9:見るだけユーザー\r\n1:写真と写真のコメント更新可能"
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    delete_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    valid_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'm_users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
