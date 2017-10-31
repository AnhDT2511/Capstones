package com.tripnet.services;

import java.util.List;

public interface IAccountService<T> {
	List<T> login(T object);
}
