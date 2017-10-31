package com.tripnet.dao;

import java.util.List;

public interface IAccountDAO<T> {
    boolean accountExists(String username, String email);
    List<T> checkLogin(String email, String password);	
}
