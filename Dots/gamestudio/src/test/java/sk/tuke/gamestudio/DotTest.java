package sk.tuke.gamestudio;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import sk.tuke.gamestudio.game.Dot;

public class DotTest {

    private final Dot dot = new Dot(1,3, 2);

    @Test
    void dotXChecker(){
        assertEquals(1, dot.getX());
    }
    @Test
    void dotYChecker(){
        assertEquals(3, dot.getY());
    }
    @Test
    void dotColorChecker(){
        assertEquals(2, dot.getColor());
    }


}
