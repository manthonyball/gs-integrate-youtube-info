//main-checkAvailable
function main() {
    const constantSheet = SpreadsheetApp.getActive().getSheetByName('song-list');
    const lastRowParam = constantSheet.getLastRow();
    const range_local = constantSheet.getRange("g2"); // g2 is where the local stsring is put
    const localString = range_local.getValue();
    const r = constantSheet.getRange("A2:D" + lastRowParam);
    const result = r.getValues();

    result.map((row, idx)=>
    {
        let id = row[0];
        let desp = row[3]; 
        //Logger.log(id+":"+desp+":"+idx)
        return [id,desp,idx+2];
    })
    .filter(filterOutEmptyId)
    .filter(filterOutNonEmptyDesp)
    .forEach((row) => {
      let id = row[0]; 
        let resultFromJson = JSON.parse(makeWebRequest(id));
        if (!resultFromJson)
            return;
        // spreadsheet row idx
        let rowIdx = row[2]; 

        //below the logic to update the sheet
        let cellAvailable = constantSheet.getRange("B" + rowIdx);
        let cellTitle = constantSheet.getRange("D" + rowIdx);
        let totalResults = resultFromJson.pageInfo.totalResults;
        let blockedRegionList = resultFromJson.items[0]?.contentDetails.regionRestriction?.blocked;
        let isBlockedinLocal = blockedRegionList?.some(local => local == localString);
        let isAvailable = totalResults > 0 && !isBlockedinLocal;

        //set the song available result
        if (totalResults == 0)
            cellAvailable.setValue("Not found");
        else if (isBlockedinLocal)
            cellAvailable.setValue("cannot play video in current local");

        //set the song title
        if (isAvailable)
            cellTitle.setValue(resultFromJson.items[0]?.snippet.title);

    });
}
function makeWebRequest(id) {
    const apiKey = '_your_google_api_id'; // set-up!!!

    let requestURL =
        'https://www.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&key=' + apiKey + '&id=' + id;
    //Logger.log(requestURL)

    try {
        const response = UrlFetchApp.fetch(requestURL, {
            method: 'get',
            muteHttpExceptions: true, // this will not throw http exception , catch block is not for http
        });
        const responseCode = parseInt(response.getResponseCode());

        if (responseCode !== 200)
            return false;

        return response.getContentText();

    } catch (e) {
        console.log(e);
        return false;
    }
}
//filter section
function filterOutNonEmptyDesp(i){ 
  return i[1]?false:true;
}
function filterOutEmptyId(i){ 
  return i[0]?true:false;
}