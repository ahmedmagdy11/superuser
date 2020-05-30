window.onload=async()=>{
   
    // $.ajax({
    //     url: "http://localhost:3000/GenerateToken",
    //     type: "get", //send it through get method
    //     success:function(res){
    //         console.log(res)
    //         console.log(document.cookie)
    //     } 
    //    })

   const result =  await fetch('http://localhost:3000/GenerateToken',{
        
            method: 'GET',
            mode: 'same-origin',
            redirect: 'follow',
            credentials: 'include', // Don't forget to specify this if you need cookies
           }
    )
     
       const result2 = await fetch('http://localhost:3000/GenerateToken',{
        
            method: 'POST',
            mode: 'same-origin',
            credentials: 'include', // Don't forget to specify this if you need cookies
           }
    )
    console.log(result)
    console.log(result2)
}