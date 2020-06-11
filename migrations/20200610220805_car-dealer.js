exports.up = function (knex, promise) {
    return knex.schema.createTable('cars', function (table) {
        table.increments();
        table.string('vin').notNullable();
        table.string('make').notNullable();
        table.string('model').notNullable();
        table.integer('mileage').notNullable();
        table.string('titleStatus');
        table.string('transmission');
        // table.timestamp('createdAt').defaultTo(knex.fn.now());
        // table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })

};

exports.down = function (knex) {
    return knex.schema.dropTable('cars');
};