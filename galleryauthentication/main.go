package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	_ "github.com/go-sql-driver/mysql"
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
	results, err := database.Query("SELECT * from users where username = (?) and email =(?)", details.Username, details.Email)
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
		message.Error = "error in retreiving results"
	}

	defer database.Close()
	defer results.Close()
stmterr:
	if len(message.Error) == 0 {
		message.Status = "success"
		message.Username = details.Username
	} else {
		message.Status = "fail"
	}
	json.NewEncoder(w).Encode(message)

}

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

	database, err := sql.Open("mysql", "root:test@tcp(172.17.0.2)/gallery")
	if err != nil {
		message.Error = "error in connecting database"
	}

	//get database results
	results, err := database.Query("SELECT password from users where username = (?)", details.Username)
	if err != nil {
		message.Error = "error in retrieving resuls"
	}

	var databaseCreds Details
	for results.Next() {

		err = results.Scan(&databaseCreds.Password)
		if err != nil {
			message.Error = "error in retreiving results"
		}
	}
	//verifying password
	if err = bcrypt.CompareHashAndPassword([]byte(databaseCreds.Password), []byte(details.Password)); err != nil {
		message.Error = "error in hashing"
		return
	}

	defer database.Close()
	defer results.Close()
	if len(message.Error) == 0 {
		message.Status = "success"
		message.Username = details.Username
	} else {
		message.Status = "fail"
	}
	json.NewEncoder(w).Encode(message)

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
