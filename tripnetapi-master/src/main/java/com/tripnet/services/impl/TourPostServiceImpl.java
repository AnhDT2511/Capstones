package com.tripnet.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import com.tripnet.dao.ICommonDAO;
import com.tripnet.dao.ITourPostDAO;
import com.tripnet.enties.TourPost;
import com.tripnet.services.ICommonService;

/*
 * *Author: QuanDT
 */
@Service
public class TourPostServiceImpl implements ICommonService<TourPost> {
	
	@Autowired 
	private ICommonDAO<TourPost> commonDAO;
	@Autowired
	private ITourPostDAO<TourPost> tourPostDAO;

	
	@Override
	public TourPost getOneById(int objectId) {
		TourPost obj = commonDAO.getOneById(objectId);
		return obj;
	}

	@Override
	public List<TourPost> getAll() {
		return commonDAO.getAll();
	}

	@Override
	public synchronized boolean add(TourPost tourpost) {
		if (tourPostDAO.isExits(tourpost.getTourArticleTitle())) {
			return false;
		} else {
			commonDAO.add(tourpost);
			return true;
		}
	}

	@Override
	public void update(TourPost object) {
		if(object != null) commonDAO.update(object);
	}

	@Override
	public void delete(int objectId) {
		// TODO Auto-generated method stub
		
	}

}
