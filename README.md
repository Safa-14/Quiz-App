# back-end-g3
​
## This project is about to connect the Frontend with the Backend. It's about to use, store and recall Data from the Database.
​
​
- We will work with Node.js / Express and with MongoDb as the Database to accomplish this task. The Design is secondary in this project.
​
- We have chosen to connect a multiple choice test / quiz with the database. 
​
##### The actions we want to realize are : 
​
- Participants can register/log in and take the test. 
- Their username and password will be stored to be able to login in again.
- Their Scores will be saved and either shown to them or send to them via mail.
- The Admin can log in on his/her own panel and either add, edit or delete the questions, answer choices and the correct answer. 
​
#### Authors
​
Safa Bouhlel
    and 
Neda Dehghan 
​
#### Used Languages & Libraries 
​
* HTML
* CSS
* JAVASCRIPT
* NODE JS
* EJS
* MONGO DB
* BOOTSTRAP
* JQUERY
* NODE MODULES
​
​
#### We are using following dependencies
​
*npm 
*express
*ejs
*password-hash
*nodemailer
*mongoose
*sessions
​
#### Code Documentation :
​
​
- **Register:**  created a registration panel to register the teacher. If the Email already exist, the user won't be added to the database. If the Teacher has registered successfully, he/she will be directed to the admin panel. Where one can modify an multiple choice exam.
​
 - **Admin:** when you have registered successfully you will be directed to the panel, where you can add / delete / or edit questions by themselves. They will be added to a question bank. From there the teachers can access the questions and add them to their individually created exams. but Only the Teacher who has created that exam can also delete it. but every Teacher can modify a question and add them to their own exam. 
​
 - **Create Exam:** in this panel you can create an individual exam. You can add different questions from the question band to your exam and modify your exam and then save it for reuse. 
​
 - **View ALL Exam:** you can choose from all the created exams without having to make a new one and reuse the already existing exams. when you choose one, you can click on the start button to see the URL of the exam to send it to the students. 
​
 - **Successful Exam:** when the student finished the exam, his wrong and correct answers will be displayed at the end and his results will be calculated and shown to him. 
​
- **created Modules** 
created modules folder for external modules, for the mongoose Schemas, for the Mongoose Connection functions and all the functions that were used for the add/create/delete/register/edit the questions, teachers and exams.
​
- **CSS**
used a template from colorlib but manipulated the style and colors to suit our interface. 
And added new loader spinners
​
- **Routes**
created an extra route for the admin. to structure and separate the actions of the admin from the main app.js page 
​
- **Partials** 
created an partials folder to separate and structure the reused scripts and links
​
- **EJS** 
used EJS to be able to work directly in the html and be able to embed javascript code into the html surface. 
created different interfaces for different actions. 
​
​
## License
​
Template:
All rights reserved to Colorlib
Licence: CC BY 3.0
You are not allowed to copy and sell it.
​
​
## Acknowledgments
​
- Theme by Colorlib
- Images sourced from Unsplash.com
