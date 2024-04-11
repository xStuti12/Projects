package service;
import org.junit.Test;
import entity.Rating;

import java.util.Date;

import static org.junit.Assert.*;


public class RatingServiceJDBCTests {
    private RatingService service = new RatingServiceJDBC();

    @Test
    public void setRating() throws RatingException {
        Rating rating = new Rating("Dots","Stuti",5,new Date());
        service.setRating(rating);

        assertEquals(5,service.getRating("Dots","Stuti"));
    }

    @Test
    public void setNewRating() throws RatingException {
        Rating rating = new Rating("Dots","Stuti",4,new Date());
        service.setRating(rating);
        Rating rating1 = new Rating("Dots","Stuti",5,new Date());
        service.setRating(rating1);

        assertNotEquals(4,service.getRating("Dots","Stuti"));
        assertEquals(5,service.getRating("Dots","Stuti"));

    }


    @Test
    public void getAverageRating() throws RatingException {
        Rating rating1 = new Rating("Dots","Stuti",3,new Date());
        Rating rating2 = new Rating("Dots","Kiko",5,new Date());
        service.setRating(rating1);
        service.setRating(rating2);

        assertEquals(4,service.getAverageRating("Dots"));
    }


}
