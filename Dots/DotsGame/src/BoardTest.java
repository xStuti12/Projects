import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;



public class BoardTest {

    @Test
    public void testIsValidMove() {
        Board board = new Board(6, 6,2);
        Dot dot1 = new Dot(0,0,1);
        Dot dot2 = new Dot(1,0,1);
        Dot dot3 = new Dot(0,1,2);
        Dot dot4 = new Dot(1,1,2);


        assertTrue(board.isValidMove(0, 0, 1, 0));
        assertTrue(board.isValidMove(0, 0, 0, 1));
        assertFalse(board.isValidMove(0, 0, 1, 1));
        assertFalse(board.isValidMove(0, 0, 0, 0));
        assertFalse(board.isValidMove(0, 0, -1, 0));
        assertFalse(board.isValidMove(0, 0, 7, 0));
    }
}
