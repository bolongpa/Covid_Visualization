# TRANSCRIPT

Topic: Visualization of COVID-19 Impact on US Labor Market

Team name: NinjaV

Team members:

- Amar Nath Jha <jhaa@usc.edu>
    - Story and Goal
- Bolong Pan <bolongpa@usc.edu>
    - Slides
- Yo Shuan Liu <yoshuanl@usc.edu>
    - Introduction and related work
- Che-Pai Kung <chepaiku@usc.edu>
    - Features and Data

---

## Slide 1, Introduction
Our project aims to provide an overview on how the COVID-19 effected the U.S. labor market, and whether or not it is recovering from the impact of COVID-19. 

The unique part of our project is that we not only focus on the trend of unemployment rate over the pandemic months, but also try to answer the question: "Are lost jobs coming back?". In order to achieve our purpose, we will visualize below information together in our project:
1. The confirmed cases of COVID-19
2. The unemployment rate
3. The number of job openings (data Source: https://www.bls.gov/news.release/jolts.t01.htm)

This project addresses to those who want to get an idea of the U.S. unemployment history and the influence of COVID-19 downturn among all states.
And we wish to provide users the insight into the current U.S. labor market through our visualization, and eventually the idea of how the U.S. labor market would go in the near future.

## Slide 2, How to narrate a story with the data 
Any great story means visualization and detail. It takes the small additions of those details to build a picture in someone’s mind to truly make the story complete. The same goes for analytics and data. 
Data is just a collection of numbers until you turn it into a story. Showing reports and dashboards can be overwhelming without adding a narrative to the data. Therefore, any great insight explains what happened, why it is important and how you can use it to turn it into something actionable with the help of visualization. 
In this Project, Data visualization is using data and statistics in creative ways to show patterns and draw conclusions about a hypothesis, or prove theories, that can help the US government and organisations to make logical decisions and drive the business by checking 
how to improve the unemployement rate during this pendamic. Telling a great data-driven story can be useful for both US government as well as
for the people so that they can get the real picture and how can they help each other to find the job.

## Slide 3, Motivation
The motivation behind this visualization is to geographically show the various parameters associated with COVID-19 datasets such as unemployment, unemployment rate by state etc. As we all are aware of the fact that, unemployment is a major concern across the globe and this project aims to visualize different metrics and trends which will help improve the unemployement rate using visualization. The dataset associated with the project is sufficiently detailed and could be used to identify the metrics and trends in the COVID-19 case and thus will help us to improve the unemployement rate.

## Slide 4, Goal
By the end of our project all individuals will be able to visualize the data and will be able to perform exploratory data analysis for COVID-19 dataset. We will be able to build a dashboard on how the infographics are useful to visualize huge sets of data and how to manage those datasets. 
How to use the dataset to improve the unemployement rate and the labor. How individuals can be responsible to help each other to find a job.
Moreover, we will learn how data visualization is helpful to find the relationships between the parameters.

## Slide 5, Related Works and Examples
We found a line chart that visualizes [the U.S. unemployment rate history since year 1929](https://howmuch.net/articles/timeline-united-states-unemployment-history) with important events pointed out on the timeline, we will use the similiar approach to visualize our data.
There is also a world map visualization of [the global rate of unemployment](https://ourworldindata.org/grapher/unemployment-rate?time=earliest..2017) that is equipped with a slide bar that allows user to interact with the map and see the year-over-year trend of unemployment rate.

## Slide 6, Features and Challenges
The data visualization will connect the data with map. When user click the map, the information of that state will show up. Besides, the color of states will be painted based on the value of give category. In addition, line bar charts  will also be used to compare number of COVID-19 cases with unemployment rate. Last, user can specify the time range, then the difference of unemployment will be returned as a sorted bar charts so that we can know which states suffer the most during that period.
As we do not have the experience with map plot, it might be the biggest challenge when building the project.

## Slide 7, Risks
In this project, we wish to find out how COVID-19 affects the job market of each state in the US. However, we know that every state has its own demographic composition and the COVID-19 downturn may have different affects among different groups of workers. Without including the demographic information, it is hard for user to tackle the true causes of why a state has smaller/larger impact on unemployment rate than other states. It will make our plots too dense and complicated though, if we decide to include all necessary information.

## Slide 8, Dataset and Tool
We will use the COVID-19 data sources from [CSSEGISandData/COVID-19](https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data) and unemployment rate by state from [US Local Area Unemployment Statistics](https://www.bls.gov/lau/).

Since we think that policy also affects the society a lot, such as lockdown policy, so we will also specify the important policies in the graph. The information will be from [US Government Response to Coronavirus](https://www.usa.gov/coronavirus)
In this project, we will mainly use JavaScript to build the website, including JQuery and D3 and Inkscape to plot the graphs. In addition, we will use Python to do data collection and preprocessing.

## Slide 9, Data preprocessing
In US Local Area Unemployment Statistics, there are several columns in the file and the data started from 2010. For the main purpose of our project, we will mainly focus on the unemployment, year and period(month) columns. In addition, we only focus on the data that was after 2020 or 2019. 
Regarding COVID-19 dataset, there are columns representing the confirmed, deaths and recovered. Currently, we are planning to concentrate on the confirmed cases, but we will keep other columns for future reference. Besides, we will only get the data from US.
For both datasets, the files are separated by the state or by date. As we plan to draw the time series chart and compare the data between months, we think it will be easier if we can group the data into a file for each dataset or at least by state or by month.

For both datasets, the files are separated by the state or by date. As we plan to draw the time series chart and compare the data between months, we think it will be easier if we can group the data into a file for each dataset or at least by state or by month. These include: 



## Slide 10, Timeline
| Date | Milestone |
|:---:|:---|
|9/28  |Project proposal |
|10/12 |Finished data collection and preprocessing |
|10/19 |Scatch our website design and finalize visualization thoughts |
|11/9  |Test and improve the first version of our visualization website |
|11/16 |Second version of our visualization website |
|11/23 |Deploy our website and final presentation |
