import {getDynamicQuizTable} from '../Connection'

export const QuestionLoader=async(quizid)=>{
    var part1=[]
    var part2=[]
    var part3=[]
    var total=[]
    await getDynamicQuizTable(quizid).then(res=>{
        for(let i=0;i<res.data.length;i++)
        {
          if(res.data[i].part==="part1")
          {
            part1.push(res.data[i])
          }
          else if(res.data[i].part==="part2")
          {
            part2.push(res.data[i])
          }
          else if(res.data[i].part==="part3")
          {
            part3.push(res.data[i])
          }
        }
    })
    if(part1.length>0)
    {total.push(part1)}
    if(part2.length>0)
    {total.push(part2)}
    if(part3.length>0)
    {total.push(part3)}

    return total
}