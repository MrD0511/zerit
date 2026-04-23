import Orders from "./Orders.js";
import Files from "./Files.js";

Orders.hasMany(Files, {
    foreignKey: 'orderId',
    onDelete: 'CASCADE'
});

Files.belongsTo(Orders, {
    foreignKey: 'orderId'
})