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
- We will visualize the yearly unemployment rate between 2010-2019 and the monthly unemployment rate along with monthly the COVID19 confirmed cases in 2020
- This project addresses to those who want to get an idea of the US labor market before and after the outbreak of COVID-19.
- This issue is important because we need to know how COVID-19 and the following policy actions are impacting the U.S. labor market.

## Slide 2

## Slide 3

## Slide 4

## Slide 5, What others have done on the same topic
- Line chart that visualize the U.S. unemployment rate history since year 1929 with important events pointed out on the timeline.
- Visualization of the global rate of unemployment on a world map.
- Bar chart of weekly unemployment insurance claimed.

## Slide 6
* Important features and designs
    * Connect the data with map. When user click the map, the information of that state will show up. Besides, the color of states will be painted based on the value of give category.
    * Line bar charts that compare number of Covid cases with unemployment rate.
    * User can specify the time range, then the difference of unemployment will be returned as a sorted bar charts so that we can know which states suffer the most during that period.
* Challenges
    * As we do not have the experience with map plot, it might be the biggest challenge when building the project.
## Slide 7

## Slide 8
* We will use the following data sources:
    * Covid Data:  [CSSEGISandData/COVID-19](https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data)
    * Unemployment rate by state: [US Local Area Unemployment Statistics](https://www.bls.gov/lau/)

    Since we think that policy also affects the society a lot, such as lockdown policy, so we will also specify the important policies in the graph.

    * COVID-19 policy actions by state: [US Government Response to Coronavirus](https://www.usa.gov/coronavirus)
* In this project, we will mainly use JavaScript to build the website, including JQuery and D3 and Inkscape to plot the graphs. In addition, we will use Python to do data collection and preprocessing.
## Slide 9
* Some data preprocessing is needed so that it will be more convenient to do the visualizations for the later steps. These include: 
    * Covid Data is separated by date, we will group them into a file or at least by month.
    * The unemployment rate files are separated by states, so we need to combine them together into a file.
    *   Extract important policies regarding Covid, such as lockdown policy.

## Slide 10

