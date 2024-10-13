import { useState} from 'react';
import Ques from '../../questions/questions';

const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [questions, setQuestions] = useState(Ques[index]);
    let [score, setScore] = useState(0);
    let [select, setSelect] = useState(false);
    let [nextbtn, setNextbtn] = useState("Next");
    let [correct, setCorrect] = useState(0);
    let [incorrect, setIncorrect] = useState(0);

    let ansList = document.querySelectorAll(".ansList");    
    let QBox = document.getElementById('QBox');
    let RBox = document.getElementById('RBox');

    const checkAns = (e,ans) => {        

        let ansList = document.querySelectorAll(".ansList");

        if(select === false) {
            if(questions.ans === ans) {
                e.target.classList.add('bg-green-200');
                e.target.classList.add('hover:bg-green-300');
                setSelect(true);
                setScore(++score)
                setCorrect(++correct)
            } else {
                e.target.classList.add('bg-red-200');
                e.target.classList.add('hover:bg-red-300');

                ansList[questions.ans-1].classList.add('bg-green-200');
                ansList[questions.ans-1].classList.add('hover:bg-green-300');
                setIncorrect(++incorrect)

                setSelect(true);
            }
        }
    }

    function next(){        
        if(index < Ques.length-1){
            setIndex(++index)
            setQuestions(Ques[index])
        } else {
            QBox.classList.add('hidden')
            RBox.classList.remove('hidden')
        }

        if(index > Ques.length-2){
            setNextbtn("Submit")
        }

        for(let i = 0; i < ansList.length; i++){
            ansList[i].classList.remove('bg-green-200')
            ansList[i].classList.remove('bg-green-300')
            ansList[i].classList.remove('bg-red-200')
            ansList[i].classList.remove('hover:bg-red-300')
        }
        setSelect(false);
    }    

    function testAgain(){
        QBox.classList.remove('hidden')
        RBox.classList.add('hidden')

        setIndex(0)
        setQuestions(Ques[0])
        setScore(0)
        setCorrect(0)
        setIncorrect(0)

        if(index > Ques.length-2){
            setNextbtn("Next")
        }
    }


    return (
        <div className="bg-slate-50 w-[100%] lg:w-[60%] xl:w-[40%] m-auto mt-[5%]">            

            <div id='QBox' className="p-4 text-left">
                <div className='flex justify-between'>
                    <h3 className="text-2xl p-4">Question {questions.qn}</h3>
                    <p className='text-xl'>Score: {score}</p>
                </div>

                <h2 className="text-3xl"><b>Q-</b> {questions.ques}</h2>
                <p className='pt-6'>Options</p>
                <ul className="">
                    <li onClick={(e)=>{checkAns(e,1)}} className="ansList text-xl p-4 pl-8 m-1 cursor-pointer rounded-lg hover:shadow-lg"> {questions.opt1} </li><hr/>
                    <li onClick={(e)=>{checkAns(e,2)}} className="ansList text-xl p-4 pl-8 m-1 cursor-pointer rounded-lg hover:shadow-lg"> {questions.opt2} </li><hr/>
                    <li onClick={(e)=>{checkAns(e,3)}} className="ansList text-xl p-4 pl-8 m-1 cursor-pointer rounded-lg hover:shadow-lg"> {questions.opt3} </li><hr/>
                    <li onClick={(e)=>{checkAns(e,4)}} className="ansList text-xl p-4 pl-8 m-1 cursor-pointer rounded-lg hover:shadow-lg"> {questions.opt4} </li><hr/>
                </ul>
                
                
                <div className="flex justify-between mt-12">                    
                    <p className="text-2xl">{index+1} of {Ques.length}</p>
                    <button onClick={next} className="bg-green-300 text-2xl px-8 py-3 rounded hover:bg-green-400">{nextbtn}</button>
                </div>

            </div>

            <div id='RBox' className='hidden p-8 rounded'>
                <h1 className='text-3xl font-bold'> Result </h1>
                <div className='m-12'>
                    <p className='text-xl leading-relaxed'>Correct: {correct}</p>
                    <p className='text-xl leading-relaxed'>Incorrect: {incorrect}</p>
                    <p className='text-xl leading-relaxed'> Your Score is {score} </p>
                </div>

                <button onClick={testAgain} className='bg-pink-300 text-2xl px-8 py-3 rounded hover:bg-pink-400'> Test again </button>
            </div>    
        </div>
    )
}

export default Quiz;