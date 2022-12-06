class LoginView{
    constructor(data,accessToken,refreshToken){
        this.user_id = data.user_id;
        this.user_name = data.user_name;
        this.email = data.email;
        this.user_type = data.user_type;
        this.department_id = data.department_id;
        this.createdDate = data.create_date;
        this.updatedDate = data.update_date;
        this.status = data.status;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    
}
class UserView{
    constructor(data){
        this.user_id = data.user_id;
        this.user_name = data.user_name;
        this.email = data.email;
        this.user_type = data.user_type;
        this.department_id = data.department_id;
        this.createdDate = data.create_date;
        this.updatedDate = data.update_date;
        this.status = data.status;
    }
    
}

module.exports = {LoginView,UserView}