
exports.up = function(knex) {
    return knex.schema.createTable("produtos", tabela => {
        tabela.increments ('id');
        tabela.text ("descricao", 255).unique ().notNullable();
        tabela.text ("marca", 128).notNullable();
        tabela.decimal ("valor").notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("produtos");  
};
