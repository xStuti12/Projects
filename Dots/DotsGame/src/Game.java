import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;
import entity.*;
import service.*;



public class Game {
    private ScoreService scoreService = new ScoreServiceJDBC();

    private CommentService commentService = new CommentServiceJDBC();

    private RatingService ratingService = new RatingServiceJDBC();
    private static final String GAME = "Dots";


    Board board;
    String playerName = "Stuti";
    int playerMovesLeft = 3;
    public Game(int width, int height, int numColors) {
        this.board = new Board(width, height, numColors);
    }

    public void play() {
        Scanner scanner = new Scanner(System.in);
        int score = 0;

        while (board.hasMovesLeft() && playerMovesLeft > 0) {
            board.printBoard();
            System.out.println("Moves left: " + playerMovesLeft);
            System.out.println("Score: " + score);
            System.out.println("Enter dots to connect(format : x1,y1 x2,y2 x3,y3):");
            String input = scanner.nextLine();

            // Rozdelenie inputu na jednotlive suradnice
            String[] dotCoords = input.split("\\s+");

            // Kontrola ci pouzivatel zadal aspon 2 bodky
            if (dotCoords.length < 2) {
                System.out.println("Invalid input.");
                continue;
            }

            List<Dot> dotsToRemove = new ArrayList<>();
            for (String coord : dotCoords) {
                String[] coords = coord.split(",");
                int x = Integer.parseInt(coords[0]) - 1;
                int y = Integer.parseInt(coords[1]) - 1;
                if (!board.isValidCoordinate(x, y)) {
                    System.out.println("Invalid input.");
                    dotsToRemove.clear();
                    break;
                }
                dotsToRemove.add(board.getDot(x, y));
            }

            // Kontrola ci zadane suradnice bodiek mozu byt spojene do retazca
            if (!board.isValidChain(dotsToRemove)) {
                System.out.println("Invalid input, please try again.");
                continue;
            }

            // Odstranenie bodiek a pridanie score
            score += dotsToRemove.size();
            board.removeDots(dotsToRemove);
            dropDots();
            playerMovesLeft --;
        }

        System.out.println("Game over!");
        System.out.println("Your final score: " + score);
        scoreService.addScore(new Score(GAME, "Stuti", score, new Date()));
        printScores();
        enterComment();
        enterRating();
    }


    private void dropDots() {
        Dot[][] dots = board.getDots();
        for (int x = 0; x < board.getWidth(); x++) {
            int numDots = 0;
            for (int y = board.getHeight() - 1; y >= 0; y--) {
                if (dots[x][y] == null) {
                    numDots++;
                } else if (numDots > 0) {
                    dots[x][y + numDots] = dots[x][y];
                    dots[x][y] = null;
                }
            }
            for (int i = 0; i < numDots; i++) {
                dots[x][i] = new Dot(x, i, board.getRandomColor());
            }
        }
    }

    private void printScores() {
        List<Score> scores = scoreService.getTopScores(GAME);

        System.out.println("Top scores:");
        for (Score s : scores) {
            System.out.println(s);
        }
    }

    private void printComments() throws CommentException {
        List<Comment> comments = commentService.getComments(GAME);

        System.out.println("Other comments:");
        for (Comment c : comments) {
            System.out.println(c);

        }
    }



    private void enterComment() throws CommentException {
        System.out.print("Add comment? (Y/N):");
        String answer = new Scanner(System.in).nextLine().trim().toUpperCase();
        if (answer.equals("Y")) {
            System.out.println("Enter your comment: ");
            String comment = new Scanner(System.in).nextLine().trim();
            commentService.addComment(new Comment(GAME,playerName,comment,new Date()));
            printComments();
        }
    }


    private void enterRating() throws RatingException {
        System.out.print("Give the game a rating? (Y/N):");
        String answer = new Scanner(System.in).nextLine().trim().toUpperCase();
        if (answer.equals("Y")) {
            latestRating();
            System.out.print("Enter rating: ");
            int rating = new Scanner(System.in).nextInt();
            ratingService.setRating(new Rating(GAME,playerName,rating ,new Date()));
            System.out.println("Average rating: " + ratingService.getAverageRating(GAME));
        }
    }

    private void latestRating() throws RatingException {
        System.out.print("Have entered a rating yet? (Y/N):");
        String answer = new Scanner(System.in).nextLine().trim().toUpperCase();
        if (answer.equals("Y")) {
            int rating = ratingService.getRating(playerName,GAME);
            if(rating > 0){ System.out.println("Your rating: " + rating);}
        }
    }



}