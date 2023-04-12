const subjectController = require('../controller/subject.js');

const SubjectRoutes = (app) => {
    app.get('/subjects', subjectController.ListController);

    app.get('/subjects/:id', subjectController.DetailController);
    
    app.post('/subjects', subjectController.CreateController);
    
    app.put('/subjects/:id', subjectController.UpdateController);
    
    app.delete('/subjects/:id', subjectController.DeleteController);
}

module.exports = { SubjectRoutes }