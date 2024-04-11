package sk.tuke.gamestudio.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;

import java.util.Date;
@Entity
@NamedQuery( name = "Rating.getRating",
        query = "SELECT r.rating FROM Rating r WHERE r.game=:game and r.player =: player")
@NamedQuery( name = "Rating.getAverageRating",
        query = "SELECT AVG(r.rating) FROM Rating r WHERE r.game=:game")

public class Rating {
    @Id
    @GeneratedValue
    private int indent;
    private String game;
    private String player;
    private int rating;
    private Date ratedOn;


    public Rating(String game, String player, int rating, Date ratedOn) {
        this.game = game;
        this.player = player;
        this.rating = rating;
        this.ratedOn = ratedOn;
    }

    public Rating() {}

    public int getIndent() {
        return indent;
    }

    public void setIndent(int indent) {
        this.indent = indent;
    }

    public String getGame() {
        return game;
    }

    public String getPlayer() {
        return player;
    }

    public int getRating() {
        return rating;
    }

    public Date getRatedOn() {
        return ratedOn;
    }

    public void setGame(String game) {
        this.game = game;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setRatedOn(Date ratedOn) {
        this.ratedOn = ratedOn;
    }

    @Override
    public String toString() {
        //final StringBuilder builder = new StringBuilder("Rating{");
        return "Rating{" +
                "indent =" + indent + '\'' +
                ", game='" + game + '\'' +
                ", player='" + player + '\'' +
                ", rating=" + rating +
                ", ratedOn=" + ratedOn +
                '}';
    }



}
