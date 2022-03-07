package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
)

//go:embed __sapper__/export/*
var static embed.FS

func main() {
	export, err := fs.Sub(static, "__sapper__/export")
	if err != nil {
		log.Fatal(err)
	}
	//http.Handle("/sb/", http.StripPrefix("/sb", http.FileServer(http.FS(export))))
	http.Handle("/", http.FileServer(http.FS(export)))
	log.Fatal(http.ListenAndServe(":8080", nil))
}
