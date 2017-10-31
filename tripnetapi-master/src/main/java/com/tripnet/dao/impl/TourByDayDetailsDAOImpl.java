package com.tripnet.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tripnet.dao.ICommonDAO;
import com.tripnet.enties.TourByDayDetails;

/*
 * *Author: QuanDT
 */
@Transactional
@Repository
public class TourByDayDetailsDAOImpl implements ICommonDAO<TourByDayDetails>{
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public TourByDayDetails getOneById(int objectId) {
		// TODO Auto-generated method stub
		return entityManager.find(TourByDayDetails.class, objectId);
	}

	@Override
	public List<TourByDayDetails> getAll() {
		String hql = "FROM TourByDayDetails AS tbdd WHERE tbdd.deleted = ?";
		return entityManager.createQuery(hql).setParameter(1, 0).getResultList();
	}

	@Override
	public void add(TourByDayDetails object) {
		entityManager.persist(object);
	}

	@Override
	public void update(TourByDayDetails object) {
		TourByDayDetails tbdd = getOneById(object.getId());
		
		tbdd.setCreateTime(object.getCreateTime());
		tbdd.setDeleted(object.getDeleted());
		tbdd.setDescription(object.getDescription());
		tbdd.setPlaceID(object.getPlaceID());
		tbdd.setVehicle(object.getVehicle());
		tbdd.setHotel(object.getHotel());
		tbdd.setTourByDayID(object.getTourByDayID());
		
		entityManager.flush();	
	}

	@Override
	public void delete(int objectId) {
		// TODO Auto-generated method stub
		
	}
	
}
