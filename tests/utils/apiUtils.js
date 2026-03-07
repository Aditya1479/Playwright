class ApiUtils{

    constructor(apiContext){
        this.apiContext = apiContext;
    }
        async getToken(){
            const loginResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                {
                    data:loginPayload

                } )//200,201,202
            expect(loginResponse.ok()).toBeTruthy()

            const loginReponseJson=await loginResponse.json()
            token= loginReponseJson.token;
            console.log(token);
            return token;
        }
}