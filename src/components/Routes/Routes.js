import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
//import NavBar from '../admin/NavBar'
import Quizcreateform from '../Forms/Quizcreateform'
import QuestionAnswerForm from '../Forms/QuestionAnswerForm'
import QuizCreated from '../pages/QuizCreated'
import QuizAlreadyCreated from '../pages/QuizAlreadyCreated';
import QuizNotFound from '../pages/QuizNotFound'
import LoginNavbar from '../user/Login'
import LoginForm from '../user/LoginForm'
import QuizPage from '../user/QuizPage'
import Score from '../user/Result'
import ResultNotFound from '../user/ResultNotFound'
import QuizNotAvailable from '../user/QuizNotAvailable'

export default function WebsiteRouter(props){
    // const[navbar,setNavbar]=React.useState(false);
    // function NavbarChange(change){
    //     setNavbar(change)
    // }



    return(
        <div>
            <Router>
            <LoginNavbar history={props.history} />
            <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"space-around",paddingTop:"2%"}}>
                <Route exact path="/createQuiz" component={Quizcreateform} history={props.history}/>
                <Route exact path="/" component={LoginForm}  history={props.history}/>
                <Route exact path="/quizpage/:id/:uid" component={QuizPage} history={props.history}/>
                <Route exact path="/Result/:id/:uid" component={Score} history={props.history}/>
                <Route exact path="/QuestionAnswerForm/:id" component={QuestionAnswerForm} history={props.history}/>
                <Route exact path="/success/:id" component={QuizCreated} history={props.history}/>
                <Route exact path="/QuizNotFound/:id" component={QuizNotFound} history={props.history}/>
                <Route exact path="/QuizNotAvailable/:id/:uid" component={QuizNotAvailable} history={props.history}/>
                <Route exact path="/ResultNotFound/:id/:uid" component={ResultNotFound} history={props.history}/>
                <Route exact path="/QuizAlreadyCreated/:id" component={QuizAlreadyCreated} history={props.history}/>
            </div>
            </Router>
        </div>
    )
}