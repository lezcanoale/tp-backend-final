import app from './app.js';
import { sequelize } from './database/database.js';
import * as models from './models/index.js';

async function main() {
    try {
        await sequelize.sync({ force: false });
        console.log('Connection has been established successfully.');

        // Asociar todos los modelos
        Object.values(models).forEach((model) => {
            if (model.associate) {
                model.associate(models);
            }
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

main();
