package com.tripnet.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tripnet.dao.ICommonDAO;
import com.tripnet.dao.ITourPostDAO;
import com.tripnet.enties.TourPost;
/*
 * *Author: QuanDT
 */
@Transactional
@Repository
public class TourPostDAOImpl implements ICommonDAO<TourPost>, ITourPostDAO<TourPost>  {
	@PersistenceContext	
	private EntityManager entityManager;
	
	@Override
	public TourPost getOneById(int objectId) {
		return  entityManager.find(TourPost.class, objectId);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<TourPost> getAll() {
		String hql = "FROM TourPost AS tp WHERE tp.deleted = ?";
		return entityManager.createQuery(hql).setParameter(1, 0).getResultList();
	}

	@Override
	public void add(TourPost object) {
		entityManager.persist(object);
	}

	@Override
	public void update(TourPost object) {
		TourPost tp = getOneById(object.getId());
		tp.setCreateTime(object.getCreateTime());
		tp.setDeleted(object.getDeleted());
		tp.setDescription(object.getDescription());
		tp.setDuration(object.getDuration());
		tp.setStartPlaceID(object.getStartPlaceID());
		tp.setEndPlaceID(object.getEndPlaceID());
		tp.setTourArticleTitle(object.getTourArticleTitle());
		
		entityManager.flush();	
	}

	@Override
	public void delete(int objectId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean isExits(String title) {
		String hql = "FROM tour_posts as tp WHERE tp.tour_article_title = ?";
		int count = entityManager.createQuery(hql).setParameter(1, title).getResultList().size();
		return count > 0 ? true : false;
	}
	
	

}
