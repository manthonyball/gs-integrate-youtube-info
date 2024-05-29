# gs-integrate-youtube-info
This is a Google App Script Repo for fetching and checking Youtube(Y2) info 

# Intention
* originally the G-Spreadsheet is created for storage of the Youtube song list played by Foobar2000 Youtube component
* gAppsScript was developed to check whether the video is wroking against whether it is blocked in the current local or some typo for the ID
  
# Set up 
1. set-up a Google API for Youtube (YouTube Data API v3) and replace the value in `apiKey`
2. set-up the Google SpreadSheet
    * Col-A - the Y2 video ID i.e. https://www.youtube.com/watch?v=BHlnhRw26FE <- Col-A = BHlnhRw26FE
    * Cell-G2 - the local of checking i.e. `CA`

# Result  
* Col-B - [result] leave empty if no issue found
* Col-C - [result] auto. populate result with formula `=if(AND(NOT(ISBLANK(A2)),ISBLANK(B2)),"www.youtube.com/watch?v="&A2 , "")`
* Col-D - [result] auto. populate the Y2 video title 

# Logic flow 
1. grab the IDs in Col-A
2. filter against criterias (check `filter section`) ^1^
3. make the remote call to Y2 API
4. update result in Col-C && Col-D 

^1^ for a better code maintainablity (clean code), each purpose of filter is encapsulated by one filter function 

# API reference 
* https://developers.google.com/youtube/v3/docs/videos

## Tricks
If multiple, ?part=part1&part=part2&part=partn 
