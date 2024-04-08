import "./App.css";
import { CiCalculator2 } from "react-icons/ci";
import { useState } from "react";
import {evaluate} from "mathjs";
import {Variants, easeIn, easeInOut, motion} from "framer-motion"

const App = () => {
  //variable for press animation
  const pressAnim: Variants = {
    initial: {
      boxShadow: "0 5px 0 #afafaf"
    },

    tap: {y: 5,
      boxShadow: "0 2px 0 #afafaf",
    }

  }





  
  //states
  const [input, setInput] = useState("0");
  const [preview, setPreview] = useState("0");

  //whenever an operator is used we go to a new Equation
  const [newEquation, setNewEquation] = useState(true)

  //Variables for last input and figuring out what the last input or what the last character in the input is.
  const lastIndex:number = input.length -1;
  const lastInput:string = input[lastIndex];
  const operators: string[] = ["-", "+", "x", "/"];
  const LastisOperator: boolean = operators.includes(lastInput);

  function InputHandler(e:React.MouseEvent<HTMLButtonElement>){
   
    //if a button is pressed the preview should reset back to 0
    setPreview("0");

    //This finds out whether the last button pressed is an OPERATOR and if the last Input is also an Operator
    const CurrentisOperator:boolean = operators.includes(e.currentTarget.value);

    //if the current key pressed is an operator we set the new equation to TRUE
    if(CurrentisOperator){
      setNewEquation(true);
    }

    //figuring out whether a zero is next in an operator or if a zero has no number aside from zero preceding it
    if(LastisOperator && e.currentTarget.value === "0" || LastisOperator && e.currentTarget.value !== "0" ){
      setInput(input + e.currentTarget.value);
    }

    if(lastInput !== "0" && e.currentTarget.value === "0" && !LastisOperator){
      setNewEquation(false);
      setInput(input + e.currentTarget.value);
    }

    
    //if it is a new equation or if an operator is present it becomes a new equation. if it is a new equation a zero becomes replaced by whatever key pressed.
    if(newEquation && input.length === 1){
      setNewEquation(!newEquation);
      setInput(e.currentTarget.value);
    }
    else if(!newEquation){
    setInput(input + e.currentTarget.value)
    }
    else if(newEquation && lastInput === "0"){
      setInput(input.slice(0,-1) + e.currentTarget.value);
    }
    else if(newEquation && e.currentTarget.value !== "0"){
      setInput(input + e.currentTarget.value);
      setNewEquation(false);
    }

    //if key pressed is 0 and the calculator only contains 0, we simply replace the 0 with a 0 to avoid multiple 0
    if(e.currentTarget.value === "0" && input === "0"){
      setInput(e.currentTarget.value);
    }
    
    //if both the button pressed and the last input is an Operator we would simply replace the last Operator with the Operator pressed
    if(CurrentisOperator && LastisOperator ){
      
      setInput(input.slice(0,-1) + e.currentTarget.value);

    }
    
    //Prevents pressing an Operator if there is no number given first.
    if(CurrentisOperator && input === "0"){
      setInput("0");
    }

    if(lastInput === "." && e.currentTarget.value === "."){
      setInput(input.slice(0, -1) + e.currentTarget.value);
    }
    
    
  }
  //Clears the input field, resets the Calculator back to 0 and the Preview.
  function Clear(){
    setNewEquation(true);

    setInput("0");
    setPreview("0")
  }


  //Removes the last input, if the current value of the calculator is only 1 digit then we bring it back to 0. This also resets the Preview.
  function Del(){
    const secondLastisOperator = operators.includes(input[input.length - 2]);

    if(secondLastisOperator){
      setNewEquation(true);
    }
    
    setPreview("0");

    setInput(input.slice(0,-1));
    if(input.length === 1){
      setInput("0");
    }
    else if(input.length === 0){
      setNewEquation(true);
    }
    

    
  }


  //Solving the Equations
  function Solve(){
    //This part is just to send the equation to the Preview holder so it can display it at the screen.
    setPreview(input);


    //since computers do not use the letter "X" as multiplication symbol they use "*", we have to replace our X with * before evaulation.
    const replaced = input.replace(/x/g, "*")
    const result = evaluate(replaced).toString();

    setInput(result);
  }






  return (
    <div className="Container">
      <div className="Calculator-Body">
        <div className="Head">
          <CiCalculator2 className="Head-Icon" />
          <h2>Calculator</h2>
          
        </div>

        <div className="Screen">
          <p className="preview">{preview}</p>
          <p>{input}</p>
        </div>

        <div className="Inputs">
          <div className="Keypads">
            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}} value={7} onClick={(e)=>{InputHandler(e)}}>7</motion.button>

            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}}  value={8} onClick={(e)=>{InputHandler(e)}}>8</motion.button>
            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}}  value={9} onClick={(e)=>{InputHandler(e)}}>9</motion.button>
            <motion.button initial={{boxShadow: "0 5px 0 #b83e3e",}} whileTap={{y: "5px", boxShadow: "0 2px 0 #b83e3e"}} transition={{duration: .1, ease: easeInOut}} className="Delete" onClick={()=>{Del()}}>DEL</motion.button>
            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}}  value={4} onClick={(e)=>{InputHandler(e)}}>4</motion.button>
            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}}  value={5} onClick={(e)=>{InputHandler(e)}}>5</motion.button>
            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}}  value={6} onClick={(e)=>{InputHandler(e)}}>6</motion.button>
            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}}  value={"+"} onClick={(e)=>{InputHandler(e)}} disabled={false}>+</motion.button>
            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}}  value={1} onClick={(e)=>{InputHandler(e)}}>1</motion.button>
            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}}  value={2} onClick={(e)=>{InputHandler(e)}}>2</motion.button>
            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}}  value={3} onClick={(e)=>{InputHandler(e)}}>3</motion.button>
            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}}  value={"-"} onClick={(e)=>{InputHandler(e)}} disabled={false}>-</motion.button>
            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}}  value={"."} onClick={(e)=>{InputHandler(e)}} disabled={false}>.</motion.button>
            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}}  value={0} onClick={(e)=>{InputHandler(e)}}>0</motion.button>
            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}}  value={"/"} onClick={(e)=>{InputHandler(e)}} disabled={false}>/</motion.button>
            <motion.button variants={pressAnim} whileTap="tap" initial="initial" transition={{duration: .1, ease: easeInOut}}  value={"x"} onClick={(e)=>{InputHandler(e)}} disabled={false}>X</motion.button>
          </div>
          <div className="LowerBtns">
            <motion.button initial={{boxShadow: "0 5px 0 #b83e3e",}} whileTap={{y: "5px", boxShadow: "0 2px 0 #b83e3e"}} transition={{duration: .1, ease: easeInOut}} className="Delete" onClick={()=>{Clear()}}>AC</motion.button>
            <motion.button initial={{boxShadow: "0 5px 0 #214c81",}} whileTap={{y: "5px", boxShadow: "0 2px 0 #214c81"}} transition={{duration: .1, ease: easeInOut}}  className="Equal" onClick={()=>{Solve()}}>=</motion.button>
          </div>
        </div>
        <p className="copyright">© 2024 Bulilan. All rights reserved.</p>
      </div>
    </div>
  );
};

export default App;
