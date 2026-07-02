Q   Can Javascript objects hold a function as property?
        yes it can hold the function
        eg.
            const person = {
                name: "Aditya",
                age: "28",
                greet: function({
                        console.log("Hello I am " +this.name)
                }) 
            }
            person.greet();
            person.name

Q   how to write a simple function?
        function sayhello(){
            return "hello how are you?"
        }
        const storingFunction = sayHello()
        console.log(storingFunction) 
        output= "hello how are you?"

Q   what is anonymous function in javascript?
    it does not have the function name.
        const greet = function(){
            return "Hello how are you"
        }
        console.log(greet)//Hello how are you

Q   difference between var,const and let with an example?

    var: var is function scoped and global scoped and can be redeclared and updated.
    eg. 
        function varExample(){
            var x=1;
            if(true){
                var x=2;
                var x=4;
                console.log(x) //2 JS override the global scopr x value
            }
            x=3 //updated global variable x value
            console.log(x) //3
        }

    let: let is blocked scope and can be updated but not redeclared within same scope
    eg.
        function letExample(){
            let x=1;
            if(true){
                let x=2;
                x=3
                console.log(x) //2
            }
            console.log(x) //1
        }

    
    const: const is block scoped and cannot be updated or redeclared.
    e.g.
        function constExample(){
            const x=1
            if(true){
                const x=2;
                console.log(x)
            }
            x=3 // CE can not reassign the value to constant variable
            console.log(x)
        }

Q.  where are push,pop,slice,shift and unshift methods used when accessing array elements?
    e.g

        const fruits = ["Apple","Banana","Cherry","Date"]
        console.log(fruits[0])
    
    push() : adds the element at the end of an array
         const fruits = ["Apple","Banana","Cherry","Date"]
         fruits.push=["elderberry"]
    pop() : removes the element from the end of an array
        const firstPop= fruits.pop();
        console.log(firstPop)
          console.log(fruits)
    unshift(): Add the element from begging of an array.
        const unshfit= fruits.unshift("Mango")
          console.log(fruits)
    shift(): remove the element at the begginning on an array.
        const shift =fruits.shift()
          console.log(fruits)
    
    splice() :remove the element from specific index.
        const index= fruits.indexOf("Apple")
        const splice= fruits.splice(index,1)
          console.log(fruits)

Q   how JS asynchronous prove it with example.
   console.log("Hi I will execute first")
    console.log("Hi I will execute second")
   
    setTimeout(function()
    {
        console.log("Hi I will execute third")
    },2000)
    console.log("Hi I will execute fourth")
    

Q   what are callBack function in JS?
    a callBack function is that is passed as an argument to another function.
    where we need to wait for one function to execute and then continue with second function
    function fetchdata(callback)
    {
        setTimeout(() => {
            console.log("Data is fetched")
            const data= "sample Data"
            callback(data)
        },2000)
    }

    function processData(data){
        console.log("processing : ", data)
    }

    function modifydata(data){
        console.log("Modifying : ", data)
    }

    fetchdata(processData)
    fetchdata(modifyData)

Q   what are promises in javascript and explain the difference between callback functions and promises with example?
     function fetchdata(callback)
     //fetchdata from server resolve, pending,rejected, only execute when it is resolve
     return new Promise((resolve)=>{
    {
        setTimeout(() => {
            console.log("Data is fetched")
            const data= "sample Data"
            resolve(data)
        },2000)
    }
     })

    fetchdata().then(function(data){
        console.log("processing : ", data)
    })

    const data= await fetchdata()
    console.log("Processing:" data);

Q Create inheritance relationship between a parent and child class invoke the parent constructor from child class. Create main.js to call parent class methods from a child class object.

Q what is difference between == and ===?
    5=='5' => true
    5 === 5 => false

Q what is difference between null and undefined?
    let a = null
    console.log(a) => null
    console.log(typeof a) =>Object

    let b
    console.log(b)// undefined
    console.log(b)// undefined

Q classic programming question that involves using array methods (filter,reduce, and map)
    const student= [
        {name: "aditya", score : 98},
        {name: "akankasha", score: 80},
        {name: "aa" , score : 78},
        {name : "bb" , score : 12}
    ]

    Q1 filtered the students who passed and having marks more than 35
    const passedStudent= student.filter(student => student.score>35)
    console.log(passedStudent)

   
    Q2 Update passed students name to upparcase
       const studentName= passedStudent.map(student=> student.name.toupperCase())
       console.log(studentName)

    Q3 Total score of All passing students
      const totalScoreOfPassedStudent=  passedStudent.reduce( function (acc,student){
        acc= acc+ student.score;
        return acc;
    }   
    ,0) 

    console.log(totalScoreOfPassedStudent)

Q   reverse String and palindrome string
    function reverseString(str){
        return str.split('').reverse().join('');
    }

    const output = reverseString("Aditya")
    console.log(output)


    function palindrome(str){
        return str === str.split('').reverse().join('');
    }

    const output1 = palindrome("AbA")
    console.log(output1)


