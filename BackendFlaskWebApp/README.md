# DVDRental Flask API

Táto aplikácia je jednoduchá RESTful API pre správu filmov vo filmovej požičovni. Je napísaná pomocou frameworku Flask a používa PostgreSQL ako databázu.

## Požiadavky
- Python 3.x
- PostgreSQL

Potrebné balíky:
flask,psycopg2,pandas

Aplikáciu sa dá spustiť pomocou zadania príkazu "python program.py" do konzole.
Testovanie CRUD oprácií je možné pomocou Postmana. 
Niektoré jednoduché požiadavky pre testovanie:
GET request na "http://localhost:5000/api/records?phrase=test"
POST request na "http://localhost:5000/api/records" s telom JSON obsahujúcim údaje o filme.
PUT request na "http://localhost:5000/api/records/{film_id}" s telom JSON obsahujúcim aktualizované údaje.
DELETE request na "http://localhost:5000/api/records/{film_id}" na zmazanie filmu podľa ID.

Port na ktorom beží aplikácia je možné prestaviť v programe, taktiež je potrebné skontrolovať port na ktorom beží databáza aby sa na ňu dalo pripojiť.
