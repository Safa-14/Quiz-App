///////////////////////////////////////////////////////////////
//////////////            include modules           ///////////
///////////////////////////////////////////////////////////////

// connect the dependencies
const express = require('express')
const session = require('express-session')
const path = require('path')


//include data Module
const dataModule = require('./modules/mongooseDataModule')
const adminRouter = require('./routes/adminRoute')

const app = express()

////////////////////////////////////////////////////////////////
//////////////           USE THE MIDDLEWARES           /////////
////////////////////////////////////////////////////////////////

// user url parser from express 
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

// set the public folder url 
app.use(express.static(path.join(__dirname, 'public')))



// set view engine and views path
app.set('view engine', 'ejs')
app.set('views', 'views');



//////////////////////////////////////////////////////////////////
///////////      MAKE A SESSION FOR EACH TEACHER(USER)     ///////
//////////////////////////////////////////////////////////////////

const sessionOptions = {
    secret: 'questionstore',
    resave: false,
    saveUninitialized: false,
    
}
//use a session
app.use(session(sessionOptions))


// connect to the adminRouter 
app.use('/admin', adminRouter);

//////////////////////////////////////////////////////////////////
///////////      RENDER  ROUTES AND PAGE HANDLER       ///////////
//////////////////////////////////////////////////////////////////

// register page handler (register teachers email in the db)
app.get('/', (req, res) => {
    res.render('registerUser')
})

app.post('/', (req, res) => {
    //console.log(req.body);
    //this is the register post handler
    //1 means user registered successfully //  res.json(1)
    //2 means data error // res.json(2)
    //3 means user exists
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    
        dataModule.registerUser(username.trim(), email.trim(), password).then(() => {
            res.json(1)
        }).catch(error => {
            console.log(error);
            if (error == 'exists') {
                res.json(3)
            } else {
                res.json(2)
            }

        })

});


// admin login page handler(only the teachers who are registered can login and access to the adminpannel)
app.get('/login', (req, res) => {
    // res.render('loginUser')
    if (req.session.user) {
        res.redirect('/admin')
    } else {
        res.render('loginUser')
    }
})

app.post('/login', (req, res) => {
    //console.log(req.body);
    if (req.body.email && req.body.password) {
        dataModule.checkUser(req.body.email.trim(), req.body.password).then(user => {
            req.session.user = user
            console.log(req.session.user);
            res.json(1)
        }).catch(error => {
            if (error == 3) {
                res.json(3)
            } else {
                res.json(4)
            }
        })
    } else {
        res.json(2)
    }

});

//show all exams handler
app.get("/getAllExams", (req, res) => {
    // you have to get all the exames from db and send them to the ejs file and render it
    dataModule.getAllExams().then((exams) => {
        
        res.render('allExams', {
            exams
        })
    }).catch(error => {

        res.json(2)

    })

});
//here we will show the exam page where we will find all exams added by all teachers
//to show the exam to the teacher before sending the url to students
app.get('/showExam/:examId', (req, res) => {
    const examId = req.params.examId

    dataModule.getExam(examId).then(exam => {
        dataModule.getQuestions(exam.questions).then(questions => {
            res.render('getExam', {
                exams:questions,
                exam:exam
            })
            
        }).catch(error => {
            res.json(error)
        })

    }).catch(error => {
        res.json('this Exam doesnt exist');
    })
})

//to get the url and send it to students
app.get('/exam/:examId', (req, res) => {

    const examId = req.params.examId

    dataModule.getExam(examId).then(exam => {

        dataModule.getQuestions(exam.questions).then(questions => {
            
            res.render('main', {
                options: JSON.stringify(questions),
                question:questions
            })
            
        }).catch(error => {
            res.json(error)
        })

    }).catch(error => {
        res.json('this Exam doesnt exist');
    })
})

//edit the questions inside the exam page by the teacher
app.post('/editExam', (req, res) => {
    console.log(req.body)

    //NOTE check the note in the editQuestion ejs the name of the parameters are given there
    const newQuestion = req.body.question
    const newAnswer = req.body.answer
    const newChoice1 = req.body.choice1
    const newChoice2 = req.body.choice2
    const newChoice3 = req.body.choice3
    const questionid = req.body.questionid
    // const examTitle = req.body.examTitle

    if (newQuestion && newAnswer && newChoice1 && newChoice2 && newChoice3 && questionid ) {

        dataModule.updatedQuestions(newQuestion, newAnswer, newChoice1, newChoice2, newChoice3, questionid).then(() => {

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

//delete the question inside the exam page by the teacher
app.post('/deleteExam', (req, res) => {
    console.log(req.body)

    const deleteQuestionId = req.body.deleteQuestionId

    dataModule.deleteQuestionExam(deleteQuestionId).then(() => {
        res.json(1)
    }).catch(error => {
        res.json(2)
        console.log(error);
    })
})



//////////////////////////////////////////////////////////////////////////
/////////     CHOOSE 3000 AS A PORT TO MAKE THE DEBUGGER LISTEN    ///////
//////////////////////////////////////////////////////////////////////////
app.listen(3000, () => {
    console.log('App is listening on port 3000!');
});