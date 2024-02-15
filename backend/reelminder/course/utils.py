"""
Helper module containing utilities.

"""

from bs4 import BeautifulSoup
import requests

def retrieve_yt_meta(video_id: str) -> dict:
    """
    Function responsible for scrapping the basic metadata from the youtube video.
    Retrievs title and description.

    Parameters
    ----------
    video_id : `str`
        Id of the YT video.

    Returns
    -------
    dict
        Dictionary contains retrieved metadata

    Raises
    ------
    AttributeError
        When passed wrong ID.
    ConnectionError
        When there was issue during connection.
    TypeError
        When the viedo have no metadata.
        
    """
    if len(video_id) < 11:
        raise AttributeError("Wrong video ID")
    url = f"https://www.youtube.com/watch?v={video_id}"
    page = requests.get(url)
    if page.status_code != 200:
        raise ConnectionError("Connection error")
    bs=BeautifulSoup(page.content, 'html.parser')
    try:
        title = bs.find("meta",  {"name":"title"})['content']
        description = bs.find("meta",  {"name":"description"})['content']
        return {"title": title, "description": description}
    except TypeError as e:
        if "'NoneType' object is not subscriptable" in str(e):
            raise TypeError("Metadata not found")
        raise