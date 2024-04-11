import java.util.List;
import java.util.Random;

public class Board {
    private int width;
    private int height;
    private int numColors;
    private Dot[][] dots;
    private boolean[][] visited;

    public Board(int width, int height, int numColors) {
        this.width = width;
        this.height = height;
        this.numColors = numColors;
        this.dots = new Dot[width][height];
        this.visited = new boolean[width][height];
        populateBoard();
    }

    private void populateBoard() {
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                int color = (int) (Math.random() * numColors) + 1;
                dots[x][y] = new Dot(x, y, color);
            }
        }
    }

    public void printBoard() {
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                Dot dot = dots[x][y];
                if (dot == null) {
                    System.out.print(" ");
                } else {
                    System.out.print(dot.getColor());
                    System.out.print(" ");
                }
            }
            System.out.println();
            System.out.println();

        }
    }

    public boolean isValidMove(int x1, int y1, int x2, int y2) {
        if (x1 < 0 || x1 >= width || y1 < 0 || y1 >= height || x2 < 0 || x2 >= width || y2 < 0 || y2 >= height) {
            return false;
        }
        if (dots[x1][y1] == null || dots[x2][y2] == null) {
            return false;
        }
        if (x1 == x2 && y1 == y2) {
            return false;
        }
        if (dots[x1][y1].getColor() != dots[x2][y2].getColor()) {
            return false;
        }
        if (!isMoveValidHelper(x1, y1, x2, y2)) {
            return false;
        }
        return true;
    }

    private boolean isMoveValidHelper(int x1, int y1, int x2, int y2) {
        visited = new boolean[width][height];
        int color = dots[x1][y1].getColor();
        return isMoveValid(x1, y1, x2, y2, color);
    }

    private boolean isMoveValid(int x, int y, int targetX, int targetY, int color) {
        visited[x][y] = true;
        if (x == targetX && y == targetY) {
            return true;
        }
        if (x > 0 && dots[x - 1][y] != null && dots[x - 1][y].getColor() == color && !visited[x - 1][y])
            if (isMoveValid(x - 1, y, targetX, targetY, color)) {
                return true;
            }

        if (x < width - 1 && dots[x + 1][y] != null && dots[x + 1][y].getColor() == color && !visited[x + 1][y]) {
            if (isMoveValid(x + 1, y, targetX, targetY, color)) {
                return true;
            }
        }
        if (y > 0 && dots[x][y - 1] != null && dots[x][y - 1].getColor() == color && !visited[x][y - 1]) {
            if (isMoveValid(x, y - 1, targetX, targetY, color)) {
                return true;
            }
        }
        if (y < height - 1 && dots[x][y + 1] != null && dots[x][y + 1].getColor() == color && !visited[x][y + 1]) {
            if (isMoveValid(x, y + 1, targetX, targetY, color)) {
                return true;
            }
        }
        return false;
    }

    public void removeDots(List<Dot> dotsToRemove) {
        for (Dot dot : dotsToRemove) {
            dots[dot.getX()][dot.getY()] = null;
        }
    }

    public boolean hasMovesLeft() {
        for (int x1 = 0; x1 < width; x1++) {
            for (int y1 = 0; y1 < height; y1++) {
                for (int x2 = 0; x2 < width; x2++) {
                    for (int y2 = 0; y2 < height; y2++) {
                        if (isValidMove(x1, y1, x2, y2)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    public int getRandomColor() {
        Random random = new Random();
        return random.nextInt(numColors) + 1;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public Dot[][] getDots() {
        return dots;
    }


    public boolean isValidCoordinate(int x, int y) {
        return x >= 0 && x < width && y >= 0 && y < height;
    }

    public Dot getDot(int x, int y) {
        if (isValidCoordinate(x, y)) {
            return dots[x][y];
        } else {
            return null;
        }
    }

    public boolean isValidChain(List<Dot> chain) {
        if (chain.size() < 2) {
            return false;
        }

        Dot firstDot = chain.get(0);
        for (int i = 1; i < chain.size(); i++) {
            Dot currentDot = chain.get(i);
            if (!isValidMove(firstDot.getX(), firstDot.getY(), currentDot.getX(), currentDot.getY())) {
                return false;
            }
            firstDot = currentDot;
        }
        return true;
    }




}