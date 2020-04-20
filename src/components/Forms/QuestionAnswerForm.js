import React,{useCallback} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {getQuizInfoId,createDynamicQuizTable,updateQuiz} from '../Connection'
import TabForm from '../pages/TabForm'
import SuccessMessage from '../pages/Success'
import ReactLoading from 'react-loading';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin:"auto",
    backgroundColor: theme.palette.background.paper,
    width:"80%",
    height:"100%",
    padding:"1%",
    [theme.breakpoints.down(400)]:{
        width:"100%"
    },
  },
}));

function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [data,setData]=React.useState({});
  const[incomingid,setIncomingid]=React.useState()
  const[completed,setCompleted]=React.useState({part1:false,part2:false})
  const[loading,setLoading]=React.useState({part1:false,part2:false,part3:false})
  const[message,setMessage]=React.useState({part1:false,part2:false,part3:false})
  const[field1,setField1]=React.useState([{part:"part1",question:"",option1:"",option2:"",option3:"",option4:"",answer:"option1"}])
  const[field2,setField2]=React.useState([{part:"part2",question:"",option1:"",option2:"",option3:"",option4:"",answer:"option1"}])
  const[field3,setField3]=React.useState([{part:"part3",question:"",option1:"",option2:"",option3:"",option4:"",answer:"option1"}])

  const handleSubmit=async(event,part,field)=>{
      event.preventDefault();
      await setLoading({[part]:true})
      await createDynamicQuizTable(field,incomingid).then(async(res)=>{
        if(res.data.success)
        {
          await setLoading({...loading,[part]:false})
          await setMessage({...message,[part]:true})
          await setCompleted({...completed,[part]:true})
          if(value<3)
          {await setValue(value+1)} 
          if(`part${data.noofParts}`===part)
          {
            await  updateQuiz(incomingid).then((res)=>{
              props.history.replace({pathname:`/success/${incomingid}`})
          })
          }
        }
        else
        {
          await setLoading({...loading,[part]:false})
          await setMessage({...message,[part]:false})
          await setCompleted({...completed,[part]:false})
          alert("Not Saved due to some error try again")
        }
      })
      .catch(async(error)=>{
        alert("Please try Again")
        await setLoading({...loading,[part]:false})
        await setMessage({...message,[part]:false})
        await setCompleted({...completed,[part]:false})
      })
  }
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

   const getQuizInfo = useCallback(async()=>{
    let id=props.match.params.id
    setIncomingid(id);
    await getQuizInfoId(id).then(async(res)=>{
      if(!res.data.edit)
      {
        props.history.replace({pathname:`/QuizAlreadyCreated/${id}`})
      }
        await setData(res.data)
    })
    .catch(error=>
      props.history.replace({pathname:`/QuizNotFound/${id}`}))
    
  },[props.match.params.id,props.history])

  function storeTemp(tempfield,part){
    if(part==="part1")
    {setField1(tempfield)}
    else if(part==="part2")
    {setField2(tempfield)}
    if(part==="part3")
    {setField3(tempfield)}
  }

  const TabFromReusable=(incomingpart,tempfield)=>{
    if(loading[incomingpart])
    {
      return <ReactLoading type={"spinningBubbles"} color={"blue"}/>
    }
    else
    {
      if(message[incomingpart])
      {
        return <SuccessMessage />
      }
      else
      {
        return <TabForm handleSubmit={handleSubmit} tempfield={tempfield} storeTemp={storeTemp}  part={incomingpart}/>
      }
    }
  }


  React.useEffect(()=>{
    getQuizInfo()
  },[getQuizInfo])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChangeTab} aria-label="simple tabs example">
          <Tab label={data.part1?data.part1:"Part 1"} {...a11yProps(0)} />
          <Tab label={data.part2?data.part2:""} {...a11yProps(1)} disabled={data.part2!==""?!completed.part1:false}/>
          <Tab label={data.part3?data.part1:""} {...a11yProps(2)} disabled={data.part3!==""?!completed.part2:false} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div style={{width:"100%",display:"flex",justifyContent:"space-around"}}>
          {TabFromReusable("part1",field1)}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div style={{width:"100%",display:"flex",justifyContent:"space-around"}}>
      {TabFromReusable("part2",field2)}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div style={{width:"100%",display:"flex",justifyContent:"space-around"}}>
          {TabFromReusable("part3",field3)}
        </div>
      </TabPanel>
    </div>
  );
  }

export default SimpleTabs
