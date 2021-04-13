# todo make this everytime
all: main.pdf

main.pdf: main.tex *.tex *.bib images/*
	bibtex main > /dev/null
	pdflatex -interaction=nonstopmode main > /dev/null
