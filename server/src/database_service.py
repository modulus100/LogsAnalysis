import psycopg2, bleach

DBNAME = "news"


class DatabaseService(object):
    @staticmethod
    def get_popular_articles():
        """Return the most popular three articles of all time."""
        query = """
            SELECT art.title, count(art.slug) AS cnt
            FROM log l
            INNER JOIN articles art ON l.path ILIKE '%' || art.slug || '%'
            GROUP BY art.title
            ORDER BY cnt DESC
            LIMIT 3;"""

        db = psycopg2.connect(database=DBNAME)
        try:
            c = db.cursor()
            c.execute(query)
            articles = c.fetchall()
            db.commit()
        finally:
            db.close()
        return articles

    @staticmethod
    def get_popular_authors():
        """Return the most popular article authors of all time."""
        query = """
            SELECT a.name, count(a.name) AS cnt
            FROM log l
            INNER JOIN articles art ON l.path ILIKE '%' || art.slug || '%'
            INNER JOIN authors a on a.id = art.author
            GROUP BY a.name
            ORDER BY cnt DESC
            LIMIT 3;"""

        db = psycopg2.connect(database=DBNAME)
        try:
            c = db.cursor()
            c.execute(query)
            authors = c.fetchall()
            db.commit()
        finally:
            db.close()
        return authors

    @staticmethod
    def get_dates():
        """Days that did more than 1% of requests lead to errors."""
        query = """SELECT * FROM get_dates_by_ratio(1);"""

        db = psycopg2.connect(database=DBNAME)
        try:
            c = db.cursor()
            c.execute(query)
            dates = c.fetchall()
            db.commit()
        finally:
            db.close()
        return dates