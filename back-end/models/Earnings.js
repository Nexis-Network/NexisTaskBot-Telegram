const {
    sequelize,
    DataTypes,
    Sequelize,
} = require("../config/mysql-sequelize");

const Earnings = sequelize.define(
    "Earnings", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        teleid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tap_points: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        ref_points: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        checkin_points: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        miner_points: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        game_deducted_points: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        game_played_time: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        game_level: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        createdate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        modifiydate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    }, {
        tableName: "earnings",
        timestamps: false,
        indexes: [{
            fields: ['teleid'],
        }, ],
        hooks: {
            beforeUpdate: (earnings, options) => {
                earnings.modifiydate = new Date();
            },
        },
    }
);

module.exports = Earnings;