package controllers

import (
	"authentication/models"
	"encoding/json"
	beego "github.com/beego/beego/v2/server/web"
)

type UserController struct{
	beego.Controller
}

// @Title Login
// @Description verifying the details of the user
// @Param	body		body 	models.User	true		"User Details"
// @Success 200 {string} models.User.Username
// @Failure 403 body is empty
// @router /login [post]
func (u *UserController) Login(){

	var user models.User
	var message models.Message

	if err:= json.Unmarshal(u.Ctx.Input.RequestBody, &user); err != nil{
		u.Data["json"] = "error occured"
		u.ServeJSON();
	} else{
		message = user.Login()
		u.Data["json"] = message
		u.ServeJSON();
	}
}

// @Title Register
// @Description Registering the details of the user
// @Param	body		body 	models.User	true		"User Details"
// @Success 200 {string} models.User.Username
// @Failure 403 body is empty
// @router /register [post]
func (reg *UserController) Register(){

	var user models.User
	var message models.Message

	if err:= json.Unmarshal(reg.Ctx.Input.RequestBody, &user); err != nil{
		message.Status = "error occured"
		reg.Data["json"] = message
		reg.ServeJSON();
	} else{
		message = user.Insert()
		reg.Data["json"] = message
		//user.Insert()
		reg.ServeJSON()
	}

}

// @Title Test
// @Description Testing the function
// @Success 200 {object} models.User
// @Failure 403 User not found
// @router /test [get]
func (u *UserController) Test() {
	var user models.User
	u.Data["json"] = user.Test()
	u.ServeJSON()
}


