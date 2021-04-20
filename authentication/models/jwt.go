package models

import (
	"time"
	jwt "github.com/dgrijalva/jwt-go"
	)

//function to generate to JWT token.
func GenerateJWT(username string) (string, error) {

	var mySiginingKey = []byte("SecretKey")
	token := jwt.New(jwt.SigningMethodHS256)

	//information stored in the token.
	claims := token.Claims.(jwt.MapClaims)
	claims["authorized"] = true
	claims["username"] = username
	claims["exp"] = time.Now().Add(time.Minute * 10).Unix()
	//generating token.
	tokenString, err := token.SignedString(mySiginingKey)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
