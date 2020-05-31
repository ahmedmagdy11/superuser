window.onload=()=>{
   
        console.log(document.cookie)
        
  
}


document.getElementById('superOnly').addEventListener('click',async()=>{
        
                const Cookies = document.cookie.split('=')
                const jwt =Cookies[Cookies.indexOf('JWT') + 1]

                console.log(jwt)

                const proxyurl = "https://cors-anywhere.herokuapp.com/";
                const request = await fetch('http://localhost:4000/api/superOnly',{
                        method:'GET',
                        mode:'cors',
                        headers:{
                                'Content-Type': 'application/json',
                                 'Authorization':'Bearer ' + jwt,

                        },
                        
                        
                })
                const text = document.getElementById('request1')
                result = request.status
                if (result==200){
                        text.innerText = JSON.stringify(await request.json())
                }
                if (result==403){
                        const genRequest = await fetch('http://localhost:3000/generateToken',{
                                method:'GET',
                                // mode:'cors',
                                // credentials:'include'
                                
                                
                        })
                        console.log("status of refresh Token Request :" , genRequest.status)
                }
                      
        
})




