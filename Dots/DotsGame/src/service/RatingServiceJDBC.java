package service;

import entity.Rating;

import java.sql.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class RatingServiceJDBC implements RatingService{

    public static final String URL = "jdbc:postgresql://localhost/gamestudio";
    public static final String USER = "postgres";
    public static final String PASSWORD = "postgres";
    public static final String SELECT = "SELECT game, player, rating, ratedOn FROM rating WHERE game = ? AND player = ?";
    public static final String DELETE = "DELETE FROM rating";
    public static final String INSERT = "INSERT INTO rating (game, player, rating, ratedOn) VALUES (?, ?, ?, ?)";
    public static final String UPDATE = "UPDATE rating SET rating = ?, ratedOn = ? WHERE game = ? AND player = ?";

    @Override
    public void setRating(Rating rating) throws RatingException {
        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD)){
             try(PreparedStatement statement = connection.prepareStatement(SELECT)) {
                 statement.setString(1, rating.getGame());
                 statement.setString(2, rating.getPlayer());
                 try (ResultSet resultSet = statement.executeQuery()) {
                     if (!resultSet.next()) {
                         try (PreparedStatement statement1 = connection.prepareStatement(INSERT)) {
                             statement1.setString(1, rating.getGame());
                             statement1.setString(2, rating.getPlayer());
                             statement1.setInt(3, rating.getRating());
                             statement1.setTimestamp(4, new Timestamp(rating.getRatedOn().getTime()));
                             statement1.executeUpdate();
                         }
                     } else {
                         try (PreparedStatement statement2 = connection.prepareStatement(UPDATE)) {
                             statement2.setInt(1, rating.getRating());
                             statement2.setDate(2, new Date(rating.getRatedOn().getTime()));
                             statement2.setString(3, rating.getGame());
                             statement2.setString(4, rating.getPlayer());
                             statement2.executeUpdate();

                         }
                     }
                 }
             }
        } catch (SQLException e) {
            throw new ScoreException("Problem adding rating", e);
        }
    }

    @Override
    public int getAverageRating(String game) throws RatingException {
        int rating = 0;

        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD)) {
            try(PreparedStatement ps = connection.prepareStatement("SELECT AVG(rating) FROM rating WHERE game = ?;")){
                ps.setString(1, game);
                try(ResultSet rs = ps.executeQuery()) {
                    rs.next();
                    rating = rs.getInt(1);
                }
            }
        } catch (SQLException e) {
            throw new ScoreException("Problem getting average rating", e);
        }

        return rating;

    }

    @Override
    public int getRating(String game, String player) throws RatingException {
        int rating = 0;
        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD)) {
            try(PreparedStatement ps = connection.prepareStatement( "SELECT rating FROM rating WHERE game = ? AND player = ?")){
                ps.setString(1, game);
                ps.setString(2, player);
                try(ResultSet rs = ps.executeQuery()) {
                    if(rs.next()) {
                        rating = rs.getInt(1);
                    }else {
                        System.out.println("You haven't added a rating yet");
                    }

                }
            }
        } catch (SQLException e) {
            throw new ScoreException("Error getting rating", e);
        }

        return rating;
    }


    @Override
    public void reset() throws RatingException {
        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement statement = connection.createStatement();
        ) {
            statement.executeUpdate(DELETE);
        } catch (SQLException e) {
            throw new RatingException("Problem deleting rating", e);
        }
    }
}
