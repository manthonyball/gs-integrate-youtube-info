# gs-integrate-youtube-info
This is a Google App Script Repo for fetching and checking Youtube(Y2) info initiated by the video Id store in GSpreadSheet 

# intention
* originally the G-Spreadsheet is created for storage of the Youtube song list played by Foobar2000 Youtube component
* GAppsScript was developed to check whether the video is wroking against whether in the current local is blocked or some typo 
  
# Prerequisite
1. set-up a Google API for Youtube (YouTube Data API v3) and replace the value of `apiKey`
2. set-up the Google SpreadSheet
    * Col-A - the Y2 video ID i.e. https://www.youtube.com/watch?v=BHlnhRw26FE <- Col-A = BHlnhRw26FE
    * Col-B - [result] the result column, leave empty
    * Col-C - [result] the spreadsheet result with formula `=if(AND(NOT(ISBLANK(A2)),ISBLANK(B2)),"www.youtube.com/watch?v="&A2 , "")`
    * Col-D - [result] the Y2 video title 
    * Cell-G2 - the local of checking i.e. `CA`

# Logic flow 
1. grab the IDs in Col-A
2. filter against criteria (check `filter section`) ^1^
3. make remote call to Y2 API
4. update result 

^1^ for code maintainablity concerns (clean code), each purpose of filtering is encapsulated with one function 

# API reference 
* https://developers.google.com/youtube/v3/docs/videos

## Tricks
If multiple, ?part=part1&part=part2&part=partn 
