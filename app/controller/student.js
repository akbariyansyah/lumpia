const studentRepo = require('../repository/student.js');

const DetailController = (req, res) => {
    const id = req.params.id
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

const ListController = (req, res) => {
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

const CreateController = (req, res) => {
    const student = req.body;
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

const DeleteController = (req, res) => {
    const id = req.params.id;
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

const UpdateController = (req, res) => {
    const student = req.body;
    const id = req.params.id;
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
