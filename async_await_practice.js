/*
With Node v8, the async/await feature was officially rolled out by the Node to deal with Promises and function chaining. The functions need not to be chained one after another, simply await the function that returns the Promise. But the function async needs to be declared before awaiting a function returning a Promise. The code now looks like below.
*/
/*
 Async functions are a combination of promises and generators, and basically, they are a higher level abstraction over promises. Let me repeat: async/await is built on promises.

 Promises were introduced to solve the famous callback hell problem, but they introduced complexity on their own, and syntax complexity.

They were good primitives around which a better syntax could be exposed to the developers, so when the time was right we got async functions.
They make the code look like it's synchronous, but it's asynchronous and non-blocking behind the scenes.
 */
const doSomethingAsync = () => {
    return new Promise(resolve => {
      setTimeout(() => resolve('I did something'), 3000)
    })
  }
  
  const doSomething = async () => {
    console.log(await doSomethingAsync()) //here it will wait for three seconds and then print the result
  }
  
  console.log('Before')
  doSomething()
  console.log('After')

  /*
  Promise all the things
Prepending the async keyword to any function means that the function will return a promise.

Even if it's not doing so explicitly, it will internally make it return a promise.
 */

const add=(a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(a<0||b<0)
            {
               return reject('Numbers must be positive')
            }
        resolve(a+b)
        },3000)
    })
}


const doWork=async()=>{
    const sum=await add(4,56) //here it will wait for two seconds to get the result and then it will move to next line
    const sum2=await add(sum,40);
    //const sum3=await add(sum2,50);
    //final sum3 after 6 seconds
    //so here all codes is happening in order even though asynchronous operation is happening behind
    const sum3=await add(sum2,-50);
    //so after 6 seconds we will get our error message printed
    return sum3;
}

doWork().then((result)=>{
   console.log('result',result);
}).catch((e)=>{
    console.log('e',e);
})