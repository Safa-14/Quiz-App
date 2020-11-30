
///////////////////////////////////////////////////////////////
//////////////            include modules           ///////////
///////////////////////////////////////////////////////////////

// connect the dependencies express
const express = require('express')

//include data module
const dataModule = require('../modules/mongooseDataModule')

const adminRouter = express.Router()


////////////////////////////////////////////////////////////////
//////////////           USE THE MIDDLEWARES           /////////
////////////////////////////////////////////////////////////////

// use the seesion in admin route
adminRouter.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/login')
    }
})




//////////////////////////////////////////////////////////////////
///////////      RENDER  ROUTES AND PAGE HANDLER       ///////////
//////////////////////////////////////////////////////////////////
// admin panel handler
adminRouter.get('/', (req, res) => {
    res.render('adminPanel')
})


//admin can add new questions handler
adminRouter.get('/addQuestion', (req, res) => {

    res.render('addQuestion')
});

adminRouter.post('/addQuestion', (req, res) => {
    console.log(req.body);
    const question = req.body.question
    const answer = req.body.answer
    const choice1 = req.body.choice1
    const choice2 = req.body.choice2
    const choice3 = req.body.choice3
    if (question && answer && choice1 && choice2 && choice3) {
        
        dataModule.addQuestion(question, answer, choice1, choice2, choice3, req.session.user._id).then(() => {
            res.json(1)
        }).catch(error => {
            if (error == 3) {
                res.json(3)
            }
        })
    } else {
        res.json(2)
    }
    
});

//edit question handler
adminRouter.get('/editQuestions', (req, res) => {
    
    dataModule.getAllQuestion(req.session.user._id).then((questions) => {

        res.render('editQuestions', {
            questions
        })
    }).catch(error => {

        res.json(2)

    })

})

adminRouter.post('/editQuestions', (req, res) => {
    console.log(req.body)

    //NOTE check the note in the editQuestion ejs the name of the parameters are given there
    const newQuestion = req.body.question
    const newAnswer = req.body.answer
    const newChoice1 = req.body.choice1
    const newChoice2 = req.body.choice2
    const newChoice3 = req.body.choice3
    const questionid = req.body.questionid

    if (newQuestion && newAnswer && newChoice1 && newChoice2 && newChoice3 && questionid) {

        dataModule.updatedQuestions(newQuestion, newAnswer, newChoice1, newChoice2, newChoice3, questionid, req.session.user._id).then(() => {

            res.json(1)
        }).catch(error => {

            if (error == 3) {
                res.json(3)
            }
        })
    } else {
        res.json(2)
    }

})

/// delete question handler 
adminRouter.post('/deleteQuestions', (req, res) => {
    console.log(req.body)

    const deleteQuestionId = req.body.deleteQuestionId

    dataModule.deleteQuestion(deleteQuestionId, req.session.user._id).then(() => {
        res.json(1)
    }).catch(error => {
        res.json(2)
        console.log(error);
    })
})


//exam interface handler
adminRouter.get('/examInterface', (req, res) => {
    dataModule.getAllQuestion(req.session.user._id).then((questions) => {
        //console.log(questions);
        res.render('examInterface', {
            questions
        })
    }).catch(error => {

        res.json(2)

    })
});

adminRouter.post('/examInterface', (req, res) => {
    console.log(req.body);
    const examTitle = req.body.examTitle
    const selectedQuestionsIds = req.body.selectedQuestionsIds

    if (examTitle.trim()) {
        dataModule.createExam(examTitle.trim(), selectedQuestionsIds).then(() => {
            res.json(1)
        }).catch(error => {
            if (error == 'exist') {
                res.json(3)
            } else {
                res.json(4)
            }
        })
    } else {
        res.json(2)
    }
    
});


//logout handler
adminRouter.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
});

module.exports = adminRouter