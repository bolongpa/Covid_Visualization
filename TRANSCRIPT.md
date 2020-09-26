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

## Slide 1
* What is your visualization about?
    * Yearly unemployment rate between 2010-2019
    * Monthly unemployment rate in 2020 (see the impact of COVID)
* Who is it addressed to?
    * Those who want to get an idea of the US labor market before/after COVID breaks out.
    * Policy maker who seeks to increase the employment rate.
* Who is it addressed to?
    * We need to know how COVID-19 and the following policy actions are impacting the U.S. labor market.

## Slide 2
* Story with data
    * Data is just a collection of numbers until you turn it into a story. 
    * Showing reports and dashboards can be overwhelming without adding a narrative to the data. 
    * Any great insight explains what happened, why it is important and how you can use it to turn it into something actionable. 
    * Data visualization is using data and statistics in creative ways to show patterns and draw conclusions about a hypothesis, or prove theories, that can help drive decisions in the organisation           

## Slide 3
* Motivation
    * The motivation behind this visualization is to geographically show the various parameters associated with COVID-19 datasets such as unemployment, unemployment rate by state etc.
    * Additionally, unemployment is a major concern across the globe and this project aims to visualize different metrics and trends. 
    * The dataset associated with the project is sufficiently detailed and could be used to identify the metrics and trends in the COVID-19 case.

## Slide 4
* Goal
    * By the end of our project all individuals will be able to visualize the data and will be able to perform exploratory data analysis
    * Would be able to build a dashboard on how the infographics are useful to visualize huge sets of data 
    * How data visualization is helpful to find the relationships between the parameters.

## Slide 5

## Slide 6

## Slide 7
* Important features and designs
    * Connect the data with map. When user click the map, the information of that state will show up. Besides, the color of states will be painted based on the value of give category.
    * Line bar charts that compare number of Covid cases with unemployment rate.
    * User can specify the time range, then the difference of unemployment will be returned as a sorted bar charts so that we can know which states suffer the most during that period.
* Challenges
    * As we do not have the experience with map plot, it might be the biggest challenge when building the project.
## Slide 8
* We will use the following data sources:
    * Covid Data:  [CSSEGISandData/COVID-19](https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data)
    * Unemployment rate by state: [US Local Area Unemployment Statistics](https://www.bls.gov/lau/)

    Since we think that policy also affects the society a lot, such as lockdown policy, so we will also specify the important policies in the graph.

    * COVID-19 policy actions by state: [US Government Response to Coronavirus](https://www.usa.gov/coronavirus)
* Tools:
    * JavaScript/Jquery/D3
    * Inkscape
    * Python
## Slide 9
* Data Preprocessing:
    * Covid Data is separated by date, to make is easier to retrieve data, we will group them into a file or at least by month.
    * The unemployment rate files are separated by states, so we need to combine them together into a file.
    *   Extract important policies regarding Covid, such as lockdown policy.

## Slide 10

