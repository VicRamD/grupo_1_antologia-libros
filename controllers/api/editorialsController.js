const db = require('../../database/models');

const controller = {
    list: async (req, res) => {
        const editorials = await db.Editorial.findAll({
            order: [['name', 'ASC']]
        });

        return res.json({
            count: editorials.length,
            //status: 200,
            data: editorials
        });
    },

    create: async (req, res) => {
        try {
            const { name } = req.body;
            const newEditorial = await db.Editorial.create({ name });
            return res.status(201).json({
                status: 201,
                data: newEditorial
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        } 
    },

    // update: async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const { name } = req.body;
    //         const updatedEditorial = await db.Editorial.update({ name }, { where: { id } });
    //         if (updatedEditorial[0] === 0) {
    //             return res.status(404).json({ error: 'Editorial no encontrada' });
    //         }
    //         return res.status(200).json({
    //             status: 200,
    //             data: updatedEditorial
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({ error: 'Error interno del servidor' });
    //     }
    // },

    // delete: async (req, res) => {
    //     try {
    //         const { id } = req.params;
    //         const deletedEditorialCount = await db.Editorial.destroy({ where: { id } });
    //         if (deletedEditorialCount === 0) {
    //             return res.status(404).json({ error: 'Editorial no encontrada' });
    //         }
    //         return res.status(200).json({
    //             status: 200,
    //             message: 'Editorial borrada satisfactioriamente!'
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({ error: 'Error interno del servidor' });
    //     }
    // }
};

module.exports = controller;