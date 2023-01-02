"""
This file contain the automatic parsing logic of the application.
It is written in Python out of conveniance and use the automatic
database table schema from SQLAlchemy to store the information into
the app database.

It is written as standalone script so it can be run directly from 
a cron job or from the command line, Allowing it to run at a precise
time and frequency.
"""
import os

from sqlalchemy import MetaData, create_engine, Table
from can.driver import driver_factory
from dotenv import load_dotenv

# The database are define by the NextJS backend using typeORM
# So we can use the autoload function from SQLAlchemy to get the
# table schema from the database.

load_dotenv(".env.local")

# Create the URL to connect to the database using the environment variables
# defined in the .env file
e = lambda x: os.getenv(x)
url = f"mysql+pymysql://{e('MYSQL_USER')}:{e('MYSQL_PASSWORD')}@{e('MYSQL_HOST')}:{e('MYSQL_PORT')}/{e('MYSQL_DATABASE')}"
print('url')
print(url)


engine = create_engine(url)
metadata = MetaData(bind=engine)

articles = Table("Article", metadata, autoload=True, auto_load_with=engine)
websites = Table("Website", metadata, autoload=True, auto_load_with=engine)


# We can now run every drivers to parse the websites and store each results
# into the database. (if different from last row)
website_list = ["korben", "zero1net", "generation_nt", "lesnumeriques", "developpez"]
for website in website_list:
    driver = driver_factory(website)
    article = driver.fetch_last_article()

    # Check if the article is already in the database
    # If not, insert it
    if not engine.execute(
        articles.select().where(articles.c.title == article.title)
    ).first():
        engine.execute(
            articles.insert().values(
                title=article.title,
                author=article.author,
                date=article.date,
                url=article.url,
                website=article.website.name,
            )
        )