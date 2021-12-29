import { DataTypes, Model } from "sequelize";
import { sequelize } from "../services/DbConnectionService";

export class UserDetails extends Model{
    username: string;
    pwHash: string;
    lastLogin: Date;
    clockedIn: boolean;
}

UserDetails.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pwHash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    clockedIn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, { 
    sequelize,
    modelName: 'UserDetails',
});