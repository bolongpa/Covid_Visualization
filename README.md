# DSCI 554 Project

## Team

Team name: NinjaV

Team members:

- Amar Nath Jha <jhaa@usc.edu>
- Bolong Pan <bolongpa@usc.edu>
- Che Pai Kung <chepaiku@usc.edu>
- Yo Shuan Liu <yoshuanl@usc.edu>

---

## Artifacts

__🍿  Proposal presentation__ [Transcript](presentations/proposal/TRANSCRIPT.md) | [PDF](presentations/proposal/presentation.pdf)

__🍿  Final presentation__ [Transcript](presentations/final/TRANSCRIPT.md) | [PDF](presentations/final/presentation.pdf)

__📄  Paper__ [Overleaf read only link](https://www.overleaf.com/read/wcfjvtjfkgpf) | [PDF](paper/paper.pdf)

__🎥  Video__ [Transcript](video/TRANSCRIPT.md) | [YouTube link](https://www.youtube.com/watch?v=op_lVUtDX3g&feature=youtu.be)

__🚢  Demo__ [Transcript](video/TRANSCRIPT.md) | [Demo link](http://pdms.usc.edu/dsci-554-projects/project-ninjav/)

---

## Project Summary

Our project is about the confirmed cases of COVID-19, the unemployment rate over the pandemic month, the number of job openings and which states lost the greatest number of jobs (were affected the most during the pandemic). Our project aims to provide an overview on how the COVID-19 affected the U.S. labor market, and whether or not it is recovering from the impact of COVID-19. We implemented multiple kinds of D3 charts as well as Mapbox to explain the relation between the two datasets, which is all embedded in React frame.

## Contributions

## Proposal presentation

- [Amar Nath Jha](mailto:jhaa@usc.edu) is responsible for transcript of "Story and Goal".
- [Bolong Pan](mailto:bolongpa@usc.edu) is responsible for sozi slides.
- [Che Pai Kung](mailto:chepaiku@usc.edu) is responsible for transcript of "Features", "Dataset and Tool", "Data Preprocessing".
- [Yo Shuan Liu](mailto:yoshuanl@usc.edu) is responsible for transcript of "Introduction", "Others Work and Example", "Timeline".

## Final presentation

- [Amar Nath Jha](mailto:jhaa@usc.edu) is responsible for transcript.
- [Bolong Pan](mailto:bolongpa@usc.edu) is responsible for sozi slides.
- [Che Pai Kung](mailto:chepaiku@usc.edu) is responsible for the slide 6 and slide 7.
- [Yo Shuan Liu](mailto:yoshuanl@usc.edu) is responsible for slide 9.

## Paper

- [Amar Nath Jha](mailto:jhaa@usc.edu) is responsible for instruction, data, approach, conclution and references.
- [Bolong Pan](mailto:bolongpa@usc.edu) is responsible for draft paragraph of lollipop chart and setting the report into Overleaf.
- [Che Pai Kung](mailto:chepaiku@usc.edu) is responsible for draft for map and mapbox and reviewing.
- [Yo Shuan Liu](mailto:yoshuanl@usc.edu) is responsible for draft for line chart and reviewing.

## Demo

- [Amar Nath Jha](mailto:jhaa@usc.edu) is responsible for data pre-processing, brainstorm and layout of pages.
- [Bolong Pan](mailto:bolongpa@usc.edu) is responsible for crawling and collecting data and making the lollipop chart and related functions.
- [Che Pai Kung](mailto:chepaiku@usc.edu) made the map chart, word cloud, mapbox, lollipop chart and the interaction functions between each chart.
- [Yo Shuan Liu](mailto:yoshuanl@usc.edu) set up the react framework and UI, drew the infographic in the "Overview" tab, the line chart and the donut charts, and descriptions in the "Unemployment Claims" tab.

### List of visualizations

| Requirement                            | Label        |
| -------------------------------------- | ------------ |
| responsive d3 chart                    | responsive   |
| interactive d3 chart                   | interactive  |
| d3 chart with an animated transition   | animated     |
| d3 layout                              | layout       |
| d3 map                                 | map          |
| Mapbox map                             | mapbox       |

Table 1: Table of minimum requirements, 1 of each category is required.

In Table2, list all the charts and tables in your pages including minimum requirements labels when applicable.

| Page name                             | Chart description                         | Libraries used      | Requirement label |
| ------------------------------------- | ----------------------------------------- | ------------------- | ----------------- |
| Home page - US Labor Market Overview  | word cloud                                | d3, react-d3-cloud  |                   |
|Data Exploration|US map|d3,topojson-client|interactiva,responsive,layout,map|
|Data Exploration|lollipop chart|d3,react-bootstrap|interactiva,responsive,animated|
|Data Exploration|line chart|d3|responsive,animated|
|Unemployment Claims|Mapbox map|d3, mapbox-gl|mapbox|
|Unemployment Claims|Donut chart|d3|layout,responsive|


Table2: Table of visualizations
