import psycopg2, bleach

DBNAME = "news"


class DatabaseService(object):
    @staticmethod
    def get_authors():
        """Return all posts from the 'database', most recent first."""
        db = psycopg2.connect(database=DBNAME)
        try:
            c = db.cursor()
            c.execute("SELECT name FROM authors ORDER BY name DESC LIMIT 20")
            posts = c.fetchall()
        finally:
            db.close()
        return posts

    @staticmethod
    def add_author(post_id, name):
        """Add a post to the 'database' with the current timestamp."""
        db = psycopg2.connect("dbname='log_analyzer' user='postgres'"
                              " host='localhost' password='aurafruit'")
        try:
            c = db.cursor()
            c.execute("INSERT INTO test.authors VALUES (%S, %S)",
                      (post_id, bleach.clean(name)))
            db.commit()
        finally:
            db.close()
