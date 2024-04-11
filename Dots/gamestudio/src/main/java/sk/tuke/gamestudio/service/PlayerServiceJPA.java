package sk.tuke.gamestudio.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import sk.tuke.gamestudio.entity.Player;

import java.util.List;
//zmenit kus
@Transactional
@Service
public class PlayerServiceJPA implements PlayerService{
    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public void addPlayer(Player player) throws PlayerException {
        entityManager.persist(player);
    }
    @Override
    public List<String> getPlayer() throws PlayerException {
        TypedQuery<String> query = entityManager.createNamedQuery("Player.getPlayer",String.class);
        return query.getResultList();
    }
    @Override
    public String getPassword(String name) throws PlayerException {
        Query query = entityManager.createNamedQuery("Player.getPassword", String.class);
        String passwd = (String)query.setParameter("name",name).getSingleResult();
        return passwd;
    }
}
