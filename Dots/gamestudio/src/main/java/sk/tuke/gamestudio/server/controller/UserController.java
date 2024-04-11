package sk.tuke.gamestudio.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.WebApplicationContext;
import sk.tuke.gamestudio.entity.Player;
import sk.tuke.gamestudio.service.PlayerService;

import java.util.List;

@Controller
@Scope(WebApplicationContext.SCOPE_SESSION)
//@RequestMapping("/user")
public class UserController {
    private Player loggedUser;
    private boolean takenUsername;
    private boolean valid = true;

    @Autowired
    private PlayerService playerService;


    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("/login")
    public String login(@RequestParam(value = "login", required = false, defaultValue = "")String login,
                        @RequestParam(value = "passwd", required = false, defaultValue = "")String passwd){

        if(login.isEmpty() || passwd.isEmpty()) {
            this.valid = false;
            return "index";
        }
        if(!registered(login) || !playerService.getPassword(login).equals(passwd)){
            this.valid = false;
            return "index";
        }
        loggedUser = new Player(login,passwd);
        takenUsername = false;
        valid = true;
        return "redirect:/dots/new";
    }

    @PostMapping("/registerpage")
    public String register(@RequestParam(value = "login", required = false, defaultValue = "")String login,
                           @RequestParam(value = "passwd", required = false, defaultValue = "")String passwd){
        if(login.isEmpty() || passwd.isEmpty()) return "redirect:/";
        List<String> players = getPlayersNames();
        if(!players.isEmpty()){
            for(String name :players){
                if(name.equals(login)){
                    takenUsername = true;
                    return "redirect:/";
                }
            }
        }
        loggedUser = new Player(login,passwd);
        playerService.addPlayer(loggedUser);
        takenUsername = false;
        return "redirect:/dots/new";
    }

    @GetMapping("/register")
    public String register(){
        return "redirect:/dots/new";
    }

    @RequestMapping("/logout")
    public String logout() {
        loggedUser = null;
        return "redirect:/dots";
    }


    public boolean isLogged() {
        return loggedUser != null;
    }

    public boolean registered(String name){
        List<String> players = getPlayersNames();
        return players.stream().anyMatch(str -> str.equals(name));
    }
    private List<String> getPlayersNames(){
        return playerService.getPlayer();
    }

    public boolean usernameTaken(String name){
        List<String> players = playerService.getPlayer();
        if(players.isEmpty()){
            return false;
        }
        if(players.contains(name)){
            return true;
        }
        return false;
    }

    public Player getLoggedUser() {
        return loggedUser;
    }

    public boolean isTakenUsername() {
        return takenUsername;
    }

    public boolean isValid() {
        return valid;
    }

    public PlayerService getPlayerService() {
        return playerService;
    }

    public void setLoggedUser(Player loggedUser) {
        this.loggedUser = loggedUser;
    }

    public void setTakenUsername(boolean takenUsername) {
        this.takenUsername = takenUsername;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public void setPlayerService(PlayerService playerService) {
        this.playerService = playerService;
    }
}

