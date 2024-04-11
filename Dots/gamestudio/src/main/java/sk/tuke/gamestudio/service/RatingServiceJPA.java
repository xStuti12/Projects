package sk.tuke.gamestudio.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import sk.tuke.gamestudio.entity.Rating;

import java.util.Date;

@Transactional
public class RatingServiceJPA implements RatingService{
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void setRating(Rating rating) throws RatingException {
        try{
            int ratingId = ((Rating)entityManager.createQuery("SELECT r from Rating r where r.game=:game AND r.player=:player").setParameter("player",rating.getPlayer())
                    .setParameter("game",rating.getGame()).getSingleResult()).getIndent();
            Rating existingRating = entityManager.getReference(Rating.class, ratingId);
            existingRating.setRating(rating.getRating());
            existingRating.setRatedOn(new Date());
        } catch (RuntimeException e){
            System.out.println(e.getMessage());
            entityManager.persist(rating);
        }

    }

    @Override
    public int getAverageRating(String game) throws RatingException {
        int rating = 0;
        try {
            rating = (int) Math.round((double) entityManager.createNamedQuery("Rating.getAverageRating")
                    .setParameter("game", game).getSingleResult());
        }
        catch(NullPointerException e){
            System.out.println("No rating available.");
        }
        return rating;
    }


    @Override
    public int getRating(String game, String player) throws RatingException {
        int rating = 0;
        try {
            rating =  (int)(entityManager.createNamedQuery("Rating.getRating")
                    .setParameter("game", game).setParameter("player", player).getSingleResult());
        }
        catch(NoResultException e){
            System.out.println("No rating available.");
        }
        return rating;
    }


    @Override
    public void reset() throws RatingException {
        entityManager.createNativeQuery("DELETE FROM rating").executeUpdate();
    }
}
