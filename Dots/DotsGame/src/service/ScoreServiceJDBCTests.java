package service;
import org.junit.Test;
import entity.Score;

import java.util.Date;
import java.util.List;

import static org.junit.Assert.*;



public class ScoreServiceJDBCTests {
    @Test
    public void addScore() {
        ScoreService service = new ScoreServiceJDBC();
        Score score1 = new Score("Dots", "Stuti", 12, new Date());
        service.addScore(score1);
        List<Score> scores = service.getTopScores("Dots");


        assertEquals(1, scores.size());
        assertEquals("Stuti", scores.get(0).getPlayer());
        assertEquals(12, scores.get(0).getPoints());
        assertEquals("Dots", scores.get(0).getGame());
    }


}
