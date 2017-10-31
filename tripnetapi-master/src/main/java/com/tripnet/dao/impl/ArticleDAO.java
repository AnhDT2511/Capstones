package com.tripnet.dao.impl;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.tripnet.dao.IArticleDAO;
import com.tripnet.dao.ICommonDAO;
import com.tripnet.enties.Article;


@Transactional
@Repository
public class ArticleDAO implements ICommonDAO<Article>, IArticleDAO<Article> {
	@PersistenceContext	
	private EntityManager entityManager;	
	
	@Override
	public Article getOneById(int articleId) {
		return entityManager.find(Article.class, articleId);
	}
	
	@SuppressWarnings("unchecked")	
	@Override
	public List<Article> getAll() {
		String hql = "FROM Article as atcl ORDER BY atcl.articleId";
		return entityManager.createQuery(hql).getResultList();
	}	
	
	@Override
	public void add(Article article) {
		entityManager.persist(article);
	}
	
	@Override
	public void update(Article article) {
		Article artcl = getOneById(article.getArticleId());
		artcl.setTitle(article.getTitle());
		artcl.setCategory(article.getCategory());
		entityManager.flush();
	}
	
	@Override
	public void delete(int articleId) {
		entityManager.remove(getOneById(articleId));
	}
	
	@Override
	public boolean articleExists(String title, String category) {
		String hql = "FROM Article as atcl WHERE atcl.title = ? and atcl.category = ?";
		int count = entityManager.createQuery(hql).setParameter(1, title)
		              .setParameter(2, category).getResultList().size();
		return count > 0 ? true : false;
	}
}
