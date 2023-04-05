var studentRepo = require('../repository/student.js');

var DetailController = function (req, res) {
    var id = req.params.id
    studentRepo.Detail(connection, id, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving student" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
}

const ListController = function (req, res) {
    studentRepo.List(connection, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching students" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
}

const CreateController = function (req, res) {
    var student = req.body;
    studentRepo.Create(connection, student, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating student" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
}

const DeleteController = function (req, res) {
    var id = req.params.id;
    studentRepo.Delete(connection, id, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting student" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
}

const UpdateController = function (req, res) {
    var student = req.body;
    var id = req.params.id;
    studentRepo.Update(connection, student, id, (data, err) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating student" + err
            });
        else res.send({
            "status": "ok",
            "data": data
        });
    });
}

module.exports = { DetailController, ListController, CreateController, UpdateController, DeleteController };
