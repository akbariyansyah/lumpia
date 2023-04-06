const subjectRepo = require('../repository/subject.js');

const ListController =  (req, res) => {
    subjectRepo.List(connection, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching subjects" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
}

const DetailController = (req, res) => {
    var id = req.params.id
    subjectRepo.Detail(connection, id, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving subject" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
}

const CreateController =  (req, res) => {
    var student = req.body;
    subjectRepo.Create(connection, student, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating subject" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
}

const UpdateController =  (req, res) => {
    var subject = req.body;
    var id = req.params.id;
    subjectRepo.Update(connection, subject, id, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating subject" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
}

const DeleteController =  (req, res) => {
    var id = req.params.id;
    subjectRepo.Delete(connection, id, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting subject" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
}

module.exports = { ListController , DetailController, CreateController, UpdateController, DeleteController};