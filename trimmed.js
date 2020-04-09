<script type="text/javascript">

  // Prevent window close
  var hook = true;
  window.onbeforeunload = function() {
    if (hook) {       
      return "Are you sure that you want to end this survey? All of your answers will be lost.";
    }
  }
  function unhook() {
    hook=false;
  }
  
  var bodyWidth = $(document).width();
  var bodyHeight = $(document).height() - 20;
  if (bodyWidth < 800) bodyWidth = 800;
  if (bodyHeight < 750) bodyHeight = 750;
  var center = bodyWidth / 2;
  var middle = bodyHeight / 200;
  
  var textWidth = 800;
  var text_offset_top = 60;
  var title_offset_top = 70;
  var lineHeight = 18;
  
  var q_window_width = 100,
      q_window_height = 100,
      backdrop_width = 500;

  // left and top values for individual questions
  var question_lnum = center - (textWidth / 2);
  var string_l = question_lnum.toString();
  var string_t = "200px";
  var string_r_t = "45%",
      q_margin_top = 200,
      q_margin_top_str = q_margin_top.toString();

  // bar with boxes for answers
  var boxbar_margin = 10,
      boxbar_label_margin = 3,
      bar_target_height = 100,
      bar_target_width = ((bodyWidth - (boxbar_margin * 4) - 20) / 5),
      bar4_target_width = ((bodyWidth - (boxbar_margin * 3) - 20) / 4),
      bar5_target_width = ((bodyWidth - (boxbar_margin * 4) - 20) / 5),
      bar6_target_width = ((bodyWidth - (boxbar_margin * 5) - 20) / 6),
      bar_label_height = 25,
      boxbar_offset_x = 10,
      boxbar_offset_y = bodyHeight - bar_target_height - 100;

  var currSlide = 1;
  var numFriends = 0;
  var askedAbout = 0;
  var numAsked = 1;
  var lastAnswered = 0;
  var numOther = 0;
  var checked = false;
  var skipped = false;
  var currNode = null;
  var haveFriends = document.getElementById("blackFriends"),
      friendFriends = document.getElementById("friendsBlackFriends"),
      knowFriends = document.getElementById("knowBlackFriends"),
      seeFriends = document.getElementById("seeFriends");
  var nodeColor = '#9CD4D4',
      femaleColor = '#FFCCFF';

  var startTime;
  var results = [];
  
  //--------------------------------
  // Declaration of graph properties
  //--------------------------------

  var svg = d3.select("body").append("svg")
    .attr("width", bodyWidth)
    .attr("height", bodyHeight)
    .on("contextmenu", function() {d3.event.preventDefault()});

  var force = d3.layout.force()
    .size([bodyWidth, bodyHeight])
    .nodes([{x:bodyWidth / 2, 
              y:bodyHeight / 2.2, 
              fixed: true, 
              name:"You", 
              id:0, 
              gender:"", 
              age:0,
              race:"",
              religion:"", 
              surveyTime:0,
              sawStats:false,
              edu:null, 
              freq:null,
              friendsWith:"",
              haveBlackFriends:"",
              friendsBlackFriends:"",
              knowBlackFriends:"",
              seeBlackFriends:"",
              enjoy:"",
              like:"",
              interest:"",
              motivation:""}]) // initialize with a single node
    .linkDistance(100)
    .charge(-1500)
    .on("tick", tick);
    
  var nodes = force.nodes(),
      links = force.links(),
      node = svg.selectAll(".node"),
      link = svg.selectAll(".link");

  //--------------------------------
  // Declaration of slides and boxes
  //--------------------------------

  // Slide 0
  
  // Catch Internet Explorer users; incompatible browser
  if (isIE()) {
    var slide_0 = d3.select("svg").append("g")
      .attr("id", "slide0");
    slide_0.append("rect")
      .style("fill", "white")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", bodyWidth)
      .attr("height", bodyHeight);
    slide_0.append("text")
      .attr("class", "lead")
      .text("Your browser is not supported.")
      .attr("x", center - 170)
      .attr("y", title_offset_top);
    slide_0.append("text")
      .attr("class", "slideText")
      .attr("x", center - textWidth / 2)
      .attr("y", text_offset_top + title_offset_top + lineHeight)
      .text("Please us a different browser for this survey.")
      .call(wrap, textWidth);
    document.getElementById("Next").style.display="none";
  } else {
    var slide_0 = d3.select("svg").append("g")
      .attr("id", "slide0");
    slide_0.append("rect")
      .style("fill", "white")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", bodyWidth)
      .attr("height", bodyHeight);
    slide_0.append("text")
      .attr("class", "lead")
      .text("")
      .attr("x", center - 170)
      .attr("y", title_offset_top);
    slide_0.append("text")
      .attr("class", "slideText")
      .attr("x", center - textWidth / 2)
      .attr("y", text_offset_top + title_offset_top + lineHeight)
      .text("This is a survey about social relations.")
      .call(wrap, textWidth);
    slide_0.append("text")
      .attr("class", "slideText")
      .attr("x", center - textWidth / 2)
      .attr("y", text_offset_top + title_offset_top + lineHeight * 4)
      .text("It is not possible to move back to an earlier question.")
      .call(wrap, textWidth);
    slide_0.append("text")
      .attr("class", "slideText")
      .attr("x", center - textWidth / 2)
      .attr("y", text_offset_top + title_offset_top + lineHeight * 8)
      .text("Completing this survey takes about five minutes. Please make sure to not leave the page before all questions have been answered.")
      .call(wrap, textWidth);
  }
  
  // Slide 3       

  var slide_3 = d3.select("svg").append("g")
    .attr("id", "slide3");
  slide_3.append("rect") 
    .style("fill", "white")
    .attr("class", "slide")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", bodyWidth)
    .attr("height", bodyHeight);
  slide_3.append("text")
    .attr("class", "slideText")
    .attr("x", center - (textWidth / 2))
    .attr("y", text_offset_top)
    .text("The following questions are about people with whom you discuss important matters.")
    .call(wrap, textWidth);
  slide_3.append("text")
    .attr("class", "slideText")
    .attr("x", center - (textWidth / 2))
    .attr("y", text_offset_top + lineHeight * ($('#slide3 .slideText tspan').length + $('#slide3 .slideText').length-1))
    .text("From time to time, most people discuss important matters with other people. Looking back over the last six months, who are the people with whom you discussed matters important to you? Just tell me their first names or initials.")
    .call(wrap, textWidth);
  slide_3.append("text")
    .attr("class", "slideText")
    .attr("id", "one_at_a_time")
    .attr("x", center - (textWidth / 2))
    .attr("y", text_offset_top + lineHeight * ($('#slide3 .slideText tspan').length + $('#slide3 .slideText').length-1))
    .text("You can name up to 5 people with whom you discuss important matters. Click on their names to toggle gender.")
    .call(wrap, textWidth);
  var textheight = $('#slide3 .slideText tspan').length + $('#slide3 .slideText').length;
  slide_3.append("text")
    .attr("class", "slideText")
    .attr("id", "first_friend_text")
    .attr("x", center - (textWidth / 2))
    .attr("y", text_offset_top + lineHeight * textheight)
    .text("What is the name or are the initials of the person you discuss important matters with?")
    .call(wrap, textWidth);
  slide_3.append("text")
    .attr("class", "slideText")
    .attr("id", "second_friend_text")
    .attr("x", center - (textWidth / 2))
    .attr("y", text_offset_top + lineHeight * textheight)
    .style("stroke", "none")
    .style("fill", "red")
    .text("Is there another person with whom you discuss important matters? Please enter his or her name or initials.")
    .call(wrap, textWidth)
    .attr("display", "none");
  slide_3.append("text")
    .attr("class", "slideText")
    .attr("id", "final_friend_text")
    .attr("x", center - (textWidth / 2))
    .attr("y", text_offset_top + lineHeight * textheight)
    .style("stroke", "none")
    .style("fill", "red")
    .text("Thank you for entering these names or initials. Please click \"Next\" to continue.")
    .call(wrap, textWidth)
    .attr("display", "none");
  slide_3.style("display", "none");
          
  // Slide 4

  var slide_4 = d3.select("svg").append("g")
    .attr("id", "slide4");
  slide_4.append("rect") 
    .style("fill", "white")
    .attr("class", "slide")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", bodyWidth)
    .attr("height", bodyHeight);
  slide_4.append("text")
    .attr("class", "slideText numfri")
    .attr("x", center - (textWidth / 2))
    .attr("y", text_offset_top)
    .text("We will now ask a number of questions about these people.")
    .call(wrap, textWidth);
  slide_4.style("display", "none");
        
  // Slide 5
     
  var slide_5 = d3.select("svg").append("g")
    .attr("id", "slide5");
  slide_5.append("rect") 
    .style("fill", "white")
    .attr("class", "slide")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", bodyWidth)
    .attr("height", bodyHeight);
  slide_5.append("text")
    .attr("class", "slideText numfri1")
    .attr("x", center - (textWidth / 2))
    .attr("y", text_offset_top)
    .text("How close is your relationship with each person?")
    .call(wrap, textWidth);
  slide_5.append("text")
    .attr("class", "slideText numfri2")
    .attr("x", center - (textWidth / 2))
    .attr("y", text_offset_top + lineHeight * ($('#slide5 .slideText tspan').length + $('#slide5 .slideText').length-1))
    .text("Drag the circles with the names of each person into the box below that indicates how close your relationship is.")
    .call(wrap, textWidth);
  slide_5.style("display", "none");
    
  // Slide 6

  var slide_6 = d3.select("svg").append("g")
    .attr("id", "slide6");
  slide_6.append("rect") 
    .style("fill", "white")
    .attr("class", "slide")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", bodyWidth)
    .attr("height", bodyHeight);
  slide_6.append("text")
    .attr("class", "slideText")
    .attr("x", center - (textWidth / 2))
    .attr("y", text_offset_top)
    .text("Which of these people know each other?") 
    .call(wrap, textWidth);
  slide_6.append("text")
    .attr("class", "slideText")
    .attr("x", center - (textWidth / 2))
    .attr("y", text_offset_top + lineHeight * ($('#slide6 .slideText tspan').length + $('#slide6 .slideText').length-1))
    .text("To indicate that two persons know each other, click on the name of the first person and then on the name of the second person. This will create a line between the two.")
    .call(wrap, textWidth);
  slide_6.append("text")
    .attr("class", "slideText")
    .attr("x", center - (textWidth / 2))
    .attr("y", text_offset_top + lineHeight * ($('#slide6 .slideText tspan').length + $('#slide6 .slideText').length-1))
    .text("Please create lines between all persons who know each other. Click \"Next\" when you are done.")
    .call(wrap, textWidth);
  slide_6.append("text")
    .attr("class", "slideText")
    .attr("x", center - (textWidth / 2))
    .attr("y", text_offset_top + lineHeight * ($('#slide6 .slideText tspan').length + $('#slide6 .slideText').length-1))
    .text("If you created an incorrect line by accident, you can remove it with a right click of your mouse.")
    .call(wrap, textWidth);
  slide_6.style("display", "none");

  // Slide 7
  
  var slide_7 = d3.select("svg").append("g")
    .attr("id", "slide7")
    .style("display", "none")
  slide_7.append("rect") 
    .style("fill", "white")
    .attr("class", "slide")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", bodyWidth)
    .attr("height", bodyHeight)
  slide_7.append("text")
    .attr("class", "slideText numfri")
    .attr("x", center - (textWidth / 2))
    .attr("y", text_offset_top)
    .text("We will now ask a couple of questions about the friends of these people. Please click \"Next\" to continue.")
    .call(wrap, textWidth)
    
  // Boxes indicating frequency into which nodes are dragged (4, 5 or 6 categories)
  
  var fourBar = d3.select("svg").append("g")
    .attr("id", "fourBar")
    .style("display", "none");

  fourBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "several")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x)
    .attr("y", boxbar_offset_y)
    .attr("width", bar4_target_width)
    .attr("height", bar_target_height);

  fourBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "daily")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + bar4_target_width + boxbar_margin)
    .attr("y", boxbar_offset_y)
    .attr("width", bar4_target_width)
    .attr("height", bar_target_height);

  fourBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "multiple")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar4_target_width + boxbar_margin) * 2)
    .attr("y", boxbar_offset_y)
    .attr("width", bar4_target_width)
    .attr("height", bar_target_height);

  fourBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "weekly")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar4_target_width + boxbar_margin) * 3)
    .attr("y", boxbar_offset_y)
    .attr("width", bar4_target_width)
    .attr("height", bar_target_height);

  var fiveBar = d3.select("svg").append("g")
    .attr("id", "fiveBar")
    .style("display", "none")

  fiveBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "one")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x)
    .attr("y", boxbar_offset_y)
    .attr("width", bar_target_width)
    .attr("height", bar_target_height);

  fiveBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "one_lab")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar_target_width)
    .attr("height", bar_label_height);

  fiveBar.append("text")
    .attr("class", "bar_text")
    .text("")
    .attr("x", boxbar_offset_x + (bar_target_width / 2) - 28)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);

  fiveBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "two")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + bar_target_width + boxbar_margin)
    .attr("y", boxbar_offset_y)
    .attr("width", bar_target_width)
    .attr("height", bar_target_height);

  fiveBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "two_lab")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + bar_target_width + boxbar_margin)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar_target_width)
    .attr("height", bar_label_height); 

  fiveBar.append("text")
    .attr("class", "bar_text")
    .text("")
    .attr("x", boxbar_offset_x + bar_target_width + boxbar_margin + (bar_target_width / 2) - 25)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);

  fiveBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "three")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar_target_width + boxbar_margin) * 2)
    .attr("y", boxbar_offset_y)
    .attr("width", bar_target_width)
    .attr("height", bar_target_height);

  fiveBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "three_lab")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar_target_width + boxbar_margin) * 2)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar_target_width)
    .attr("height", bar_label_height);

  fiveBar.append("text")
    .attr("class", "bar_text")
    .text("")
    .attr("x", boxbar_offset_x + (bar_target_width + boxbar_margin) * 2 + (bar_target_width / 2) - 23)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);

  fiveBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "four")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar_target_width + boxbar_margin) * 3)
    .attr("y", boxbar_offset_y)
    .attr("width", bar_target_width)
    .attr("height", bar_target_height);

  fiveBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "four_lab")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar_target_width + boxbar_margin) * 3)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar_target_width)
    .attr("height", bar_label_height);

  fiveBar.append("text")
    .attr("class", "bar_text")
    .text("")
    .attr("x", boxbar_offset_x + (bar_target_width + boxbar_margin) * 3 + (bar_target_width / 2) - 20)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);

  fiveBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "five")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar_target_width + boxbar_margin) * 4)
    .attr("y", boxbar_offset_y)
    .attr("width", bar_target_width)
    .attr("height", bar_target_height);

  fiveBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "five_lab")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar_target_width + boxbar_margin) * 4)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar_target_width)
    .attr("height", bar_label_height);

  fiveBar.append("text")
    .attr("class", "bar_text")
    .text("") 
    .attr("x", boxbar_offset_x + (bar_target_width + boxbar_margin) * 4 + (bar_target_width / 2) - 15)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);

  var sixBar = d3.select("svg").append("g")
    .attr("id", "sixBar")
    .style("display", "none")

  sixBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "one")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x)
    .attr("y", boxbar_offset_y)
    .attr("width", bar6_target_width)
    .attr("height", bar_target_height);

  sixBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "one_lab")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar6_target_width)
    .attr("height", bar_label_height);

  sixBar.append("text")
    .attr("class", "bar_text")
    .text("Family member")
    .attr("x", boxbar_offset_x + (bar6_target_width / 2) - 42)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);

  sixBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "two")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + bar6_target_width + boxbar_margin)
    .attr("y", boxbar_offset_y)
    .attr("width", bar6_target_width)
    .attr("height", bar_target_height);

  sixBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "two_lab")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + bar6_target_width + boxbar_margin)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar6_target_width)
    .attr("height", bar_label_height); 

  sixBar.append("text")
    .attr("class", "bar_text")
    .text("Friend")
    .attr("x", boxbar_offset_x + bar6_target_width + boxbar_margin + (bar6_target_width / 2) - 20)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);

  sixBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "three")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar6_target_width + boxbar_margin) * 2)
    .attr("y", boxbar_offset_y)
    .attr("width", bar6_target_width)
    .attr("height", bar_target_height);

  sixBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "three_lab")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar6_target_width + boxbar_margin) * 2)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar6_target_width)
    .attr("height", bar_label_height);
  
  sixBar.append("text")
    .attr("class", "bar_text")
    .text("Co-worker")
    .attr("x", boxbar_offset_x + (bar6_target_width + boxbar_margin) * 2 + (bar6_target_width / 2) - 33)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);
 
  sixBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "four")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar6_target_width + boxbar_margin) * 3)
    .attr("y", boxbar_offset_y)
    .attr("width", bar6_target_width)
    .attr("height", bar_target_height);

  sixBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "four_lab")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar6_target_width + boxbar_margin) * 3)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar6_target_width)
    .attr("height", bar_label_height);

  sixBar.append("text")
    .attr("class", "bar_text")
    .text("Neighbor")
    .attr("x", boxbar_offset_x + (bar6_target_width + boxbar_margin) * 3 + (bar6_target_width / 2) - 25)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);

  sixBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "five")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar6_target_width + boxbar_margin) * 4)
    .attr("y", boxbar_offset_y)
    .attr("width", bar6_target_width)
    .attr("height", bar_target_height);

  sixBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "five_lab")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar6_target_width + boxbar_margin) * 4)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar6_target_width)
    .attr("height", bar_label_height);

  sixBar.append("text")
    .attr("class", "bar_text")
    .text("Member of the same social group/club") 
    .attr("x", boxbar_offset_x + (bar6_target_width + boxbar_margin) * 4 + (bar6_target_width / 2) - 118 )
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);

  sixBar.append("rect")
    .attr("class", "bar_target")
    .attr("id", "six")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar6_target_width + boxbar_margin) * 5)
    .attr("y", boxbar_offset_y)
    .attr("width", bar6_target_width)
    .attr("height", bar_target_height);

  sixBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "six_lab")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar6_target_width + boxbar_margin) * 5)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar6_target_width)
    .attr("height", bar_label_height);

  sixBar.append("text")
    .attr("class", "bar_text")
    .text("Multiple/Other") 
    .attr("x", boxbar_offset_x + (bar6_target_width + boxbar_margin) * 5 + (bar6_target_width / 2) - 35)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);
    
  // Boxes with labels
    
  var labelBar = d3.select("svg").append("g")
    .style("display", "none")
    .attr("id", "labelBar1");
    
  labelBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "extremely_close")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar5_target_width)
    .attr("height", bar_label_height);

  labelBar.append("text")
    .attr("class", "bar_text")
    .text("Extremely close")
    .attr("x", boxbar_offset_x + (bar_target_width / 2) - 48)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);

  labelBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "very_close")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + bar5_target_width + boxbar_margin)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar5_target_width)
    .attr("height", bar_label_height); 

  labelBar.append("text")
    .attr("class", "bar_text")
    .text("Very close")
    .attr("x", boxbar_offset_x + bar_target_width + boxbar_margin + (bar_target_width / 2) - 30)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);

  labelBar.append("rect")
      .attr("class", "bar_label")
      .attr("id", "moderately_close")     
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("x", boxbar_offset_x + (bar5_target_width + boxbar_margin) * 2)
      .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
      .attr("width", bar5_target_width)
      .attr("height", bar_label_height);

  labelBar.append("text")
    .attr("class", "bar_text")
    .text("Moderately close")
    .attr("x", boxbar_offset_x + (bar_target_width + boxbar_margin) * 2 + (bar_target_width / 2) - 55)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);
    
  labelBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "a_little_close")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar5_target_width + boxbar_margin) * 3)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar5_target_width)
    .attr("height", bar_label_height);

  labelBar.append("text")
    .attr("class", "bar_text")
    .text("A little close")
    .attr("x", boxbar_offset_x + (bar_target_width + boxbar_margin) * 3 + (bar_target_width / 2) - 45)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);
    
  labelBar.append("rect")
    .attr("class", "bar_label")
    .attr("id", "not_at_all_close")     
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("x", boxbar_offset_x + (bar5_target_width + boxbar_margin) * 4)
    .attr("y", boxbar_offset_y - bar_label_height - boxbar_label_margin)
    .attr("width", bar5_target_width)
    .attr("height", bar_label_height);

  labelBar.append("text")
    .attr("class", "bar_text")
    .text("Not at all close")
    .attr("x", boxbar_offset_x + (bar_target_width + boxbar_margin) * 4 + (bar_target_width / 2) - 65)
    .attr("y", boxbar_offset_y - boxbar_label_margin - 6);


  //---------------------------------------------
  // Declaration of functions for nodes and links
  //---------------------------------------------

  // Graph iteration
  function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("name", function(d) { return d.name; })
        .attr("id", function(d) { return d.id; })
        .attr("race", function(d) { return d.race; })
        .attr("edu", function(d) { return d.edu; })
        .attr("freq", function(d) { return d.freq; })
        .attr("gender", function(d) { return d.gender; })
        .attr("transform", function(d){return "translate("+d.x+","+d.y+")"});
  }

  // Add node to graph
  function addFriend() {
    var friendName = document.getElementById("friendNameID");

    if (friendName.value.length > 20 || friendName.value.indexOf(' ') != -1) {
      promptOnlyOne();

    } else if (friendName.value.length > 0) {

      if (numFriends == 0) {

        document.getElementById("first_friend_text").style.display = "none";
        document.getElementById("second_friend_text").style.display = "block";
      }
      
      if (numFriends == 4) {
        document.getElementById("second_friend_text").style.display = "none";
        document.getElementById("final_friend_text").style.display = "block";
        document.getElementById("one_at_a_time").style.display = "none";

        document.getElementById("name_input").style.display = "none";
      }

      numFriends++;

      if (numFriends <= 5) {
        var node = {name: friendName.value, 
                    id: numFriends, 
                    gender:"", 
                    age:0,
                    race:"",
                    religion:"", 
                    surveyTime:0,
                    sawStats:false,
                    edu:null, 
                    freq:null,
                    friendsWith:"",
                    haveBlackFriends:"",
                    friendsBlackFriends:"",
                    knowBlackFriends:"",
                    seeBlackFriends:"",
                    enjoy:"",
                    like:"",
                    interest:"",
                    motivation:""}
        n = nodes.push(node);
        
        links.push({source: node, target: 0});

        restart();
      }

      document.getElementById("friendNameID").value = '';
    }
  }
  
  // Whenever nodes or links are added or changes are made to their properties, the graph needs to be restarted
  function restart() {
    force.start();

    link = link.data(links);

    link.enter().insert("line", ".node")
        .attr("class", "link")
        .on("contextmenu", removeLink);
        
    link.exit().remove();

    node = node.data(nodes);

    var n = node.enter().append("svg:g")
      .attr("class", "node")
      .call(force.drag);
      
    n.append("svg:circle")
      .attr("class", "node")
      .attr("r", 25)
      .on("click", nodeSelect)
      .call(force.drag);
      
    n.append("svg:text")
      .attr("class", "node_text")
      .attr("text-anchor", "middle")  
      .attr("dy", ".3em")
      .attr("pointer-events", "none")
      .text(function(d) { return d.name });

    n.attr("transform", function(d){return "translate("+d.x+","+d.y+")"});
  }
  
  // Remove link between two nodes
  function removeLink(l) {
    // Slide 7: draw links between friends that know each other 
    if (currSlide == 7) {
      links.splice(links.indexOf(l), 1);
      restart();
    }
  }

  var selected = false;
  var targetId;
  var sourceId;

  // Handles node selections depending on the current slide
  function nodeSelect(d) {
    // Slide 5: select female friends
    if (currSlide == 4) {
      if (d.name != "You") {
        if (d.gender == "female") {
          d3.select(this).style("fill", nodeColor)
          d.gender = "";
        } else {
          d3.select(this).style("fill", femaleColor)
          d.gender = "female";
        }
      }
    }

    // Slide 7: draw links between friends that know each other 
    if (currSlide == 7) {
      var targetIndex;
      var sourceIndex;

      if (selected == false) {
        targetId = d.id;
        console.log("targetId: " + targetId);
        selected = true;
      } else {
        sourceId = d.id;
        console.log("sourceid: " + sourceId);
        if (targetId != sourceId) {
          nodes.forEach(function(n) {
            if (n.id == targetId) {
              targetIndex = n.index;
              console.log("target: " + targetIndex);
            } else if (n.id == sourceId) {
              sourceIndex = n.index;
              console.log("source: " + sourceIndex);
            } 
          });
          nodes[sourceIndex].friendsWith += targetIndex.toString();
          nodes[targetIndex].friendsWith += sourceIndex.toString();
          links.push({source: sourceIndex, target: targetIndex});
        }
        selected = false;
      }
      restart();
    }
  }

  // Makes all nodes default color
  function clearColors() {
    d3.selectAll(".node").style("fill", nodeColor)
  }
  
  //-------------------------------------------------------------------------
  // Declaration of functions for manipulating text, boxes and other elements
  //-------------------------------------------------------------------------

  // Wraps text to fit in a span of width 'width'
  function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          x = text.attr("x")
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", x).attr("y", y);
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + "em").text(word);         
        }
      }
    });
  }
  
  function refreshRadio() {
    var text1 = "question" + askedAbout + "_text1";
    var text2 = "question" + askedAbout + "_text2";
    var text3 = "question" + askedAbout + "_text3";
    var win = "question" + askedAbout + "_window";

    var have = document.getElementById("haveBlackFriends")
    var know = document.getElementById("knowBlackFriends");
    var see = document.getElementById("seeBlackFriends");
    var friends = document.getElementById("friendsBlackFriends");

    document.getElementById(text1).style.display = "none";
    document.getElementById(text2).style.display = "none";
    document.getElementById(text3).style.display = "none";
    document.getElementById(win).style.display = "none";

    for(var i=0;i<have.length;i++) {
      have[i].checked = false;
    }
    for(var i=0;i<know.length;i++) {
      know[i].checked = false;
    }
    for(var i=0;i<see.length;i++) {
      see[i].checked = false;
    }
    for (var i = 0; i < friends.length; i++) {
      friends[i].checked = false;
    }
    document.getElementById("blackFriends").style.display = "none";
    document.getElementById("knowFriends").style.display = "none";
    document.getElementById("friendsFriends").style.display = "none";
    document.getElementById("seeFriends").style.display = "none";
  }

  // If respondent has not filled in an answer, reminds them
  function promptNonresponse() {
    document.getElementById("nonresponse_box").style.display = "block";
    document.getElementById("popup").style.display = "block";
  }

  function promptOnlyOne() {
    document.getElementById("onlyone_box").style.display = "block";
    document.getElementById("onlyOnePopup").style.display = "block";
  }

  function friendPromptNonresponse() {
    document.getElementById("fewFriends_box").style.display = "block";
    document.getElementById("friendPopup").style.display = "block";
  }

  function dragPromptNonresponse() {
    document.getElementById("fewDragged_box").style.display = "block";
    document.getElementById("dragPopup").style.display = "block";
  }

  function closePopup() {
    document.getElementById("nonresponse_box").style.display = "none";
    document.getElementById("popup").style.display = "none";
  }

  function closeOnlyOnePopup() {
    document.getElementById("onlyone_box").style.display = "none";
    document.getElementById("popup").style.display = "none";
  }

  function closeFriendPopup() {
    document.getElementById("fewFriends_box").style.display = "none";
    document.getElementById("friendPopup").style.display = "none";
  }

  function closeDragPopup() {
    document.getElementById("fewDragged_box").style.display = "none";
    document.getElementById("dragPopup").style.display = "none";
  }

  // Questions about individuals in the network
  function drawBox(node) {
    var q_x = node.x - 142;
    var x = q_x.toString();

    var q_y = node.y - 175;
    var y = q_y.toString();

    haveFriends = document.getElementById("blackFriends");
    friendsFriends = document.getElementById("friendsFriends");
    knowFriends = document.getElementById("knowFriends");
    seeFriends = document.getElementById("seeFriends");

    haveFriends.style.left = x + "px";
    haveFriends.style.top = y + "px";
    haveFriends.style.display = "block";

    friendsFriends.style.top = y + "px";
    friendsFriends.style.left = x + "px";

    knowFriends.style.top = y + "px";
    knowFriends.style.left = x + "px"
    
    seeFriends.style.top = y + "px";
    seeFriends.style.left = x + "px"

    currSlide += .5;
  }

  
  // ---------------------------------------------------------------------------------------
  // showNext(): Prepares for next slide in survey. Hides previous slide and shows currSlide,
  // performing whatever operations needed for preparing slide.
  // A bit like the main() function
  // ---------------------------------------------------------------------------------------

  function showNext() {
    if (currSlide == 1) {
      var d = new Date();
      startTime = d.getTime();
     
      document.getElementById("Next").style.position="absolute";
      document.getElementById("slide0").style.display = "none";

      // Q1: About how many of your friends are black?
            
      var ex = document.getElementById("userBlackFriends");
      ex.style.left = string_l + "px";
      ex.style.top = string_t;
      ex.style.display = "block";
      currSlide++;

    } else if (currSlide == 2) {
      // If user has not selected an option, alert with popup
      if ($('input[name=uBF]:checked').length == 0 && checked == false) {
        promptNonresponse();
        checked = true;
      } else {
        // Collect data before going on
        var ubf = document.getElementById("userBlFr")
        if (ubf[0].checked) {
          nodes[0].q1 = "none";
        } else if (ubf[1].checked) {
          nodes[0].q1 = "a_few";
        } else if (ubf[2].checked) {
          nodes[0].q1 = "less_than_half";
        } else if (ubf[3].checked) {
          nodes[0].q1 = "half";
        } else if (ubf[4].checked) {
          nodes[0].q1 = "more_than_half";
        } else if (ubf[5].checked) {
          nodes[0].q1 = "most";
        } else if (ubf[6].checked) {
          nodes[0].q1 = "all";
        } 
        checked = false;
        document.getElementById("userBlackFriends").style.display = "none";
        
        // Q2: About how many of your white friends do you think have friends who are black?

        var ex = document.getElementById("whiteFriendsBlackFriends");
        ex.style.left = string_l + "px";
        ex.style.top = string_t;
        ex.style.display = "block";
        currSlide += .5;
      }
    } else if (currSlide == 2.5) {
      // If user has not selected an option, alert with popup
      if ($('input[name=wFBF]:checked').length == 0 && checked == false) {
        promptNonresponse();
        checked = true;
      } else {
        // Collect data before going on
        var wfbf = document.getElementById("whFrBlFr")
        if (wfbf[0].checked) {
          nodes[0].q2 = "none";
          document.getElementById("whiteFriendsBlackFriends").style.display = "none";
          currSlide = 2000;
          showNext();      
        } else if (wfbf[1].checked) {
            nodes[0].q2 = "a_few";
        } else if (wfbf[2].checked) {
          nodes[0].q2 = "less_than_half";
        } else if (wfbf[3].checked) {
          nodes[0].q2 = "about_half";
        } else if (wfbf[4].checked) {
          nodes[0].q2 = "more_than_half";
        } else if (wfbf[5].checked) {
          nodes[0].q2 = "most";
        } else if (wfbf[6].checked) {
          nodes[0].q2 = "all";
        }
        checked = false;
            
        document.getElementById("whiteFriendsBlackFriends").style.display = "none";

        numAsked = 1;
        lastAnswered = 0;

        currSlide += .5;
        showNext();
      }
    } else if (currSlide == 3) {
      d3.selectAll(".node").attr("display", "block");
      d3.selectAll(".node").on('mousedown.drag', function(d) {
        return d.index > 0 ? true : null;
      });
      
      // Q3: The following questions are about people with whom you discuss important matters 
                  
      document.getElementById("slide3").style.display = "block";
      document.getElementById("name_input").style.display = "block";
      document.getElementById("name_input").style.left = string_l + "px";

      currSlide++;
    } else if (currSlide == 4) {
      if (numFriends < 5 && checked == false) {
        checked = true;
        console.log("fewer than 5 friends")
        friendPromptNonresponse();
      } else {
        checked = false;
        document.getElementById("slide3").style.display = "none";
        document.getElementById("slide4").style.display = "block";
        var text = $("#slide4 .numfri").text();
        text = text.replace('personen', 'persoon');
        if (numFriends < 2) $("#slide4 .numfri").text(text);
        
        document.getElementById("name_input").style.display = "none";
        currSlide++;
      }
    } else if (currSlide == 5) {
      document.getElementById("slide4").style.display = "none";

      // Prepare nodes for dragging into boxes
      d3.selectAll(".node").style("display", "block");
      clearColors();
      node[0].y -= 100;
      restart();
    
      // Q4: How close is your relationship with each person?

      document.getElementById("slide5").style.display = "block";
      document.getElementById("fiveBar").style.display = "block";
      document.getElementById("labelBar1").style.display = "block";
      
      var text = $("#slide5 .numfri1").text();
      text = text.replace('each person', 'each person');
      if (numFriends < 2) $("#slide5 .numfri1").text(text);

      var text = $("#slide5 .numfri2").text();
      text = text.replace('elke', 'de');
      if (numFriends < 2) $("#slide5 .numfri2").text(text);              
      
      d3.selectAll(".node").attr("display", "block");  
      d3.selectAll(".node").attr("opacity", function(d) { return d.index == 0 ? .4 : 1 });

      d3.selectAll(".node").classed("fixed", function(d) { 
        if (d.index > 0 ) {
          d.fixed = false
        }
      });

      restart();

      d3.selectAll(".node").attr("opacity", function(d) { if (d.index == 0) { return 1}});

      setTimeout(function() {
        d3.selectAll(".node").classed("fixed", function(d) { d.fixed = true});
        d3.selectAll(".link").attr("display", "none");  
        d3.selectAll(".node").attr("opacity", function(d) { return d.index == 0 ? .4 : 1 });
      },1000);

      currSlide++;
    } else if (currSlide == 6) {
      var nodeAbove = false;
      var nodeBelow = false;

      // Make sure the nodes are correctly placed in one of the boxes
      nodes.forEach(function(n) {
        if (n.index > 0) {
          if (n.y < boxbar_offset_y) {
            nodeAbove = true;
            console.log("nodeAbove: " + nodeAbove);
          } 
          else if (n.y > boxbar_offset_y + bar_target_height) {
            nodeBelow = true;
            console.log("nodeBelow: " + nodeBelow);
          }
        }
      });

      if ((nodeBelow || nodeAbove) && !checked) {
        dragPromptNonresponse();
        checked = true;
      } else {
        nodes.forEach(function(n) {
          if (n.index > 0) {
            if (n.x < boxbar_offset_x + bar5_target_width && n.y > boxbar_offset_y) {
              n.q4 = "extremely_close";
            } else if (n.x < boxbar_offset_x + bar5_target_width * 2 + boxbar_margin && n.y > boxbar_offset_y) {
              n.q4 = "very_close";
            } else if (n.x < boxbar_offset_x + (bar5_target_width + boxbar_margin) * 2 + bar5_target_width && n.y > boxbar_offset_y) {
              n.q4 = "moderately_close";
            } else if (n.x < boxbar_offset_x + (bar5_target_width + boxbar_margin) * 3 + bar5_target_width && n.y > boxbar_offset_y) {
              n.q4 = "a_little_close";
            } else if (n.y > boxbar_offset_y) {
              n.q4 = "not_at_all_close";
            } 
          }
        }); 

        checked = false;
              
        d3.selectAll(".node").classed("fixed", function(d) { 
          if (d.index > 0 ) {
            d.fixed = false;
            setTimeout(function() {
              d.fixed = true
            },2000);
          }
        });
        restart();
      
        document.getElementById("labelBar1").style.display = "none";
        document.getElementById("fiveBar").style.display = "none";      
        document.getElementById("slide5").style.display = "none";      
        
        // Q5: Which of these people know each other?
        
        document.getElementById("slide6").style.display = "block";

        d3.selectAll(".node").attr("opacity", function(d) { return d.index == 0 ? .4 : 1 });

        currSlide++;
        
        if (numFriends < 2) {
          showNext();
        }
      }
    } else if (currSlide == 7) {
      document.getElementById("slide6").style.display = "none";
      
      document.getElementById("slide7").style.display = "block";
      var text = $("#slide7 .numfri").text();
      text = text.replace('mensen', 'persoon');
      if (numFriends < 2) $("#slide7 .numfri").text(text);

      currSlide++;
    } else if (currSlide == 8) {
      document.getElementById("slide7").style.display = "none";

      d3.selectAll(".link").style("display", "none");

      // Fix nodes and hide links in preparation for individual questions
      d3.selectAll(".node").classed("fixed", function(d) { d.fixed = true});
      d3.selectAll(".link").attr("display", "none");  
      d3.selectAll(".node").style("display", "block");

      // Checks to see if there are no friends to ask about, in which case skips individual friend questions
      if (askedAbout == numFriends) {
        d3.selectAll(".node").attr("opacity", 1);
        d3.selectAll(".node").style("display", "none");
        d3.selectAll(".link").style("display", "none");
        d3.selectAll(".node").classed("fixed", function(d) {  
          if (d.index > 0 ) {
            d.fixed = false
          }
        });
        restart();
        currSlide += 5;
        skipped = true;
        showNext();
      } else {
        askedAbout++;

        // Questions about friend 1
           
        d3.selectAll(".node").attr("opacity", function(d) { return d.index == askedAbout ? 1 : .4 });

        currNode = nodes[askedAbout];

        // Q6, Q7, Q8

        d3.select("svg").append("rect")
          .attr("class", "q_window")
          .attr("id", "question1_window")
          .attr("rx", 2)
          .attr("ry", 2)
          .attr("width", q_window_width)
          .attr("height", q_window_height)
          .attr("x", currNode.x - q_window_width / 2)
          .attr("y", currNode.y - q_window_height / 2);

        d3.select("svg").append("rect")
          .attr("class", "backdrop")
          .attr("id", "backdrop1")
          .attr("x", currNode.x - q_window_width / 2 - 110)
          .attr("y", currNode.y - 240)
          .attr("width", backdrop_width)
          .attr("height", 230);
          
        d3.select("svg").append("text")
          .attr("class", "slideText")
          .attr("id", "question1_text0")
          .attr("x", currNode.x - q_window_width / 2 - 100)
          .attr("dy", currNode.y - 220)
          .text("We would like to know more about the friends of '" + currNode.name + "'.");

        d3.select("svg").append("text")
          .attr("class", "slideText")
          .attr("id", "question1_text1")
          .attr("x", currNode.x - q_window_width / 2 - 100)
          .attr("dy", currNode.y - 202)
          .text("Does '" + currNode.name + "' have one or more close friends who are black?")
          .call(wrap, backdrop_width - 20);

        d3.select("svg").append("text")
          .attr("class", "slideText")
          .attr("id", "question1_text2")
          .attr("x", currNode.x - q_window_width / 2 - 100)
          .attr("dy", currNode.y - 202)
          .text("Are you also close friends with the black friends of '" + nodes[askedAbout].name + "'?")
          .call(wrap, backdrop_width - 20)
          .style("display", "none");

        d3.select("svg").append("text")
          .attr("class", "slideText")
          .attr("id", "question1_text3")
          .attr("x", currNode.x - q_window_width / 2 - 100)
          .attr("dy", currNode.y - 202)
          .text("How often do you meet the black friends of '" +nodes[askedAbout].name + "' who are not your own friends?")
          .call(wrap, backdrop_width - 20)
          .style("display", "none");

        drawBox(currNode);
      }
    } else if (currSlide == 8.5) {
      var friendForm = document.getElementById("haveBlackFriends");
      var qText = document.getElementById("question1_text1");
      var qText2 = document.getElementById("question1_text2");
      var qText0 = document.getElementById("question1_text0");

      // If user has not selected an option, alert with popup
      if ($('input[name=haveBlackFriends]:checked').length == 0 && !checked) {
        promptNonresponse();
        checked = true;
      } else {
        checked = false;
        qText.style.display = "none";
        qText0.style.display = "none";
        
        if (!friendForm[1].checked) {
          // If yes, ask follow up question
          haveFriends.style.display = "none";
          friendsFriends.style.display = "block";
          document.getElementById("question1_text2").style.display = "block";
          if (friendForm[0].checked) {
            nodes[askedAbout].q6 = "yes";
          }

          currSlide += .1;
        } else {
          nodes[askedAbout].q6 = "no";
          // If no, skip
          skipped = true;
          currSlide += .5;
          showNext();
        }
      }
    } else if (currSlide == 8.6) {
      var friendForm = document.getElementById("friendsBlackFriends");
      var qText = document.getElementById("question1_text2");
      var qText3 = document.getElementById("question1_text3");

      if (friendForm[4].checked) {
        nodes[askedAbout].q7 = "none";
        currSlide += .4;
        checked = false;
        skipped = true;
        showNext();
      } else {
        // If user has not selected an option, alert with popup
        if ($('input[name=friendsBlackFriends]:checked').length == 0 && !checked) {
          promptNonresponse();
          checked = true;
        } else {
          if (friendForm[0].checked) {
            nodes[askedAbout].q7 = "all";
          } else if (friendForm[1].checked) {
            nodes[askedAbout].q7 = "most";
          } else if (friendForm[2].checked) {
            nodes[askedAbout].q7 = "half";
          } else if (friendForm[3].checked) {
            nodes[askedAbout].q7 = "a_few";
          }

          qText.style.display = "none";

          // Otherwise, ask follow up question
          friendsFriends.style.display = "none";
          seeFriends.style.display = "block";
          document.getElementById("question1_text2").style.display = "none";
          qText3.style.display = "block";

          currSlide += .4;

          checked = false;
        }
      }
    } else if (currSlide == 9) {
      var seeForm = document.getElementById("seeBlackFriends");

      // If user has not selected an option, alert with popup
      if ($('input[name=seeBlackFriends]:checked').length == 0 && !checked && !skipped) {
        promptNonresponse();
        checked = true;
      } else {
        // Collect data before going on
        if (seeForm[0].checked) {
          nodes[askedAbout].q8 = "often";
        } else if (seeForm[1].checked) {
          nodes[askedAbout].q8 = "on_a_regular_basis";
        } else if (seeForm[2].checked) {
          nodes[askedAbout].q8 = "sometimes";
        } else if (seeForm[3].checked) {
          nodes[askedAbout].q8 = "rarely";
        } else if (seeForm[4].checked) {
          nodes[askedAbout].q8 = "none";
        }

        checked = false;
        skipped = false;

        var qWindow = document.getElementById("question1_window");

        qWindow.style.display = "none";
        document.getElementById("backdrop1").style.display = "none";

        refreshRadio();

        if (askedAbout == numFriends) {
          d3.selectAll(".node").attr("opacity", 1);
          d3.selectAll(".link").attr("display", "block");
          d3.selectAll(".node").style("display", "none");
          d3.selectAll(".link").style("display", "none");
          d3.selectAll(".node").classed("fixed", function(d) {  
            if (d.index > 0 ) {
              d.fixed = false
            }
          });

          currSlide += 4;
          skipped = true;
          restart();
          showNext();
        } else {

          // Questions about friend 2

          askedAbout++;
          currNode = nodes[askedAbout];
          d3.selectAll(".node").attr("opacity", function(d) { return d.index == askedAbout ? 1 : .4 });
          
          // Q6, Q7, Q8

          d3.select("svg").append("rect")
            .attr("class", "q_window")
            .attr("id", "question2_window")
            .attr("rx", 2)
            .attr("ry", 2)
            .attr("width", q_window_width)
            .attr("height", q_window_height)
            .attr("x", currNode.x - q_window_width / 2)
            .attr("y", currNode.y - q_window_height / 2);

          d3.select("svg").append("rect")
            .attr("class", "backdrop")
            .attr("id", "backdrop2")
            .attr("x", currNode.x - q_window_width / 2 - 110)
            .attr("y", currNode.y - 240)
            .attr("width", backdrop_width)
            .attr("height", 230);
            
          d3.select("svg").append("text")
            .attr("class", "slideText")
            .attr("id", "question2_text0")
            .attr("x", currNode.x - q_window_width / 2 - 100)
            .attr("dy", currNode.y - 220)
            .text("We would like to know more about the friends of'" + currNode.name + "'.");

          d3.select("svg").append("text")
            .attr("class", "slideText")
            .attr("id", "question2_text1")
            .attr("x", currNode.x - q_window_width / 2 - 100)
            .attr("dy", currNode.y - 202)
            .text("Does '" + currNode.name + "' have one or more close friends who are black?")
            .call(wrap, backdrop_width - 20);

          d3.select("svg").append("text")
            .attr("class", "slideText")
            .attr("id", "question2_text2")
            .attr("x", currNode.x - q_window_width / 2 - 100)
            .attr("dy", currNode.y - 202)
            .text("Are you also close friends with the black friends of '" + nodes[askedAbout].name + "'?")
            .call(wrap, backdrop_width - 20)
            .style("display", "none");

          d3.select("svg").append("text")
            .attr("class", "slideText")
            .attr("id", "question2_text3")
            .attr("x", currNode.x - q_window_width / 2 - 100)
            .attr("dy", currNode.y - 202)
            .text("How often do you meet the black friends of '" +nodes[askedAbout].name + "' who are not your own friends?")
            .call(wrap, backdrop_width - 20)
            .style("display", "none");

          drawBox(currNode);
        }
      }
    } else if (currSlide == 9.5) {
      var friendForm = document.getElementById("haveBlackFriends");
      var qText = document.getElementById("question2_text1");
      var qText2 = document.getElementById("question2_text2");
      var qText0 = document.getElementById("question2_text0");

      // If user has not selected an option, alert with popup
      if ($('input[name=haveBlackFriends]:checked').length == 0 && !checked) {
        promptNonresponse();
        checked = true;
      } else {
        checked = false;
        qText.style.display = "none";
        qText0.style.display = "none";
        
        if (!friendForm[1].checked) {
          // If yes, ask follow up question
          haveFriends.style.display = "none";
          friendsFriends.style.display = "block";
          document.getElementById("question2_text2").style.display = "block";
          if (friendForm[0].checked) {
            nodes[askedAbout].q6 = "yes";
          }

          currSlide += .1;
        } else {
          nodes[askedAbout].q6 = "no";
          // If no, skip
          skipped = true;
          currSlide += .5;
          showNext();
        }
      }
    } else if (currSlide == 9.6) {
      var friendForm = document.getElementById("friendsBlackFriends");
      var qText = document.getElementById("question2_text2");
      var qText3 = document.getElementById("question2_text3");

      if (friendForm[4].checked) {
        nodes[askedAbout].q7 = "none";
        currSlide += .4;
        checked = false;
        skipped = true;
        showNext();
      } else {
        // If user has not selected an option, alert with popup
        if ($('input[name=friendsBlackFriends]:checked').length == 0 && !checked) {
          promptNonresponse();
          checked = true;
        } else {
          if (friendForm[0].checked) {
            nodes[askedAbout].q7 = "all";
          } else if (friendForm[1].checked) {
            nodes[askedAbout].q7 = "most";
          } else if (friendForm[2].checked) {
            nodes[askedAbout].q7 = "half";
          } else if (friendForm[3].checked) {
            nodes[askedAbout].q7 = "a_few";
          }

          qText.style.display = "none";

          // Otherwise, ask follow up question
          friendsFriends.style.display = "none";
          seeFriends.style.display = "block";
          document.getElementById("question2_text2").style.display = "none";
          qText3.style.display = "block";

          currSlide += .4;

          checked = false;
        }
      }
    } else if (currSlide == 10) {
      var seeForm = document.getElementById("seeBlackFriends");

      // If user has not selected an option, alert with popup
      if ($('input[name=seeBlackFriends]:checked').length == 0 && !checked && !skipped) {
        promptNonresponse();
        checked = true;
       } else {

        // Collect data before going on
        if (seeForm[0].checked) {
          nodes[askedAbout].q8 = "often";
        } else if (seeForm[1].checked) {
          nodes[askedAbout].q8 = "on_a_regular_basis";
        } else if (seeForm[2].checked) {
          nodes[askedAbout].q8 = "sometimes";
        } else if (seeForm[3].checked) {
          nodes[askedAbout].q8 = "rarely";
        } else if (seeForm[4].checked) {
          nodes[askedAbout].q8 = "none";
        }

        skipped = false;
        checked = false;

        var qWindow = document.getElementById("question2_window");
       
        qWindow.style.display = "none";
        document.getElementById("backdrop2").style.display = "none";
       
        refreshRadio();

        if (askedAbout == numFriends) {
          d3.selectAll(".node").attr("opacity", 1);
          d3.selectAll(".link").attr("display", "block"); 
          d3.selectAll(".node").style("display", "none");
          d3.selectAll(".link").style("display", "none");
          d3.selectAll(".node").classed("fixed", function(d) {  
            if (d.index > 0 ) {
              d.fixed = false
            }
          });

          currSlide += 3;
          skipped = true;
          restart();
          showNext();
        } else {

          // Questions about friend 3 

          askedAbout++;
          var currNode = nodes[askedAbout];
          d3.selectAll(".node").attr("opacity", function(d) { return d.index == askedAbout ? 1 : .4 });

          d3.select("svg").append("rect")
              .attr("class", "q_window")
              .attr("id", "question3_window")
              .attr("rx", 2)
              .attr("ry", 2)
              .attr("width", q_window_width)
              .attr("height", q_window_height)
              .attr("x", currNode.x - q_window_width / 2)
              .attr("y", currNode.y - q_window_height / 2);

          d3.select("svg").append("rect")
              .attr("class", "backdrop")
              .attr("id", "backdrop3")
              .attr("x", currNode.x - q_window_width / 2 - 110)
              .attr("y", currNode.y - 240)
              .attr("width", backdrop_width)
              .attr("height", 230);
            
          d3.select("svg").append("text")
              .attr("class", "slideText")
              .attr("id", "question3_text0")
              .attr("x", currNode.x - q_window_width / 2 - 100)
              .attr("dy", currNode.y - 220)
              .text("We would like to know more about the friends of'" + currNode.name + "'.");

          d3.select("svg").append("text")
              .attr("class", "slideText")
              .attr("id", "question3_text1")
              .attr("x", currNode.x - q_window_width / 2 - 100)
              .attr("dy", currNode.y - 202)
              .text("Does '" + currNode.name + "' have one or more close friends who are black?")
              .call(wrap, backdrop_width - 20);

          d3.select("svg").append("text")
              .attr("class", "slideText")
              .attr("id", "question3_text2")
              .attr("x", currNode.x - q_window_width / 2 - 100)
              .attr("dy", currNode.y - 202)
              .text("Are you also close friends with the black friends of '" + nodes[askedAbout].name + "'?")
              .call(wrap, backdrop_width - 20)
              .style("display", "none");

          d3.select("svg").append("text")
              .attr("class", "slideText")
              .attr("id", "question3_text3")
              .attr("x", currNode.x - q_window_width / 2 - 100)
              .attr("dy", currNode.y - 202)
              .text("How often do you meet the black friends of '" +nodes[askedAbout].name + "' who are not your own friends?")
              .call(wrap, backdrop_width - 20)
              .style("display", "none");

          drawBox(currNode);
        }
      }
    } else if (currSlide == 10.5) {
      var friendForm = document.getElementById("haveBlackFriends");
      var qText = document.getElementById("question3_text1");
      var qText2 = document.getElementById("question3_text2");
      var qText0 = document.getElementById("question3_text0");

      // If user has not selected an option, alert with popup
      if ($('input[name=haveBlackFriends]:checked').length == 0 && !checked) {
        promptNonresponse();
        checked = true;
      } else {
        checked = false;
        qText.style.display = "none";
        qText0.style.display = "none";
        
        if (!friendForm[1].checked) {
          // If yes, ask follow up question
          haveFriends.style.display = "none";
          friendsFriends.style.display = "block";
          document.getElementById("question3_text2").style.display = "block";
          if (friendForm[0].checked) {
            nodes[askedAbout].q6 = "yes";
          }

          currSlide += .1;
        } else {
          nodes[askedAbout].q6 = "no";
          // If no, skip
          skipped = true;
          currSlide += .5;
          showNext();
        }
      }
    } else if (currSlide == 10.6) {
      var friendForm = document.getElementById("friendsBlackFriends");
      var qText = document.getElementById("question3_text2");
      var qText3 = document.getElementById("question3_text3");

      if (friendForm[4].checked) {
        nodes[askedAbout].q7 = "none";
        currSlide += .4;
        checked = false;
        skipped = true;
        showNext();
      } else {
        // If user has not selected an option, alert with popup
        if ($('input[name=friendsBlackFriends]:checked').length == 0 && !checked) {
          promptNonresponse();
          checked = true;
        } else {
          if (friendForm[0].checked) {
            nodes[askedAbout].q7 = "all";
          } else if (friendForm[1].checked) {
            nodes[askedAbout].q7 = "most";
          } else if (friendForm[2].checked) {
            nodes[askedAbout].q7 = "half";
          } else if (friendForm[3].checked) {
            nodes[askedAbout].q7 = "a_few";
          }

          qText.style.display = "none";

          // Otherwise, ask follow up question
          friendsFriends.style.display = "none";
          seeFriends.style.display = "block";
          document.getElementById("question3_text2").style.display = "none";
          qText3.style.display = "block";

          currSlide += .4;

          checked = false;
        }
      }
      } else if (currSlide == 11) {
        var seeForm = document.getElementById("seeBlackFriends");
        // If user has not selected an option, alert with popup
        if ($('input[name=seeBlackFriends]:checked').length == 0 && !checked && !skipped) {
          promptNonresponse();
          checked = true;
        } else {

          // Collect data before going on
          if (seeForm[0].checked) {
            nodes[askedAbout].q8 = "often";
          } else if (seeForm[1].checked) {
            nodes[askedAbout].q8 = "on_a_regular_basis";
          } else if (seeForm[2].checked) {
            nodes[askedAbout].q8 = "sometimes";
          } else if (seeForm[3].checked) {
            nodes[askedAbout].q8 = "rarely";
          } else if (seeForm[4].checked) {
            nodes[askedAbout].q8 = "none";
          }

          checked = false;
          skipped = false;

          var qWindow = document.getElementById("question3_window");

          qWindow.style.display = "none";
          document.getElementById("backdrop3").style.display = "none";

          refreshRadio();
          
          if (askedAbout == numFriends) {
            d3.selectAll(".node").attr("opacity", 1);
            d3.selectAll(".link").attr("display", "block"); 
            d3.selectAll(".node").style("display", "none");
            d3.selectAll(".link").style("display", "none");
            d3.selectAll(".node").classed("fixed", function(d) {  
              if (d.index > 0 ) {
                d.fixed = false
              }
            });

            currSlide += 2;
            skipped = true;
            restart();
            showNext();
          } else {

            // Questions about friend 4
            
            askedAbout++;
            var currNode = nodes[askedAbout];
            d3.selectAll(".node").attr("opacity", function(d) { return d.index == askedAbout ? 1 : .4 });

            d3.select("svg").append("rect")
                .attr("class", "q_window")
                .attr("id", "question4_window")
                .attr("rx", 2)
                .attr("ry", 2)
                .attr("width", q_window_width)
                .attr("height", q_window_height)
                .attr("x", currNode.x - q_window_width / 2)
                .attr("y", currNode.y - q_window_height / 2);

            d3.select("svg").append("rect")
                .attr("class", "backdrop")
                .attr("id", "backdrop4")
                .attr("x", currNode.x - q_window_width / 2 - 110)
                .attr("y", currNode.y - 240)
                .attr("width", backdrop_width)
                .attr("height", 230);
              
            d3.select("svg").append("text")
                .attr("class", "slideText")
                .attr("id", "question4_text0")
                .attr("x", currNode.x - q_window_width / 2 - 100)
                .attr("dy", currNode.y - 220)
                .text("We would like to know more about the friends of'" + currNode.name + "'.");

            d3.select("svg").append("text")
                .attr("class", "slideText")
                .attr("id", "question4_text1")
                .attr("x", currNode.x - q_window_width / 2 - 100)
                .attr("dy", currNode.y - 202)
                .text("Does '" + currNode.name + "' have one or more close friends who are black?")
                .call(wrap, backdrop_width - 20);

            d3.select("svg").append("text")
                .attr("class", "slideText")
                .attr("id", "question4_text2")
                .attr("x", currNode.x - q_window_width / 2 - 100)
                .attr("dy", currNode.y - 202)
                .text("Are you also close friends with the black friends of '" + nodes[askedAbout].name + "'?")
                .call(wrap, backdrop_width - 20)
                .style("display", "none");

            d3.select("svg").append("text")
                .attr("class", "slideText")
                .attr("id", "question4_text3")
                .attr("x", currNode.x - q_window_width / 2 - 100)
                .attr("dy", currNode.y - 202)
                .text("How often do you meet the black friends of '" +nodes[askedAbout].name + "' who are not your own friends?")
                .call(wrap, backdrop_width - 20)
                .style("display", "none");

            drawBox(currNode);
          }
        }
      } else if (currSlide == 11.5) {
        var friendForm = document.getElementById("haveBlackFriends");
        var qText = document.getElementById("question4_text1");
        var qText2 = document.getElementById("question4_text2");
        var qText0 = document.getElementById("question4_text0");

        // If user has not selected an option, alert with popup
        if ($('input[name=haveBlackFriends]:checked').length == 0 && !checked) {
          promptNonresponse();
          checked = true;
        } else {
          checked = false;
          qText.style.display = "none";
          qText0.style.display = "none";
          
          if (!friendForm[1].checked) {
            // If yes, ask follow up question
            haveFriends.style.display = "none";
            friendsFriends.style.display = "block";
            document.getElementById("question4_text2").style.display = "block";
            if (friendForm[0].checked) {
              nodes[askedAbout].q6 = "yes";
            }

            currSlide += .1;
          } else {
            nodes[askedAbout].q6 = "no";
            // If no, skip
            skipped = true;
            currSlide += .5;
            showNext();
          }
        }
      } else if (currSlide == 11.6) {
        var friendForm = document.getElementById("friendsBlackFriends");
        var qText = document.getElementById("question4_text2");
        var qText3 = document.getElementById("question4_text3");

        if (friendForm[4].checked) {
          nodes[askedAbout].q7 = "none";
          currSlide += .4;
          checked = false;
          skipped = true;
          showNext();
        } else {
          // If user has not selected an option, alert with popup
          if ($('input[name=friendsBlackFriends]:checked').length == 0 && !checked) {
            promptNonresponse();
            checked = true;
          } else {
            if (friendForm[0].checked) {
              nodes[askedAbout].q7 = "all";
            } else if (friendForm[1].checked) {
              nodes[askedAbout].q7 = "most";
            } else if (friendForm[2].checked) {
              nodes[askedAbout].q7 = "half";
            } else if (friendForm[3].checked) {
              nodes[askedAbout].q7 = "a_few";
            }

            qText.style.display = "none";

            // Otherwise, ask follow up question
            friendsFriends.style.display = "none";
            seeFriends.style.display = "block";
            document.getElementById("question4_text2").style.display = "none";
            qText3.style.display = "block";

            currSlide += .4;

            checked = false;
          }
        }
      } else if (currSlide == 12) {
        var seeForm = document.getElementById("seeBlackFriends");

        // If user has not selected an option, alert with popup
        if ($('input[name=seeBlackFriends]:checked').length == 0 && !checked && !skipped) {
          promptNonresponse();
          checked = true;
        } else {
          // Collect data before going on
          if (seeForm[0].checked) {
            nodes[askedAbout].q8 = "often";
          } else if (seeForm[1].checked) {
            nodes[askedAbout].q8 = "on_a_regular_basis";
          } else if (seeForm[2].checked) {
            nodes[askedAbout].q8 = "sometimes";
          } else if (seeForm[3].checked) {
            nodes[askedAbout].q8 = "rarely";
          } else if (seeForm[4].checked) {
            nodes[askedAbout].q8 = "none";
          }

          skipped = false;
          checked = false;

          var qWindow = document.getElementById("question4_window");

          qWindow.style.display = "none";
          document.getElementById("backdrop4").style.display = "none";

          refreshRadio();

          if (askedAbout == numFriends) {
            d3.selectAll(".node").attr("opacity", 1);
            d3.selectAll(".link").attr("display", "block"); 
            d3.selectAll(".node").style("display", "none");
            d3.selectAll(".link").style("display", "none");
            d3.selectAll(".node").classed("fixed", function(d) {  
            if (d.index > 0 ) {
              d.fixed = false
            }
          });

          currSlide += 1;
          skipped = true;
          restart();
          showNext();
        } else {

          // Questions about friend 5

          askedAbout++;
          var currNode = nodes[askedAbout];
          d3.selectAll(".node").attr("opacity", function(d) { return d.index == askedAbout ? 1 : .4 });

          d3.select("svg").append("rect")
              .attr("class", "q_window")
              .attr("id", "question5_window")
              .attr("rx", 2)
              .attr("ry", 2)
              .attr("width", q_window_width)
              .attr("height", q_window_height)
              .attr("x", currNode.x - q_window_width / 2)
              .attr("y", currNode.y - q_window_height / 2);

          d3.select("svg").append("rect")
              .attr("class", "backdrop")
              .attr("id", "backdrop5")
              .attr("x", currNode.x - q_window_width / 2 - 110)
              .attr("y", currNode.y - 240)
              .attr("width", backdrop_width)
              .attr("height", 230);
            
          d3.select("svg").append("text")
              .attr("class", "slideText")
              .attr("id", "question5_text0")
              .attr("x", currNode.x - q_window_width / 2 - 100)
              .attr("dy", currNode.y - 220)
              .text("We would like to know more about the friends of'" + currNode.name + "'.");

          d3.select("svg").append("text")
              .attr("class", "slideText")
              .attr("id", "question5_text1")
              .attr("x", currNode.x - q_window_width / 2 - 100)
              .attr("dy", currNode.y - 202)
              .text("Does '" + currNode.name + "' have one or more close friends who are black?")
              .call(wrap, backdrop_width - 20);

          d3.select("svg").append("text")
              .attr("class", "slideText")
              .attr("id", "question5_text2")
              .attr("x", currNode.x - q_window_width / 2 - 100)
              .attr("dy", currNode.y - 202)
              .text("Are you also close friends with the black friends of '" + nodes[askedAbout].name + "'?")
              .call(wrap, backdrop_width - 20)
              .style("display", "none");

          d3.select("svg").append("text")
              .attr("class", "slideText")
              .attr("id", "question5_text3")
              .attr("x", currNode.x - q_window_width / 2 - 100)
              .attr("dy", currNode.y - 202)
              .text("How often do you meet the black friends of '" +nodes[askedAbout].name + "' who are not your own friends?")
              .call(wrap, backdrop_width - 20)
              .style("display", "none");

          drawBox(currNode);
        }
      }
    } else if (currSlide == 12.5) {
      var friendForm = document.getElementById("haveBlackFriends");
      var qText = document.getElementById("question5_text1");
      var qText2 = document.getElementById("question5_text2");
      var qText0 = document.getElementById("question5_text0");

      // If user has not selected an option, alert with popup
      if ($('input[name=haveBlackFriends]:checked').length == 0 && !checked) {
        promptNonresponse();
        checked = true;
      } else {
        checked = false;
        qText.style.display = "none";
        qText0.style.display = "none";
        
        if (!friendForm[1].checked) {
          // If yes, ask follow up question
          haveFriends.style.display = "none";
          friendsFriends.style.display = "block";
          document.getElementById("question5_text2").style.display = "block";
          if (friendForm[0].checked) {
            nodes[askedAbout].q6 = "yes";
          }

          currSlide += .1;
        } else {
          nodes[askedAbout].q6 = "no";
          // If no, skip
          skipped = true;
          currSlide += .5;
          showNext();
        }
      }
    } else if (currSlide == 12.6) {
      var friendForm = document.getElementById("friendsBlackFriends");
      var qText = document.getElementById("question5_text2");
      var qText3 = document.getElementById("question5_text3");

      if (friendForm[4].checked) {
        nodes[askedAbout].q7 = "none";
        currSlide += .4;
        checked = false;
        skipped = true;
        showNext();
      } else {
        // If user has not selected an option, alert with popup
        if ($('input[name=friendsBlackFriends]:checked').length == 0 && !checked) {
          promptNonresponse();
          checked = true;
        } else {
          if (friendForm[0].checked) {
            nodes[askedAbout].q7 = "all";
          } else if (friendForm[1].checked) {
            nodes[askedAbout].q7 = "most";
          } else if (friendForm[2].checked) {
            nodes[askedAbout].q7 = "half";
          } else if (friendForm[3].checked) {
            nodes[askedAbout].q7 = "a_few";
          }

          qText.style.display = "none";

          // Otherwise, ask follow up question
          friendsFriends.style.display = "none";
          seeFriends.style.display = "block";
          document.getElementById("question5_text2").style.display = "none";
          qText3.style.display = "block";

          currSlide += .4;

          checked = false;
        }
      }
    } else if (currSlide == 13) {
      var seeForm = document.getElementById("seeBlackFriends");

      // If user has not selected an option, alert with popup
      if ($('input[name=seeBlackFriends]:checked').length == 0 && !checked && !skipped) {
        promptNonresponse();
        checked = true;
      } else {
        skipped = false;
        checked = false;

        currSlide++;

        if (numFriends == 5) {
          // Collect data before going on
          if (seeForm[0].checked) {
            nodes[askedAbout].q8 = "often";
          } else if (seeForm[1].checked) {
            nodes[askedAbout].q8 = "on_a_regular_basis";
          } else if (seeForm[2].checked) {
            nodes[askedAbout].q8 = "sometimes";
          } else if (seeForm[3].checked) {
            nodes[askedAbout].q8 = "rarely";
          } else if (seeForm[4].checked) {
            nodes[askedAbout].q8 = "none";
          }

          var qWindow = document.getElementById("question5_window");

          qWindow.style.display = "none";
          document.getElementById("backdrop5").style.display = "none";

          refreshRadio();

          d3.selectAll(".node").style("opacity", 1);
          d3.selectAll(".node").style("display", "none");
          d3.selectAll(".link").style("display", "none");
          d3.selectAll(".node").classed("fixed", function(d) {  
            if (d.index > 0 ) {
              d.fixed = false
            }
          });
        }

        d3.selectAll(".link").style("display", "none");
        showNext();

        restart();
      }
    } else if (currSlide == 14) {
      d3.selectAll(".link").style("display", "none");
      var whiteWarm = document.getElementById("whiteWarmth");
      whiteWarmth.style.left = string_l + "px";
      whiteWarmth.style.top = string_t;
      whiteWarmth.style.display = "block";

      currSlide++;
    } else if (currSlide == 15) {

      // If user has not selected an option, alert with popup
      if (($('input[name=wnegpos]:checked').length == 0 || $('input[name=wvrivij]:checked').length == 0 || $('input[name=wwanver]:checked').length == 0) && !checked) {
        promptNonresponse();
        checked = true;
      } else {
        // Collect data before going on
        nodes[0].q9_1 = $('input[name="wnegpos"]:checked').val();
        nodes[0].q9_2 = $('input[name="wvrivij"]:checked').val();
        nodes[0].q9_3 = $('input[name="wwanver"]:checked').val();
        var ww = document.getElementById("wWarmth")

        checked = false;
        ww.style.display = "none";

        var bWarm = document.getElementById("blackWarmth");
        bWarm.style.left = string_l + "px";
        bWarm.style.top = string_t;
        bWarm.style.display = "block";

        currSlide++;
      }
    } else if (currSlide == 16) {
      // If user has not selected an option, alert with popup
      if (($('input[name=bnegpos]:checked').length == 0 || $('input[name=bvrivij]:checked').length == 0 || $('input[name=bwanver]:checked').length == 0) && !checked) {
        promptNonresponse();
        checked = true;
      } else {
        // Collect data before going on
        nodes[0].q10_1 = $('input[name="bnegpos"]:checked').val();
        nodes[0].q10_2 = $('input[name="bvrivij"]:checked').val();
        nodes[0].q10_3 = $('input[name="bwanver"]:checked').val();
        var bw = document.getElementById("bWarmth")
        
        // Single array containing all answers
        var answer = [document.getElementById("nomem").value,nodes[0].q1,nodes[0].q2,(nodes.length > 1) ? nodes[1].name : "", (nodes.length > 1) ? nodes[1].q4 : "",(nodes.length > 1) ? nodes[1].friendsWith : "",(nodes.length > 1) ? nodes[1].q6 : "",(nodes.length > 1) ? nodes[1].q7 : "",(nodes.length > 1) ? nodes[1].q8 : "",(nodes.length > 2) ? nodes[2].name : "",(nodes.length > 2) ? nodes[2].q4 : "",(nodes.length > 2) ? nodes[2].friendsWith : "",(nodes.length > 2) ? nodes[2].q6 : "",(nodes.length > 2) ? nodes[2].q7 : "",(nodes.length > 2) ? nodes[2].q8 : "",(nodes.length > 3) ? nodes[3].name : "",(nodes.length > 3) ? nodes[3].q4 : "",(nodes.length > 3) ? nodes[3].friendsWith : "",(nodes.length > 3) ? nodes[3].q6 : "",(nodes.length > 3) ? nodes[3].q7 : "",(nodes.length > 3) ? nodes[3].q8 : "",(nodes.length > 4) ? nodes[4].name : "",(nodes.length > 4) ? nodes[4].q4 : "",(nodes.length > 4) ? nodes[4].friendsWith : "",(nodes.length > 4) ? nodes[4].q6 : "",(nodes.length > 4) ? nodes[4].q7 : "",(nodes.length > 4) ? nodes[4].q8 : "",(nodes.length > 5) ? nodes[5].name : "",(nodes.length > 5) ? nodes[5].q4 : "",(nodes.length > 5) ? nodes[5].friendsWith : "",(nodes.length > 5) ? nodes[5].q6 : "",(nodes.length > 5) ? nodes[5].q7 : "",(nodes.length > 5) ? nodes[5].q8 : "",nodes[0].q9_1,nodes[0].q9_2,nodes[0].q9_3,nodes[0].q10_1,nodes[0].q10_2,nodes[0].q10_3];
            
        document.getElementById("qu1_id").value = answer.join(",");
        
        //Post collected data to handler for recording
        $.post( "save_results.php", { 
        nomem: document.getElementById("nomem").value,
        q1: nodes[0].q1,
        q2: nodes[0].q2,
        q3_1: (nodes.length > 1) ? nodes[1].name : "",
        q4_1: (nodes.length > 1) ? nodes[1].q4 : "",
        q5_1: (nodes.length > 1) ? nodes[1].friendsWith : "",
        q6_1: (nodes.length > 1) ? nodes[1].q6 : "",
        q7_1: (nodes.length > 1) ? nodes[1].q7 : "",
        q8_1: (nodes.length > 1) ? nodes[1].q8 : "",
        q3_2: (nodes.length > 2) ? nodes[2].name : "",
        q4_2: (nodes.length > 2) ? nodes[2].q4 : "",
        q5_2: (nodes.length > 2) ? nodes[2].friendsWith : "",
        q6_2: (nodes.length > 2) ? nodes[2].q6 : "",
        q7_2: (nodes.length > 2) ? nodes[2].q7 : "",
        q8_2: (nodes.length > 2) ? nodes[2].q8 : "",
        q3_3: (nodes.length > 3) ? nodes[3].name : "",
        q4_3: (nodes.length > 3) ? nodes[3].q4 : "",
        q5_3: (nodes.length > 3) ? nodes[3].friendsWith : "",
        q6_3: (nodes.length > 3) ? nodes[3].q6 : "",
        q7_3: (nodes.length > 3) ? nodes[3].q7 : "",
        q8_3: (nodes.length > 3) ? nodes[3].q8 : "",
        q3_4: (nodes.length > 4) ? nodes[4].name : "",
        q4_4: (nodes.length > 4) ? nodes[4].q4 : "",
        q5_4: (nodes.length > 4) ? nodes[4].friendsWith : "",
        q6_4: (nodes.length > 4) ? nodes[4].q6 : "",
        q7_4: (nodes.length > 4) ? nodes[4].q7 : "",
        q8_4: (nodes.length > 4) ? nodes[4].q8 : "",
        q3_5: (nodes.length > 5) ? nodes[5].name : "",
        q4_5: (nodes.length > 5) ? nodes[5].q4 : "",
        q5_5: (nodes.length > 5) ? nodes[5].friendsWith : "",
        q6_5: (nodes.length > 5) ? nodes[5].q6 : "",
        q7_5: (nodes.length > 5) ? nodes[5].q7 : "",
        q8_5: (nodes.length > 5) ? nodes[5].q8 : "",
        q9_1: nodes[0].q9_1,
        q9_2: nodes[0].q9_2,
        q9_3: nodes[0].q9_3,
        q10_1: nodes[0].q10_1,
        q10_2: nodes[0].q10_2,
        q10_3: nodes[0].q10_3
        });            
        
        checked = false;
        bw.style.display = "none";

        var sf = document.getElementById("submitForm");
        var sb = document.getElementById("submitButton");
        var nd = document.getElementById("NextDiv");
        sf.style.display = "block";
        nd.style.display = "none";
        var motivationText = d3.select("svg").append("text")
          .attr("class", "slideText")
          .attr("id", "motivationText")
          .attr("x", center - (textWidth / 2) + 50)
          .attr("y", text_offset_top + 40)
          .text("Thank you for participating in this study. Click \"Next\" to end the survey.")
          .call(wrap, textWidth);
          
        // Release window close-prevention
        unhook();
      }
    }
  }
  
  // Detect Internet Explorer
  var ie = (function(){
    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : undef;
  }());

  function isIE () {
    return (ie < 10);
  }
  
</script>