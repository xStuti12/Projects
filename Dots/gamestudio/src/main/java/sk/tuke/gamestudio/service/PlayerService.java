package sk.tuke.gamestudio.service;

import sk.tuke.gamestudio.entity.Player;

import java.util.List;

public interface PlayerService {
    void addPlayer(Player player) throws PlayerException;
    List<String> getPlayer() throws PlayerException;
    String getPassword(String name) throws PlayerException;
}
