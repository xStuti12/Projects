package service;
import org.junit.Test;
import entity.Comment;
import java.util.Date;
import java.util.List;
import static org.junit.Assert.*;
public class CommentServiceJDBCTests {

    @Test
    public void addComment() throws CommentException {
        CommentService service = new CommentServiceJDBC();
        Comment comment1 = new Comment("Dots", "Stuti", "Best game ever awesome implementation", new Date());
        Comment comment2 = new Comment("Dots", "Hater", "Kinda trash ngl", new Date());
        service.addComment(comment1);
        service.addComment(comment2);
        List<Comment> comments = service.getComments("Dots");


        assertEquals(2, comments.size());
        assertEquals("Stuti", comments.get(0).getPlayer());
        assertEquals("Best game ever awesome implementation", comments.get(0).getComment());
        assertEquals("Dots", comments.get(0).getGame());
        assertEquals("Hater", comments.get(1).getPlayer());
        assertEquals("Kinda trash ngl", comments.get(1).getComment());
    }


}
