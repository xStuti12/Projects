package sk.tuke.gamestudio.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.WebApplicationContext;
import sk.tuke.gamestudio.entity.Comment;
import sk.tuke.gamestudio.entity.Rating;
import sk.tuke.gamestudio.entity.Score;
import sk.tuke.gamestudio.game.Board;
import sk.tuke.gamestudio.game.Dot;
import sk.tuke.gamestudio.game.Game;
import sk.tuke.gamestudio.game.GameState;
import sk.tuke.gamestudio.service.*;
import org.springframework.ui.Model;

import java.util.Collections;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/dots")
@Scope(WebApplicationContext.SCOPE_SESSION)
public class DotsController {

    @Autowired
    private ScoreService scoreService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private RatingService ratingService;

    @Autowired
    private UserController userController;

    private int playerMovesLeft = 3;
    private GameState gameState;
    private int score = 0;

    private Game game = new Game(10, 10, 4);

    List<Dot> dotsToRemove = new ArrayList<>();

    public DotsController() {
        gameState = GameState.PLAYING;
    }

    @GetMapping
    public String dots(Model model, @RequestParam(required = false) Integer row, @RequestParam(required = false) Integer column) {
        if (row != null && column != null) {
            dotsToRemove.add(game.getBoard().getDot(row, column));
        }

        model.addAttribute("htmlField", getHtmlField());
        if (!model.containsAttribute("errorMessage")) {
            model.addAttribute("errorMessage", "");
        }
        model.addAttribute("gameState", gameState);
        prepareModel(model);
        return "dots";
    }

    @GetMapping("/new")
    public String newGame(Model model) {
        game = new Game(10, 10, 4);
        playerMovesLeft = 3;
        gameState = GameState.PLAYING;
        model.addAttribute("htmlField", getHtmlField());
        prepareModel(model);
        return "dots";
    }


    public String getHtmlField() {
        game.dropDots();
        StringBuilder sb = new StringBuilder();
        sb.append("<table>");

        sb.append("<tr>");
        sb.append("<td colspan='" + game.getBoard().getWidth() + "'>");
        sb.append("Moves Left: " + playerMovesLeft);
        sb.append("<div class='game-state'>");
        sb.append("</div>");
        sb.append("</td>");
        sb.append("</tr>");

        for (int row = 0; row < game.getBoard().getHeight(); row++) {
            sb.append("<tr>");
            for (int column = 0; column < game.getBoard().getWidth(); column++) {
                var dot = game.getBoard().getDot(row, column);
                sb.append("<td>");
                sb.append("<a href='/dots?row=" + row + "&column=" + column + "'>");
                sb.append("<img src='http://localhost:8080/images/" + getImageName(dot) + ".png'>");
                sb.append("</a>");
                sb.append("</td>");
            }
            sb.append("</tr>");
        }
        sb.append("</table>");

        return sb.toString();
    }


    public String getImageName(Dot dot) {
        switch (dot.getColor()) {
            case 1:
                return "blue";
            case 2:
                return "red";
            case 3:
                return "green";
            case 4:
                return "yellow";
            default:
                throw new IllegalArgumentException("Not valid dot color" + dot.getColor());
        }

    }

    public int getScore() {
        return score;
    }

    @PostMapping
    public String removeDots(Model model) {
        if (!game.getBoard().isValidChain(dotsToRemove) || dotsToRemove.size() < 2) {
            dotsToRemove.clear();
            model.addAttribute("errorMessage", "Invalid selection. Please select at least two dots that are adjacent.");
            model.addAttribute("htmlField", getHtmlField());
            prepareModel(model);
            return "dots";
        }
        game.getBoard().removeDots(dotsToRemove);
        game.dropDots();
        score += dotsToRemove.size();
        dotsToRemove.clear();
        playerMovesLeft--;
        model.addAttribute("errorMessage", "");
        model.addAttribute("htmlField", getHtmlField());
        prepareModel(model);
        if (!game.getBoard().hasMovesLeft() || playerMovesLeft <= 0) {
            gameState = GameState.OVER;
            model.addAttribute("gameState", gameState);
            model.addAttribute("gameOverMessage", "Game Over!");
            if(userController.isLogged()) {
                scoreService.addScore(new Score("dots", userController.getLoggedUser().getName(), score, new Date()));
            }
            prepareModel(model);

        }
        return "dots";
    }
    @RequestMapping("/addCom")
    public String addComment(String player,String comment,Model model) throws CommentException, RatingException {

        commentService.addComment(new Comment("dots",userController.getLoggedUser().getName(),comment,new Date()));
        model.addAttribute("htmlField", getHtmlField());
        prepareModel(model);

        return "dots";
    }

    @RequestMapping("/addRat")
    public String addRating(String rating,String player,Model model) throws RatingException, CommentException {
        ratingService.setRating(new Rating("dots",userController.getLoggedUser().getName(),Integer.parseInt(rating),new Date()));
        model.addAttribute("htmlField", getHtmlField());
        prepareModel(model);

        return "dots";
    }

    private void prepareModel(Model model) throws CommentException, RatingException {
        model.addAttribute("scores", scoreService.getTopScores("dots"));
        model.addAttribute("comments", commentService.getComments("dots"));
        model.addAttribute("averageRating", ratingService.getAverageRating("dots"));
        if(userController.isLogged()){
            model.addAttribute("playerRating", ratingService.getRating("dots",userController.getLoggedUser().getName()));
        }

    }
    @GetMapping("/swap")
    public String swapRandomYellowDotsToBlue(Model model) {
        List<Dot> yellowDots = new ArrayList<>();
        for (int row = 0; row < game.getBoard().getHeight(); row++) {
            for (int column = 0; column < game.getBoard().getWidth(); column++) {
                Dot dot = game.getBoard().getDot(row, column);
                if (dot.getColor() == 4) {
                    yellowDots.add(dot);
                }
            }
        }
        Collections.shuffle(yellowDots);
        int count = 0;
        for (Dot dot : yellowDots) {
            dot.setColor(1);
            count++;
            if (count >= 4) {
                break;
            }
        }
        model.addAttribute("htmlField", getHtmlField());
        prepareModel(model);
        return "dots";
    }





}