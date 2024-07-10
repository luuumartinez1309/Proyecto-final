const Plantas = require('./plantas');
const Tipos = require('./tipos');

const configureAssociations = () => {
    Plantas.belongsTo(Tipos, { foreignKey: 'tipo_id' });
    Tipos.hasMany(Plantas, { foreignKey: 'tipo_id' });
};

module.exports = configureAssociations;