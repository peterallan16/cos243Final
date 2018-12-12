// Standard Node modules
const Path = require("path");

// Knex
const knex = require("knex")({
    client: "pg",
    connection: {
      host: 'faraday.cse.taylor.edu',
      database: 'christen_jacquottet',
      username: "christen_jacquottet",
      password: "namutezi",
    }
});

// Hapi
const Joi = require("joi"); // Input validation
const Hapi = require("hapi"); // Server

const server = Hapi.server({
    host: "localhost",
    port: 3000,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, "dist")
        }
    }
});

async function init() {
    // Show routes at startup.
    await server.register(require("blipp"));

    // Output logging information.
    await server.register({
        plugin: require("hapi-pino"),
        options: {
            prettyPrint: true
        }
    });

    // Configure static file service.
    await server.register(require("inert"));

    // Configure routes.
  server.route([
    //////////////// Create ////////////////
    {
      method: 'POST',
      path: '/team',
      config: {
        description: 'Create Team',
        validate: {
          payload: {
            name: Joi.string().required(),

          }
        }
      },
      handler: async (request, h) => {
        let team = await Team.query().insert(request.payload);
        return team;
      }
    },
    //////////////// Retrieve ////////////////
    {
      method: 'GET',
      path: '/team',
      config: {
        description: 'Retrieve all teams'
      },
      handler: async (request, h) => {
        return await Team.query();
      }
    },
    {
      method: 'GET',
      path: '/team/{team_id}',
      config: {
        description: 'Retrieve one team',
        validate: {
          params: {
            team_id: Joi.number().integer().min(0)
          }
        }
      },
      handler: async (request, h) => {
        return await Team.query()
          .where('id', request.params.team_id)
      }
    },
    //////////////// Update ////////////////
    {
      method: 'PUT',
      path: '/team/{team_id}',
      config: {
        description: 'Replace a team',
        validate: {
          params: {
            team_id: Joi.number().integer().min(0)
          },
          payload: {
            name: Joi.string().regex(/^Team /).required(),
          }
        }
      },
      handler: async (request, h) => {
        let rowsUpdated = await Team.query()
          .update(request.payload)
          .where('id', request.params.team_id);
        return { updated: rowsUpdated };
      }
    },
    {
      method: 'PATCH',
      path: '/team/{team_id}',
      config: {
        description: 'Update a team',
        validate: {
          params: {
            team_id: Joi.number().integer().min(0)
          },
          payload: {
            name: Joi.string().regex(/^Team /).required(),
          }
        }
      },
      handler: async (request, h) => {
        let rowsUpdated = await Team.query()
          .update(request.payload)
          .where('id', request.params.team_id);
        return { updated: rowsUpdated };
      }
    },
    //////////////// Delete ////////////////
    {
      method: 'DELETE',
      path: '/team/{team_id}',
      config: {
        description: 'Delete a team',
        validate: {
          params: {
            team_id: Joi.number().integer().min(0)
          }
        }
      },
      handler: async (request, h) => {
        let rowsDeleted = await Team.query()
          .delete()
          .where('id', request.params.team_id);
        if (rowsDeleted == 1) {
          return { deleted: rowsDeleted };
        } else  {
          return Boom.notFound(`Query returned ${rowsDeleted} rows`);
        }
      }
    }
  ]);

// Catch promises lacking a .catch.
  process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
  });

// Fire up the server.
  async function init() {
    // Configure plug-ins.
    await server.register(require('blipp'));
    await server.register({
      plugin: require('hapi-pino'),
      options: {
        prettyPrint: true
      }
    });

    // Start the server.
    await server.start();
  }

// Go!
  init();