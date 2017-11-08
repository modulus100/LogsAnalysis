-- Task 1
SELECT
  art.title,
  count(art.slug) AS cnt
FROM log l
INNER JOIN articles art ON l.path ILIKE '%' || art.slug || '%'
GROUP BY art.title
ORDER BY cnt DESC
LIMIT 3;


-- Task 2
SELECT
  a.name,
  count(a.name) AS cnt
FROM log l
INNER JOIN articles art ON l.path ILIKE '%' || art.slug || '%'
INNER JOIN authors a on a.id = art.author
GROUP BY a.name
ORDER BY cnt DESC
LIMIT 3;


-- Task 3
CREATE OR REPLACE FUNCTION test(percent INTEGER)
  RETURNS TABLE(datetime TIMESTAMP WITHOUT TIME ZONE, pr FLOAT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    to_char(l.time, 'DD-MON-YYYY') :: TIMESTAMP,
    (CAST(sum(CASE WHEN l.status = '404 NOT FOUND' THEN 1 ELSE 0 END) AS  FLOAT) /
    (CAST(sum(CASE WHEN l.status = '200 OK' THEN 1 ELSE 0 END) +
    sum(CASE WHEN l.status = '404 NOT FOUND' THEN 1 ELSE 0 END) AS FLOAT)) * 100) AS pr
  FROM log l
  INNER JOIN (SELECT DISTINCT to_char(time, 'DD-MON-YYYY') :: TIMESTAMP
  FROM log) u ON (u.to_char = to_char(l.time, 'DD-MON-YYYY') :: TIMESTAMP)
  GROUP BY to_char(l.time, 'DD-MON-YYYY') :: TIMESTAMP
  HAVING CAST(sum(CASE WHEN l.status = '404 NOT FOUND' THEN 1 ELSE 0 END) AS FLOAT) /
         (cast(sum(CASE WHEN l.status = '200 OK' THEN 1 ELSE 0 END) AS FLOAT) +
          sum(CASE WHEN l.status = '404 NOT FOUND' THEN 1 ELSE 0 END)) * 100 > percent;
END;
$$ LANGUAGE PLPGSQL;

SELECT * FROM test(1);
