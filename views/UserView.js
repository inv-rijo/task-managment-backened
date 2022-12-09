//view for login user which is simple constructor where value where pass though and set in objecr
class LoginView {
  constructor(data, accessToken, refreshToken) {
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
class UserView {
  constructor(data) {
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
class UserListView {
  constructor(data) {
    this.userList = [];
    for (let user of data) {
      this.userList.push(new UserListView(user));
    }
  }
}

module.exports = { LoginView, UserView, UserListView };
