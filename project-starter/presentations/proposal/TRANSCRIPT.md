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
We will visualize the yearly unemployment rate between 2010-2019 and the monthly unemployment rate along with monthly the COVID-19 confirmed cases in 2020 among all states in the U.S.
This project addresses to those who want to get an idea of the U.S. unemployment history and the influence of COVID-19 downturn among all states.
We will get the picture of how COVID-19 and the following policy actions are impacting the U.S. labor market.

## Slide 2

## Slide 3

## Slide 4

## Slide 5, What others have done on the same topic
We found a line chart that visualize the U.S. unemployment rate history since year 1929 with important events pointed out on the timeline.
There is also a visualization of the global rate of unemployment on a world map.
Finally, we also found a bar chart of weekly unemployment insurance claimed.

## Slide 6, Features and Challenges
The data visualization will connect the data with map. When user click the map, the information of that state will show up. Besides, the color of states will be painted based on the value of give category. In addition, line bar charts  will also be used to compare number of COVID-19 cases with unemployment rate. Last, user can specify the time range, then the difference of unemployment will be returned as a sorted bar charts so that we can know which states suffer the most during that period.
As we do not have the experience with map plot, it might be the biggest challenge when building the project.

## Slide 7, Risks
In this project, we wish to find out how COVID-19 affects the job market of each state in the US. However, we know that every state has its own demographic composition and the COVID-19 downturn may have different affect among different groups of workers. It is hard to find out the reason of why a state has smaller/larger impact on unemployment rate than other states without including the demographic information. It will make our plots complicated though, if we decided to include all necessary information for user to explore.


## Slide 8, Dataset and Tool
We will use the COVID-19 data sources from [CSSEGISandData/COVID-19](https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data) and unemployment rate by state from [US Local Area Unemployment Statistics](https://www.bls.gov/lau/).

Since we think that policy also affects the society a lot, such as lockdown policy, so we will also specify the important policies in the graph. The information will be from [US Government Response to Coronavirus](https://www.usa.gov/coronavirus)
In this project, we will mainly use JavaScript to build the website, including JQuery and D3 and Inkscape to plot the graphs. In addition, we will use Python to do data collection and preprocessing.
## Slide 9, Data preprocessing
Some data preprocessing is needed so that it will be more convenient to do the visualizations for the later steps. These include: 
First, COVID-19 data are separated by date, we will group them into a file or at least by month.
Second, the unemployment rate files are separated by states, so we need to combine them together into a file.
Last, extract important policies regarding COVID-19, such as lockdown policy, from the news.

## Slide 10, Timeline
| Date | Milestone |
|:---:|:---|
|9/28  |Project proposal |
|10/12 |Finished data collection and preprocessing |
|10/19 |Scatch our website design and finalize visualization thoughts |
|11/9  |Test and improve the first version of our visualization website |
|11/16 |Second version of our visualization website |
|11/23 |Deploy our website and final presentation |
