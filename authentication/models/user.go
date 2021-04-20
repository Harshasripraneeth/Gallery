package models

import (
	"github.com/beego/beego/v2/client/orm"
	_ "github.com/go-sql-driver/mysql" 
	"golang.org/x/crypto/bcrypt"
	"fmt"
)


func init() {

	
    orm.RegisterDriver("mysql", orm.DRMySQL)
    // register model
	orm.RegisterModel(new(User))
	
    // set up the database
	orm.RegisterDataBase("default", "mysql", "root:test@tcp(172.17.0.2)/gallery")

}



//for inserting record
func (u *User) Insert() (msg Message){

	o := orm.NewOrm()
	qs := o.QueryTable(u.TableName())
	var message Message
	
	//checking whether there are any users with exisiting username.
	/*num, err := qs.Filter("username__exact",u.Username).All(&users)
	if (err != nil)	{
		return result("fail","error occured while processing query")
	} else {
		if (num >0)	{
			return result("fail","user already present with username")
		}
	}
 
	//checking whether there are any users with existing email.
	num, err = qs.Filter("email__exact",u.Email).All(&users)
	if (err != nil){
		return result("fail","error occured while processing query")
	} else {
		if (num >0)	{
			return result("fail","user already present with email")
		} 
	}*/

	//checking whether a user with provided email or username exists or not.

	res, err := o.Raw("SELECT username From users where username = ? or email = ?", u.Username,u.Email).Exec()
	if err != nil {
		return errorMessage("fail","error occured while processing query")
	} else {
		if num,err := res.RowsAffected(); (num > 0 && err != nil){
			return errorMessage("fail","user already present with email/username")
		}
	}

	// hashing password using bcrypt library.
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), 8)
	if err != nil 	{
		return errorMessage("fail","error in hashing password")
	}

    // inserting the record into the database.
	i, _ := qs.PrepareInsert()
	u.Password = string(hashedPassword)
	i.Insert(u)
	i.Close()
	message.Status = "success"
	message.Username = u.Username
	message.Token,err = GenerateJWT(u.Username)
	if (err != nil){
		return errorMessage("fail","error occurred while generating token")
	}
	return message
}

// function used to verify the details of the user.
func (l *User) Login() (msg Message){

	o := orm.NewOrm()
	qs := o.QueryTable("users")
	var user User
    //searching for a record based on username.
	err := qs.Filter("username__exact",l.Username).One(&user)
	if err == orm.ErrNoRows {
		// No result 
		return errorMessage("fail","user not found")
	}

    //verifying password
	if err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(l.Password)); err != nil {
		return errorMessage("fail","Please check username/password")
	}

	var message Message

	message.Status = "success"
	message.Username = l.Username
	message.Token,err = GenerateJWT(l.Username)
	if (err != nil ){
		return errorMessage("fail","error in generating token")
	}

	return message
}

//function to generate error JSON.
func errorMessage(status,err string) (msg Message){
	var message Message
	message.Status = status
	message.Error = err
	return message
}

func (l *User) Test() (orm.Params){
	o:= orm.NewOrm()
	res:= make(orm.Params)
	nums, err := o.Raw("SELECT username, email FROM users").RowsToMap(&res, "username", "email")
	
	if (err != nil){
		fmt.Println("error occured")
	} else {
		fmt.Println(nums)
	}
    return res
}