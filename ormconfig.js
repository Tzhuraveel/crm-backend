// eslint-disable-next-line @typescript-eslint/no-var-requires
const typeorm = require('typeorm');

let config;
try {
  config = require('./src/config/db/type-orm-configuration');
} catch (e) {
  config = require('./dist/config/db/type-orm-configuration');
}
const defaultOptions = config.TypeOrmConfigurations.staticConfig;
const dataSource = new typeorm.DataSource(defaultOptions);

module.exports = [dataSource];
