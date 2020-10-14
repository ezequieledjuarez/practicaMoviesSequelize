let db = require('../db/models')
const Sequelize = require('sequelize')
let Op = Sequelize.Op;

module.exports = {
    all: (req,res)=>{
        db.Peliculas.findAll()
        .then(peliculas =>{
            return res.render("movies", {
                peliculas: peliculas,
                title: 'Listado de peliculas'
            })
        })
        .catch(e=>{
            res.send(e)
        })
      
    },
    detail:(req,res)=>{
        db.Peliculas.findByPk(req.params.id)
        .then(pelicula=>{
            res.render("viewDetail",{
                title: 'Pelicula detallada',
                pelicula: pelicula
            })
        })
        .catch(e=>{
            res.send(e)
        })
    },

    viewCreate:(req,res)=>{
      res.render("createMovie", {
        title: 'Crear peliculas'
      })
    },
    create:(req,res)=>{
        db.Peliculas.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.duracion,
            release_date: req.body.release_date
        }),
        res.redirect('/movies')
    },

    viewEdit:(req,res)=>{
        db.Peliculas.findByPk(req.params.id)
        .then(function(pelicula){
            res.render("editMovie",{
                title: '"Editar',
                pelicula: pelicula
            })
        })
        .catch(e=>{
            res.send(e)
        })
    },

    edit:(req,res)=>{
        db.Peliculas.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.duracion,
            release_date: req.body.fechaDeEstreno
            },
            {
            where:{
                id: req.params.id   
            }
        })

        res.redirect('/movies/detail/' + req.params.id)
    },
    delete:(req,res)=>{

       let nullFavorita = db.Actores.update({
            favorite_movie_id: null,
        },
           { where:{
                favorite_movie_id : req.params.id
            }
        })
        .then(
            console.log('valores Nulleados')
        )
        .catch(e => res.send(e))

        let deletePivot = db.actor_movie.destroy({
          where:{
                movie_id : req.params.id
            }
        })
        .then(result => console.log('Eliminada la tabla pivot'))
        .catch(e => res.send(e))

        Promise.all([nullFavorita,deletePivot])
        .then(([nullFavorita, deletePivot])=>{
            db.Peliculas.destroy({
                where:{
                    id: req.params.id
                }
            })
            .then(result=>{
                console.log('Pelicula Eliminada')
                res.redirect('/movies')
            })
            .catch(e => res.send(e))    
        })
    },

    new:(req,res)=>{
        db.Peliculas.findAll({
            limit: 5,
            order:[
                ['release_date',
                'DESC'
            ]

            ]
        })
        .then(peliculas=>{
            res.send(peliculas)
        })
        .catch(e=>{
            res.send(e)
        })
    },

    recommended:(req,res)=>{
        db.Peliculas.findAll({
            where:{
                awards:{
                    [Op.gte]: 8
                }
            }
        })
        .then(peliculas=>{
            res.send(peliculas)
        })
    }
}