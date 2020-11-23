# TRANSCRIPT

Topic: Visualization of COVID-19 Impact on US Labor Market

Team name: NinjaV

Team members:
- Amar Nath Jha jhaa@usc.edu
- Bolong Pan bolongpa@usc.edu
- Che-Pai Kung chepaiku@usc.edu
- Yo Shuan Liu yoshuanl@usc.edu


---

## Slide 1, Introduction leading with 10 words on what your visualization is about. Explain who is it addressed to, why it is interesting, original, useful.

Our Visualization is about the confirmed cases of COVID-19, the unemployment rate over the pandemic month, the number of job openings and which states lost the greatest number of jobs (were affected the most during the pandemic).

Our project aims to provide an overview on how the COVID-19 affected the U.S. labor market, and whether or not it is recovering from the impact of COVID-19. The data visualization technology can help researchers to identify how covid-19 pandemic impacted the unemployment rate with more ease. Otherwise, it can be difficult to recognize some latent information like what potentially impacted the unemployment rate in a particular state.
 
The unique part of our project is that we not only focus on the trend of unemployment rate over the pandemic months, but also try to answer the question: "Are lost jobs coming back?". In order to achieve this purpose, we visualized below information together in our project:
1. The confirmed cases of COVID-19
2. The unemployment rate
3. The number of job openings (data Source: https://www.bls.gov/news.release/jolts.t01.htm)
4. The number of unemployment claims 
 
This project addresses those who want to get an idea of the U.S. unemployment history and the influence of COVID-19 downturn among all states. And we wish to provide users the insight into the current U.S. labor market through our visualization, and eventually the idea of how the U.S. labor market would go in the near future.

## Slide 2, Explain the data and topic as needed to understand the project.

We have used the COVID-19 data sources from CSSEGISandData/COVID-19 and unemployment rate by state from US Local Area Unemployment Statistics. 
COVID-19 datasets describe the confirmed and probable cases for COVID in the United states based on every states. Unemployment Data is the data which describes the trend of the unemployment rate acting differently in each state. Additionally, it provides how the labor market is recovering from this pandemic. We can find the relationship between the unemployment rate before and after the COVID-19 outbreak. Moreover, according to the US Department of Labor, in order to receive unemployment insurance benefits, applicants need to file a claim with the unemployment insurance program in the state where you worked. Applicants are asked to file the claim weekly. If you fail to file timely each week, you will not be eligible for payment until you reactivate your claim again.

## Slide 3, Data Preprocessing 

In US Local Area Unemployment Statistics, there are several columns in the file and the data started from 2010. For the main purpose of our project, we will mainly focus on the unemployment, year and period(month) columns. In addition, we only focus on the data that was after 2020 and 2019. Regarding COVID-19 dataset, there are columns representing the confirmed, deaths and recovered. We have concentrated on the confirmed cases. Besides, we will only find the data from US. For both datasets, the files are separated by the state or by date. As we plan to draw the time series chart and compare the data between months, we thought it will be easier if we can group the data into a file for each dataset or at least by state or by month.

Additionally, in this project, we have mainly used JavaScript to build the website, including D3, react, adobe to plot the graphs. In addition, we have used Python to do web crawler, data collection and preprocessing.

## Slide 4, Explain the research you have done, what others have done in the same topic, other topics that are relevant.

We found a line chart that visualizes [the U.S. unemployment rate history since year 1929](https://howmuch.net/articles/timeline-united-states-unemployment-history) with important events pointed out on the timeline, we will use the similiar approach to visualize our data.
There is also a world map visualization of [the global rate of unemployment](https://ourworldindata.org/grapher/unemployment-rate?time=earliest..2017) that is equipped with a slide bar that allows user to interact with the map and see the year-over-year trend of unemployment rate.
There is also a world map visualization of the global rate of unemployment that is equipped with a slide bar that allows user to interact with the map and see the year-over-year trend of unemployment rate. Additionally, we also found how John Hopkins have visualized the data for COVID-19 with multiple parameters such as global confirmed cases, global deaths, U.S. confirmed case and U.S. deaths.

## Slide 5,Explain how your work is original.

- Made use of lollipop charts and maps together to show the multilevel, multidimensional visualization of information.
- Users can easily explore the unemployment rate, market trends of the labor force and the jobs market datasets with a single click and find patterns, relations between these entities.
- By showing different views at once, it is more informative and exploratory in nature to the user.
- For example, if the user hovers a bar for the year 2020, the corresponding information is shown in the map below.
- By hovering over the us state map, the increased COVID-19 confirmed cases will be shown.
- In case of line chart if a user clicks on a particular state, the trend of the newly COVID-19 confirmed cases, the unemployment rate starting from Jan. 2019 till Aug. 2020 of a particular state will show in the line chart.
- We used lollipop because we need to show the unemployment rate change together with the number of increased confirmed cases in a plot while the unemployment rate change could be negative. Additionally, by using a lollipop chart we can let the color of the lollipop candy indicate the (+/-) of the unemployment rate change, the color scale is the same as the map, so user won’t be confused. Moreover, Layout of the lollipop is sorted based on the unemployment rate change.

Additionally, we tried to answer following questions based on our visualizations:
- Is there a significant relationship between COVID-19 confirmed cases and the unemployment rate?
- How this COVID-19 break out had its impact on the US labor market.
- Which states are recovering from the impact of the COVID-19 and which states are still struggling?
- Visualized how the employment situation of each state acting differently from January-December 2020.


## Slide 6, Explain your design process, rationale for the layout, story, choice of forms, how you optimized the visual queries and user interaction.

- Simple and clean layout which is easy to understand.
- Well-designed pages with good story flow.
- Made use of frequently used charts like map, line chart, lollipop chart, etc. so that even users who are new to this domain of can easily understand the information.
- Most of the charts that were used are ones that are familiar and popular with the average user.
- This was done to grab the attention of the user initially and maintain the interest of the user long enough till they can explore novel and complex visualizations.

For overall layout in data exploration page:
- Rationale for the layout:
There are mainly three tabs in our website
1. Overview: In this tab we have shown an image stating the common words which were used in news & stories during pendamic. Timeline of the coronavirus. Additionally we have also shown line chart which states the unemployement rate before and after the COVID-19 Outbreak. It's impact on US labor market. Moreover we have also presented a rough idea of the US unemployment history between year 1995-2020.
2. Data Exploration: All our interactive charts are put in this tab to let users better understand the relationship between COVID-19 confirmed cases and the unemployment rate change. We have also drawn maps and lollipop chart in this map which are interactive and alligned with each other. Additionally, we have also shown how when we select the stick of lollipop it chages which region has number of confirmed cases with the sorted unemployment change rate. We also have built a graph which gives the relation between pandemic and labor market.
3. Unemployment Claims: In this tab, we further explore the number of unemployment claims in each state and try to answer the question: “Is the labor market recovering from the impact of the COVID-19?”

## Slide 7,how you optimized the visual queries and user interaction.

Optimize visual queries:
- For line chart:
Input and parse the data only once after the page first rendered, initially, we show the numbers of US newly confirmed cases, US unemployment rate and number of job openings in the whole country. Additionally, we only filterd out a particular row from data when 
  1. User clicks on a state in map 
  2. User picks a state in the drop down list. 
And then the unemployment rate and newly confirmed cases trend of chosen state will be shown in the line chart.

- For lollipop chart: 
We use lollipop instead of bar chart because we need to show the unemployment rate change together with the number of increased confirmed cases in a plot while the unemployment rate change could be negative. By using a lollipop chart, we can let the color of the lollipop candy indicate the +/- of the unemployment rate change, the color scale is the same as the map so user won’t be confused.

- For Map: 
When user hover over the map then the name of the state and the no of the increased rate is shown corresponding to that state.

## Slide 8, Highlight what you have built and with d3 (see Demonstration for a list of required d3 features to include) and other tools including Bootstrap and framework features you used.

Used React to build single page application, d3 Bootstrap for responsive layout and also used Bootstrap for multiple buttons.
Tools and framework features you used:
Technologies used-
- HTML
- CSS
- JS
- D3
- React
- Bootstrap
- AdobeXD

List of required d3 features to include:

- Affordance for interactive elements.
- Making use of Hover-and-click animations.
- Clean UI.
- Simple color palette that is very easy to see.
- Legible and readable text.
- Responsive and Interactive D3 charts.
- Animated Chart.
- Here, we use an animated bar chart which can be used to filter and sort the data according to our requirements.
- We also make use of D3 Maps in our project.

## Slide 9, Explain what you would have done differently.

If we could have more time, we would have collected COVID related policies and announcements of each state, because we found out that policy such as “shelter in place” influences the unemployment rate and the number of jobless claims severely. However, collecting policy data is time consuming, so we couldn’t make it in this time frame. Additionally, we could have Added time series analysis to analyze the relationship between confirmed cases and unemployment rate, because we think that the influence of the COVID to the unemployment rate is not instant, there might exist some time delay. Moreover, the unemployment rate was also affected by the job categories, we could have collected data based on job category and can say which jobs didn’t got affected by COVID-case. For example, how ecommerece wasn't affected by COVID and how flights, travel plans, restaurants were affected. We could have also showed 3-D maps so that it would provide more insights and would-be fancier and would attract more audience. 

## Slide 10, Explain who did what.

Amar and Bolong cleaned the data and converted the data into a suitable and required format for the visualization and identified the required fields for visualization. Che-Pai and Yo Shuan worked on setting up the code base for the visualization. Yo Shuan gave the overview of react to all the team members. Che-Pai and Bolong worked on world map, lollipop chart. Amar worked on data exploration and combined the datasets for finding out the relationship. Bolong used web-scrapping techniques to retreive data from web. Yo Shan worked on  Setting up React framework and routings, Toolbar UI, Infographic in the Overview tab, Line chart in the Data Exploration tab. Che-Pai worked on world maps, lollipop under data dashboard tab. Bolong worked on lollipop chart under data dashboard tab. Che-Pai and Bolong worked together to find the relationship between stick of lollipop and world. Yo Shan worked on Line chart, Donut charts and conclusions in the Unemployment claims tab. Amar and Bolong worked on Presentation, conclusions making Presentation file using sozi. Team Project Homepage making: React, Bootstrap. Che-Pai and Bolong designed thebgraph in data dashboard tab and found relationship between Pandemics and the Labor MArket - United States. Che-Pai worked on map, bubble chart under unemployement claims. Che-Pai, Bolong, Amar and Yo Shan worked on US Labor Market Overview Tab to make the introductory page. Team Project Homepage making: React, Bootstrap. Amar, Yo Shan, Che-Pai, Bolong did research on how others have worked on this topic. Explored John Hopkins webpage and 72 unemployement statistics. Amar, Bolong worked on finding the images for sozi presentation. Amar wrote the transcipts, presentations and paper. Amar, Bolong, Che-Pai and Yo Shan used Git repository and have worked with equal contributions and collaborated well with each other.
