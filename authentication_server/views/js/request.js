const makeRequest =async(URL)=>{
        const Cookies = document.cookie.split('=')
        const jwt =Cookies[Cookies.indexOf('JWT') + 1]


        
        const request = await fetch(URL,{
                method:'GET',
                mode:'cors',
                headers:{
                        'Content-Type': 'application/json',
                         'Authorization':'Bearer ' + jwt,

                },
                
                
        })
       
        return  request.status
}

document.getElementById('superOnly').addEventListener('click',async()=>{
                const URL= 'http://localhost:4000/api/superOnly'
                const text = document.getElementById('request1') 
                let result = await makeRequest(URL)
                console.log("Result of request " , result)
                if (result==200){
                        text.innerText = "Success";
                }
                if (result==403){
                        const genRequest = await fetch('http://localhost:3000/generateToken',{
                                method:'GET',
                                // mode:'cors',
                                // credentials:'include'
                                
                                
                        })
                        console.log("status of refresh Token Request :" , genRequest.status)
                        if (genRequest.status==200){
                                result =await makeRequest(URL)
                                console.log("Result of request " , result)
                                if (result==200){
                                        text.innerText="Success"
                                }else{     
                                document.getElementById('request1Failed').innerText="unauthorized to make that request"
                                }
                        }
                        else{
                                document.getElementById('request1Failed').innerText="unauthorized to make that request"   
                        }
                }
                      
        
})



document.getElementById('anyUser').addEventListener('click',async()=>{
        const URL= 'http://localhost:4000/api/anyUser'
        const text = document.getElementById('request2') 
        let result = await makeRequest(URL)
        console.log("Result of request " , result)
        if (result==200){
                text.innerText = "Success";
        }
        if (result==403){
                const genRequest = await fetch('http://localhost:3000/generateToken',{
                        method:'GET',
                        // mode:'cors',
                        // credentials:'include'
                        
                        
                })
                console.log("status of refresh Token Request :" , genRequest.status)
                if (genRequest.status==200){
                        result =await makeRequest(URL)
                        console.log("Result of request " , result)
                        if (result==200){
                                
                                text.innerText="Success"
                        }else{     
                        document.getElementById('request2Failed').innerText="unauthorized to make that request"
                        }
                }
                else{
                        document.getElementById('request2Failed').innerText="unauthorized to make that request"   
                }
        }
              

})



