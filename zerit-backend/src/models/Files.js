import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Files = sequelize.define(
    "Files",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Orders",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        printType:{
            type: DataTypes.ENUM("single-sided", "double-sided"),
            allowNull: false
        },
        colorType: {
            type: DataTypes.ENUM("color", "black-white"),
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    {
        tableName: "Files",
        timestamps: true
    }
)

export default Files;