const customCheckboxes=document.querySelectorAll('.checkbox')
const goalInputs= document.querySelectorAll('.goal-input')
const error= document.querySelector('.error')
const progressValue=document.querySelector('.range-value')
const progressBar= document.querySelector('.range-bar')
const rangeBarText= document.querySelector('.range-text')
const progressLabel= document.querySelector('.progress-label')

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
  ]


const allGoals=JSON.parse(localStorage.getItem('allGoals')) || {
    first:{
        name:'',
        completed:false
    },
    second:{
        name:'',
        completed:false
    },
    third:{
        name:'',
        completed:false
    }
}
let completedGoals= Object.values(allGoals).filter((goal)=> goal.completed).length
progressValue.style.width=`${completedGoals/3 * 100}%`
rangeBarText.innerText=`${completedGoals}/3 completed`
progressLabel.innerText= allQuotes[completedGoals]

customCheckboxes.forEach((checkbox,input)=>{
    checkbox.addEventListener('click',()=>{
     const allInputfieldsFilled= [...goalInputs].every((goalInput)=>{
            return goalInput.value
            })
            if(allInputfieldsFilled){
            
                checkbox.classList.toggle('completed')
                const inputId= checkbox.nextElementSibling.id
                allGoals[inputId].completed= !allGoals[inputId].completed
                completedGoals= Object.values(allGoals).filter((goal)=> goal.completed).length
             progressValue.style.width=`${completedGoals/3 * 100}%`
             rangeBarText.innerText=`${completedGoals}/3 completed`
             progressLabel.innerText= allQuotes[completedGoals]
                localStorage.setItem('allGoals',JSON.stringify(allGoals))
                if(goalInputs[input]){
                    goalInputs[input].classList.toggle('completed')
                }
            }else{
                error.style.display='block'
            }
})
})
goalInputs.forEach((goalInput)=>{
    // console.log(allGoals[goalInput.id].name)
    if(allGoals[goalInput.id].completed){
        goalInput.classList.toggle('completed')
        goalInput.previousElementSibling.classList.toggle('completed')
    }
    goalInput.value= allGoals[goalInput.id].name
goalInput.addEventListener('focus',()=>{
     error.style.display='none'
})
  goalInput.addEventListener('input', (e)=>{
    if(allGoals[goalInput.id].completed){
        goalInput.value= allGoals[goalInput.id].name
        return
    }
    allGoals[goalInput.id]={
        name: goalInput.value,
        completed: false,
    }
    localStorage.setItem('allGoals',JSON.stringify(allGoals))
  })
    })
