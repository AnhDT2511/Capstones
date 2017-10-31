package com.tripnet.services;

import java.util.List;
/*
 * *Author: QuanDT
 */
public interface ITourPostService<T> {
	T getOneById(int objectId);
	List<T> getAll();	
    boolean add(T object);
    void update(T object);
    void delete(int objectId);
}
