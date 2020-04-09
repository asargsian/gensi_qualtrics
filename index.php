<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="bootstrap.min.css">
    <script src="jquery.min.js"></script>
  </head>
  <body>
    <script src="d3.v3.min.js" charset="utf-8"></script>
    <script src="jquery-1.11.0.js"></script>
    <script src="trimmed.js.js"></script>

        
    <div class="input-group" display="none" id="name_input" method="get" onsubmit="addFriend()">
      <input type="text" id="friendNameID" name="friendName" class="form-control" placeholder="Naam" size="10">
      <button type="submit" class="btn btn-default" position="inline" value="Enter" onclick="addFriend()">Add
    </div>

    <div class="input-group" display="none" id="userBlackFriends" method="get">
      <form id="userBlFr" display="none">
        <span class="slideText">About how many of your friends are black?</span><br><br>
        <input type="radio" name="uBF" value="none"><span class="questionText">  None</span><br>
        <input type="radio" name="uBF" value="a_few"><span class="questionText">  A few </span><br>
        <input type="radio" name="uBF" value="less_than_half"><span class="questionText">  Less than half</span><br>
        <input type="radio" name="uBF" value="about_half"><span class="questionText">  About half</span><br>
        <input type="radio" name="uBF" value="more_than_half"><span class="questionText">  More than half </span><br>
        <input type="radio" name="uBF" value="most"><span class="questionText">  Most</span><br>
        <input type="radio" name="uBF" value="all"><span class="questionText">  All</span>
      </form>
    </div>

    <div class="input-group" display="none" id="whiteFriendsBlackFriends" method="get">
      <form id="whFrBlFr" display="none">
        <span class="slideText">About how many of your white friends do you think have friends who are black?</span><br><br>
        <input type="radio" name="wFBF" value="none"><span class="questionText">  None</span><br>
        <input type="radio" name="wFBF" value="a_few"><span class="questionText">  A few </span><br>
        <input type="radio" name="wFBF" value="less_than_half"><span class="questionText">  Less than half</span><br>
        <input type="radio" name="wFBF" value="about_half"><span class="questionText">   About half</span><br>
        <input type="radio" name="wFBF" value="more_than_half"><span class="questionText">  More than half</span><br>
        <input type="radio" name="wFBF" value="most"><span class="questionText"> Most</span><br>
        <input type="radio" name="wFBF" value="all"><span class="questionText">  All</span>
      </form>
    </div>


    <div class="input-group" display="none" id="blackFriends" method="get">
      <form id="haveBlackFriends">
        <input type="radio" class="slideText" name="haveBlackFriends" value="yes"> Yes<br>
        <input type="radio" name="haveBlackFriends" value="no"> No
      </form>
    </div>
    
    <div class="input-group no-wrap" display="none" id="friendsFriends" method="get">
      <form id="friendsBlackFriends" display="none">
      <input type="radio" name="friendsBlackFriends" value="all"><span class="questionText"> Yes, with all of his/her black friends</span><br>
        <input type="radio" name="friendsBlackFriends" value="most"><span class="questionText"> Yes, with most of his/her black friends</span><br>
        <input type="radio" name="friendsBlackFriends" value="half"><span class="questionText"> Yes, with about half of his/her black friends</span><br>
        <input type="radio" name="friendsBlackFriends" value="a_few"><span class="questionText"> Yes, with a few of his/her black friends</span><br>
        <input type="radio" name="friendsBlackFriends" value="none"><span class="questionText"> No </span>
      </form>
    </div>
    <div class="input-group no-wrap" display="none" id="knowFriends" method="get">
      <form id="knowBlackFriends" display="none">
        <input type="radio" name="knowBlackFriends" value="all"><span class="questionText"> Yes, with all of them</span><br>
        <input type="radio" name="knowBlackFriends" value="most"><span class="questionText"> Yes, with most of them</span><br>
        <input type="radio" name="knowBlackFriends" value="half"><span class="questionText"> Yes, with about half of them</span><br>
        <input type="radio" name="knowBlackFriends" value="a_few"><span class="questionText"> Yes, with a few of them</span><br>
        <input type="radio" name="knowBlackFriends" value="none"><span class="questionText"> No </span>
      </form>
    </div>
    <div class="input-group no-wrap" display="none" id="seeFriends" method="get">
      <form id="seeBlackFriends">
        <input type="radio" name="seeBlackFriends" value="often"><span class="questionText"> Often</span><br>
        <input type="radio" name="seeBlackFriends" value="on_a_regular_basis"><span class="questionText"> On a regular basis</span><br>
        <input type="radio" name="seeBlackFriends" value="sometimes"><span class="questionText"> Sometimes</span><br>
        <input type="radio" name="seeBlackFriends" value="rarely"><span class="questionText"> Rarely</span><br>
        <input type="radio" name="seeBlackFriends" value="never"><span class="questionText"> Never</span>
      </form>
    </div>

    <div class="popop_box" id="nonresponse_box">
      <div class="popup_box" id="popup">
            <p class="popup_text">We noticed that you didn’t answer this question. It would very helpful for our research if you did. Please feel free to either give an answer or to go to the next question by clicking ‘Next’ again.</p>
            <button class="btn btn-default" onclick="closePopup()">Close</button>
      </div>
    </div>

    <div class="popop_box" id="onlyone_box">
      <div class="popup_box" id="onlyOnePopup">
            <p class="popup_text">Enter only one name at once.</p>
            <button class="btn btn-default" onclick="closeOnlyOnePopup()">Close</button>
      </div>
    </div>

    <div class="popop_box" id="fewFriends_box">
      <div class="popup_box" id="friendPopup">
            <p class="popup_text">You have not entered 5 people. Are you sure that there is no one else with whom you discuss important matters? If so, please click ‘Next’ to continue. If there is someone else, please enter the name and click ‘add person’.</p>
            <button class="btn btn-default" onclick="closeFriendPopup()">Close</button>
      </div>
    </div>

    <div class="popop_box" id="fewDragged_box">
      <div class="popup_box" id="dragPopup">
            <p class="popup_text">You have not answered this question for every person in your network. It would very helpful for our research if you did. Please feel free to either give an answer or to go to the next question by clicking ‘Next’ again.”.</p>
            <button class="btn btn-default" onclick="closeDragPopup()">Close</button>
      </div>
    </div>

    <div class="input-group" display="none" id="whiteWarmth" method="get">
      <form id="wWarmth" display="none">
        <span class="slideText">How would you describe your feelings toward black people in general? The closer you choose an answer to a word, the better the word describes your feelings:</span><br><br>
          <ul class="likert">
            <ul class="likert-row">
              <li class="likert-label">Negative</li>
              <div>
              <li class="likert-button">1 <input type="radio" name="wnegpos" value="1" /></li>
              <li class="likert-button">2 <input type="radio" name="wnegpos" value="2" /></li>
              <li class="likert-button">3 <input type="radio" name="wnegpos" value="3" /></li>
              <li class="likert-button">4 <input type="radio" name="wnegpos" value="4" /></li>
              <li class="likert-button">5 <input type="radio" name="wnegpos" value="5" /></li>
              <li class="likert-button">6 <input type="radio" name="wnegpos" value="6" /></li>
              <li class="likert-button">7 <input type="radio" name="wnegpos" value="7" /></li>
              </div>
              <li class="likert-label">Positive</li>
            </ul>
            <ul class="likert-row">
              <li class="likert-label">Friendly</li>
              <div>
              <li class="likert-button">1 <input type="radio" name="wvrivij" value="1" /></li>
              <li class="likert-button">2 <input type="radio" name="wvrivij" value="2" /></li>
              <li class="likert-button">3 <input type="radio" name="wvrivij" value="3" /></li>
              <li class="likert-button">4 <input type="radio" name="wvrivij" value="4" /></li>
              <li class="likert-button">5 <input type="radio" name="wvrivij" value="5" /></li>
              <li class="likert-button">6 <input type="radio" name="wvrivij" value="6" /></li>
              <li class="likert-button">7 <input type="radio" name="wvrivij" value="7" /></li>
              </div>
              <li class="likert-label">Hostile</li>
            </ul>
            <ul class="likert-row">
              <li class="likert-label">Suspicious</li>
              <div>
              <li class="likert-button">1 <input type="radio" name="wwanver" value="1" /></li>
              <li class="likert-button">2 <input type="radio" name="wwanver" value="2" /></li>
              <li class="likert-button">3 <input type="radio" name="wwanver" value="3" /></li>
              <li class="likert-button">4 <input type="radio" name="wwanver" value="4" /></li>
              <li class="likert-button">5 <input type="radio" name="wwanver" value="5" /></li>
              <li class="likert-button">6 <input type="radio" name="wwanver" value="6" /></li>
              <li class="likert-button">7 <input type="radio" name="wwanver" value="7" /></li>
              </div>
              <li class="likert-label">Trusting</li>
            </ul>
          </ul>
      </form>
    </div>

    <div class="input-group" display="none" id="blackWarmth" method="get">
      <form id="bWarmth" display="none">
        <span class="slideText">How would you describe your feelings toward white people in general? The closer you choose an answer to a word, the better the word describes your feeling:</span><br><br>
          <ul class="likert">
            <ul class="likert-row">
              <li class="likert-label">Negative</li>
              <div>
              <li class="likert-button">1 <input type="radio" name="bnegpos" value="1" /></li>
              <li class="likert-button">2 <input type="radio" name="bnegpos" value="2" /></li>
              <li class="likert-button">3 <input type="radio" name="bnegpos" value="3" /></li>
              <li class="likert-button">4 <input type="radio" name="bnegpos" value="4" /></li>
              <li class="likert-button">5 <input type="radio" name="bnegpos" value="5" /></li>
              <li class="likert-button">6 <input type="radio" name="bnegpos" value="6" /></li>
              <li class="likert-button">7 <input type="radio" name="bnegpos" value="7" /></li>
              </div>
              <li class="likert-label">Positive</li>
            </ul>
            <ul class="likert-row">
              <li class="likert-label">Friendly</li>
              <div>
              <li class="likert-button">1 <input type="radio" name="bvrivij" value="1" /></li>
              <li class="likert-button">2 <input type="radio" name="bvrivij" value="2" /></li>
              <li class="likert-button">3 <input type="radio" name="bvrivij" value="3" /></li>
              <li class="likert-button">4 <input type="radio" name="bvrivij" value="4" /></li>
              <li class="likert-button">5 <input type="radio" name="bvrivij" value="5" /></li>
              <li class="likert-button">6 <input type="radio" name="bvrivij" value="6" /></li>
              <li class="likert-button">7 <input type="radio" name="bvrivij" value="7" /></li>
              </div>
              <li class="likert-label">Hostile</li>
            </ul>
            <ul class="likert-row">
              <li class="likert-label">Suspicious</li>
              <div>
              <li class="likert-button">1 <input type="radio" name="bwanver" value="1" /></li>
              <li class="likert-button">2 <input type="radio" name="bwanver" value="2" /></li>
              <li class="likert-button">3 <input type="radio" name="bwanver" value="3" /></li>
              <li class="likert-button">4 <input type="radio" name="bwanver" value="4" /></li>
              <li class="likert-button">5 <input type="radio" name="bwanver" value="5" /></li>
              <li class="likert-button">6 <input type="radio" name="bwanver" value="6" /></li>
              <li class="likert-button">7 <input type="radio" name="bwanver" value="7" /></li>
              </div>
              <li class="likert-label">Trusting</li>
            </ul>
          </ul>
      </form>
    </div>

    <div id="NextDiv">
      <input type="button" 
        class="btn btn-default" 
        value="Next"
        id="Next"
        onclick="showNext()" />
    </div>
    
    <div id="submitForm">
      <form id="customapplication" action="" method="post">
        <input type="hidden" name="sh" value=""/>
        <input type="hidden" name="lsi" value=""/>
        <input type="hidden" name="pli" value=""/>
        <input type="hidden" name="spi" value=""/>
        <input type="hidden" name="aqi" value=""/>
        <input type="hidden" name="cqi" value=""/>
        <input type="hidden" name="KeyValue" value=""/>
        <input type="hidden" name="InterviewID" value=""/>
        <input type="hidden" name="Lmr" value=""/>
        <input type="hidden" name="" value=""/>
        <input type="hidden" name="" id="qu1_id" value=""/>
        <input type="hidden" id="nomem" name="nomem" value=""/>
        <input name="" id="submitButton" class="btn btn-default" type="submit" value="Next"/>
      </form>
    </div>
    
    <script type="text/javascript">
        jQuery("#Next").css("left",window.innerWidth * .8);
        jQuery("#submitButton").css("left",window.innerWidth * .8);
    </script>
  </body>
</html>
