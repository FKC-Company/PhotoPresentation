const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_event', {
    event_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    event_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    room_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    folder_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    facility_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    roomplace_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    event_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    event_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    catalog_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    delete_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    valid_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_video: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exipiration_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'm_event',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "event_id" },
        ]
      },
    ]
  });
};
