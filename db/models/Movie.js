//Un modelo es una función que debe exportarse

module.exports = (sequelize,dataTypes) => {

    let alias  = "Peliculas"

    let cols = {
        id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey :true
        },
        title : {
            type : dataTypes.STRING(500),
            allowNull : false
        },
        rating : {
            type : dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull : false
        },
        awards : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false,
            defaultValue: 0
        },
        release_date : {
            type : dataTypes.DATE,
            allowNull : false
        },
        length : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            defaultValue: null
        },
        genre_id : {
            type : dataTypes.INTEGER(10).UNSIGNED,
            defaultValue: null
        }
    }

    let config = {
        tableName: "movies", //nombre de la tabla
        timestamps: true,
        underscored: true
    }


    const Movie = sequelize.define(alias,cols,config)

//Despues de definir el modelo, colocamos las asociaciones
    Movie.associate = function(models){
        Movie.belongsTo(models.Generos, {
            as: "genero",
            foreignKey: "genre_id"
        }),
        Movie.belongsToMany(models.Actores,{
            as:"actores",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps:false
        })
    }
   return Movie

}