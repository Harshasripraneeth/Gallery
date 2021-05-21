package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"golang.org/x/crypto/bcrypt"
)

// database variable

type Details struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Message struct {
	Status   string `json:"status"`
	Username string `json:"username"`
	Error    string `json:"error"`
	Token    string `json:"token"`
}

//registration
func register(w http.ResponseWriter, r *http.Request) {

	fmt.Println("Register")
	w.Header().Set("Content-Type", "applcation/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")

	//retrieve json body
	var details Details
	_ = json.NewDecoder(r.Body).Decode(&details)

	//declaring message
	var message Message

	fmt.Println("register")
	//hashing password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(details.Password), 8)
	if err != nil {
		message.Error = "error in hashing password"
	}

	//intialising database
	database, err := sql.Open("mysql", "root:test@tcp(172.17.0.2)/gallery")
	if err != nil {
		message.Error = "error in connecting database"
	}

	//check whether any users are present with existing username and email
	//get database results
	results, err := database.Query("SELECT * from users where username = (?) or email =(?)", details.Username, details.Email)
	if err != nil {
		message.Error = "error in retreiving results"
	}

	// if present return
	if results.Next() {
		message.Error = "user already present"
		goto stmterr
	}

	//get database results
	_, err = database.Query("INSERT INTO users (username,email,password) VALUES (?,?,?)", details.Username, details.Email, hashedPassword)
	if err != nil {
		message.Error = "error in inserting record"
	}

	defer database.Close()
	defer results.Close()
stmterr:
	if len(message.Error) == 0 {
		message.Status = "success"
		message.Username = details.Username
		message.Token, err = GenerateJWT(details.Username)
	} else {
		message.Status = "fail"
	}
	json.NewEncoder(w).Encode(message)

}

//Login

func Login(w http.ResponseWriter, r *http.Request) {

	fmt.Println("login")
	w.Header().Set("Content-Type", "applcation/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")

	//retrieve json body
	var details Details
	_ = json.NewDecoder(r.Body).Decode(&details)

	//declaring message
	var message Message
	message.Status = "fail"

	database, err := sql.Open("mysql", "root:test@tcp(172.17.0.2)/gallery")
	if err != nil {
		message.Error = "error in connecting database"
		json.NewEncoder(w).Encode(message)
		return
	}

	//get database results
	results, err := database.Query("SELECT password from users where username = (?)", details.Username)
	if err != nil {
		message.Error = "Error Occured, please try again!!"
		json.NewEncoder(w).Encode(message)
		return
	}

	var databaseCreds Details
	for results.Next() {

		err = results.Scan(&databaseCreds.Password)
		if err != nil {
			message.Error = "User Not Found"
			json.NewEncoder(w).Encode(message)
			return
		}
	}
	//verifying password
	if err = bcrypt.CompareHashAndPassword([]byte(databaseCreds.Password), []byte(details.Password)); err != nil {
		message.Error = "Please check username/password"
		json.NewEncoder(w).Encode(message)
		return
	}

	defer database.Close()
	defer results.Close()

	token, err := GenerateJWT(details.Username)
	if err != nil {
		message.Error = "error occured in generating token !!!"
		json.NewEncoder(w).Encode(message)
		return
	}
	message.Status = "success"
	message.Username = details.Username
	message.Token = token
	fmt.Println(token)

	json.NewEncoder(w).Encode(message)

}

// function to generate JWT token
func GenerateJWT(username string) (string, error) {

	var mySiginingKey = []byte("SecretKey")
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["authorized"] = true
	claims["username"] = username
	claims["exp"] = time.Now().Add(time.Minute * 10).Unix()
	tokenString, err := token.SignedString(mySiginingKey)
	if err != nil {
		fmt.Println("error occured")
		return "", err
	}
	return tokenString, nil
}

func main() {

	mux := mux.NewRouter()

	mux.HandleFunc("/register", register).Methods("POST")
	mux.HandleFunc("/login", Login).Methods("POST")

	handler := cors.Default().Handler(mux)
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
		// Enable Debugging for testing, consider disabling in production
		// Debug: true,
	})
	// Insert the middleware
	handler = c.Handler(handler)
	log.Fatal(http.ListenAndServe(":8005", handler))

}
