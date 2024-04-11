package sk.tuke.gamestudio.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;

@Entity
@NamedQuery(name = "Player.getPlayer",
        query = "SELECT p.name from Player p")
@NamedQuery(name = "Player.deletePlayer",
        query = "DELETE from Player")
@NamedQuery(name = "Player.getPassword",
query = "SELECT p.passwd from Player p where p.name = :name")

public class Player {

    @Id
    @GeneratedValue
    private int ident;
    private String name;
    private String passwd;

    public Player(){}
    public Player(String name, String passwd){
        this.name = name;
        this.passwd = passwd;
    }

    public int getIdent() {
        return ident;
    }

    public String getName() {
        return name;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setIdent(int ident) {
        this.ident = ident;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }
}
