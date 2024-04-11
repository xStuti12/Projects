package sk.tuke.gamestudio.server.webservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sk.tuke.gamestudio.entity.Player;
import sk.tuke.gamestudio.service.PlayerException;
import sk.tuke.gamestudio.service.PlayerService;

import java.util.List;

@RestController
@RequestMapping("/api/player")
public class PlayerServiceRest {
    @Autowired
    private PlayerService playerService;

    @PostMapping
    public void addPlayer(@RequestBody Player player) throws PlayerException{
        playerService.addPlayer(player);
    }

    @GetMapping
    public List<String> getPlayer() throws PlayerException{
        return playerService.getPlayer();
    }

    @GetMapping("/{name}")
    public String getPassword(@PathVariable String name) throws PlayerException{
        return playerService.getPassword(name);
    }


}
