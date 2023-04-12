const studentController = require('../controller/student.js');

const StudentRoutes = (app) => {
    app.get('/students', studentController.ListController);

    app.get('/students/:id', studentController.DetailController);

    app.post('/students', studentController.CreateController);

    app.put('/students/:id', studentController.UpdateController);

    app.delete('/students/:id', studentController.DeleteController);
}

module.exports = { StudentRoutes }