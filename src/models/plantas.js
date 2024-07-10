const { DataTypes } = require('sequelize'); 
const sequelize = require('../../db/sequelize');

const Plantas = sequelize.define('Plantas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_reproduccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ambiente_crecimiento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    frutos: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    flores: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    tipo_iluminacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Tipos', // Este nombre debe coincidir con el nombre de la tabla
            key: 'id'
        }
    }
}, {
    freezeTableName: true,
});

module.exports = Plantas;
