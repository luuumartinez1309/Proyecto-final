const { DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');

const Tipos = sequelize.define('Tipos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dominio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    reino:{
        type: DataTypes.STRING,
        allowNull: false
    },
    division: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clase: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orden: {
        type: DataTypes.STRING,
        allowNull: false
    },
    familia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ciclo_vida: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adaptacion_ambiente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    origen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado_conservacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },


}, {
    freezeTableName: true,
});

module.exports = Tipos;
