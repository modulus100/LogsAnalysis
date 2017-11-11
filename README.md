

# Logs Analysis

Full Stack Developer Nanodegree Project 3

The Logs Analysis is a web application which is based on the following 
technologies: Python, Flask, 
Angular js, Node js, PostgreSQL. The application analysis the data logs and 
shows the result on html page, it's intended for determining the most
popular authors, articles and the dates did more than 1% of requests lead to
 errors. It's divided into two parts: the client and the server. The client 
 is Angular js SPA applications and the server is Python based back end that
  provides REST API.
 
 
## Setup
 
### Node js
Vagrant has to have installed Node js to serve static files. If 
you have not Node js installed, go through this guide https://nodejs.org/en/download/package-manager

 Run this commands in the vagrant's terminal

```sh
vagrant@vagrant:~$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
vagrant@vagrant:~$ sudo apt-get install -y nodejs
```

### PostgreSQL, User-Defined Function

The application uses a user-defined function, the following query 
bellow has
 to be executed in the vagrant's terminal
 
 Log in into the news database
 
```
psql -d news
```
 Execute the query (All project queries can be found in sql folder)
 
```
CREATE OR REPLACE FUNCTION get_dates_by_ratio(percent INTEGER)
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
```

## Usage



### Client

Go to project directory

```
vagrant@vagrant:/$ cd vagrant/LogsAnalysis

```
Run these commands once before running the client first time

```
vagrant@vagrant:/vagrant/LogsAnalysis$ npm install http-server -g
vagrant@vagrant:/vagrant/LogsAnalysis$ npm i

```

Run the client, next time you want to run the client use this only

```
vagrant@vagrant:/vagrant/LogsAnalysis$ node bin/http-server

```