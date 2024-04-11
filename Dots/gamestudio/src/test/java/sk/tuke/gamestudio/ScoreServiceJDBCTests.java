package sk.tuke.gamestudio;

import org.testng.annotations.Test;
import sk.tuke.gamestudio.entity.Score;
import sk.tuke.gamestudio.service.ScoreService;
import sk.tuke.gamestudio.service.ScoreServiceJDBC;
import java.util.Date;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;


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
