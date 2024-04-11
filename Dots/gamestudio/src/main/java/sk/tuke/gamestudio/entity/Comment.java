package sk.tuke.gamestudio.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;

import java.util.Date;

@Entity
@NamedQuery( name = "Comment.getComments",
        query = "SELECT c FROM Comment c WHERE c.game=:game ORDER BY c.commentedOn DESC")

public class Comment {
    @Id
    @GeneratedValue
    private int indent;
    private String game;
    private String player;
    private String comment;
    private Date commentedOn;

    public Comment(String game, String player, String comment, Date commentedOn) {
        this.game = game;
        this.player = player;
        this.comment = comment;
        this.commentedOn = commentedOn;
    }

    public Comment() {
    }

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

    public String getComment() {
        return comment;
    }

    public Date getCommentedOn() {
        return commentedOn;
    }

    public void setGame(String game) {
        this.game = game;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setCommentedOn(Date commentedOn) {
        this.commentedOn = commentedOn;
    }


    @Override
    public String toString() {
        return "Comment{" +
                "indent=" + indent + '\'' +
                ", game='" + game + '\'' +
                ", player='" + player + '\'' +
                ", comment=" + comment +
                ", commentedOn=" + commentedOn +
                '}';
    }





}
