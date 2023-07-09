import { DataSourceOptions, DataSource } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    database: 'movieapp-nest',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource