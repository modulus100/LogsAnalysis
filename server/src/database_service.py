#!/usr/bin/env python3
import psycopg2


class DatabaseService(object):
    def get_popular_articles(self):
        """Return the most popular three articles of all time."""
        query = """
            SELECT art.title, count(art.slug) AS cnt
            FROM log l
            INNER JOIN articles art ON l.path ILIKE '%' || art.slug || '%'
            GROUP BY art.title
            ORDER BY cnt DESC
            LIMIT 3;"""

        db = None
        articles = None

        try:
            db, c = self.connect()
            c.execute(query)
            articles = c.fetchall()
            db.commit()
        finally:
            db.close()
        return articles

    def get_popular_authors(self):
        """Return the most popular article authors of all time."""
        query = """
            SELECT a.name, count(a.name) AS cnt
            FROM log l
            INNER JOIN articles art ON l.path ILIKE '%' || art.slug || '%'
            INNER JOIN authors a on a.id = art.author
            GROUP BY a.name
            ORDER BY cnt DESC;"""

        db = None
        authors = None

        try:
            db, c = self.connect()
            c.execute(query)
            authors = c.fetchall()
            db.commit()
        finally:
            db.close()
        return authors

    def get_dates(self):
        """Days that did more than 1% of requests lead to errors."""
        query = """SELECT * FROM get_dates_by_ratio(1);"""
        db = None
        dates = None

        try:
            db, c = self.connect()
            c.execute(query)
            dates = c.fetchall()
            db.commit()
        finally:
            db.close()
        return dates

    @staticmethod
    def connect(database_name="news"):
        db = psycopg2.connect("dbname={}".format(database_name))
        cursor = db.cursor()
        return db, cursor

