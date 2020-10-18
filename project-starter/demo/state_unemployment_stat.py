"""
web crawler to fetch data of unemployment of each state from https://www.bls.gov/lau/
data used for DSCI554 (data visualization) course project.
oct. 17, 2020
"""
import requests
from lxml import html
from bs4 import BeautifulSoup as bs
from urllib.request import urlopen
import csv
from tqdm import tqdm
import os

os.mkdir('Data')

rooturl = 'https://www.bls.gov'  # web address
url = rooturl + '/lau/'  # meta web address
page = requests.Session().get(url)
tree = html.fromstring(page.text)
target = tree.xpath('//div[@id="latest-numbers"]//p//a/@href')  # fetch pages for each state

for i in tqdm(range(len(target))):
    list_header = []
    rows = []

    target_url = rooturl + target[i]  # urls for each state data
    html = urlopen(target_url).read()
    soup = bs(html, 'html5lib')

    # get state name
    name_temp = str(soup.find('table', {"class": "regular-data"})\
        .find('caption').find('pre', {"class": "csv-output"}))
    name_start_index = name_temp.index('State/Region/Division:  </strong>') + len('State/Region/Division:  </strong>')
    name_end_index = name_temp.index('<br/></pre>')
    name = name_temp[name_start_index: name_end_index]

    # extract header
    header = soup.find('table', {"class": "regular-data"}).find('thead').find('tr').find_all('th')
    for items in header:
        text = items.get_text()
        if text[0] == ' ':
            text = text[1:]
        if text[-1] == ' ':
            text = text[:-1]
        list_header.append(text)

    # extract body data
    body = soup.find('table', {"class": "regular-data"}).find('tbody').find_all('tr')
    for tr in body:
        row = [i.get_text() for i in tr.find_all(['th', 'td'])]
        rows.append(row)

    # write data into csv
    with open('Data/'+name+'_unemployment.csv', 'w') as f:
        wr = csv.writer(f)
        wr.writerow(list_header)
        wr.writerows(rows)
