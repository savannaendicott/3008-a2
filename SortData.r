setwd("C:/Users/me/Desktop/3008-a2")
blank_pts <- read.csv(file="Blankpt28_log.csv", head=TRUE,sep=",")
text28 <- read.csv(file="Text28_log.csv", head=TRUE,sep=",")
img_pts <- read.csv(file="Imagept28_log.csv", head=TRUE,sep=",")

#####################   call Sort       ####################################
getData = function(){
  sort("Text28_log.csv", "TextScheme.csv")
  sort("Blankpt28_log.csv", "BlankScheme.csv")
  sort("Imagept28_log.csv", "ImageScheme.csv")
}


#####################    Sort Function       ####################################
sort = function(inputFile, outputFile){
  data <- text28 <- read.csv(file=inputFile, head=TRUE,sep=",")
  df <- data.frame( user = data$user, scheme = data$scheme, mode = data$mode,  event = data$event,  time = data$time)
  info <- data.frame(user = character(0), scheme = character(0), numLogin = numeric(), numSuccess = numeric(), numFail = numeric(), timeTaken = numeric(), passwordNum = numeric())
  
  
  for (u in unique(df$user)){ # for user
    user = u  # set user
    password = 0 # set initial num of passwords to 0 
    
    set <- subset(df, df$user == u )
    for(row in 1:nrow(set)){ # for each entry
      #create new password
      if(set[row,]$mode == "create" & set[row,]$event == "start")
      {
        #print(df_text[row,])
        #print("Password Created")
        initTime = set[row,]$time # get initial time
        finalTime = 0
        s = set[row,]$scheme # set scheme
        password = password + 1
        numS = 0 # set success to 0
        numF = 0 # set fails to 0
        numL = 0 # set logins to 0
        temp = data.frame(user = u, scheme = s, numLogin = numL, numSuccess = numS, numFail = numF, timeTaken = 0, passwordNum = password)
        info <- rbind(info, temp)
      }
      # successful login
      else if(set[row,]$mode == "login" & set[row,]$event == "success")
      {
        #print("Login Success")
        numS = numS + 1
        info$numSuccess[info$user == u & info$passwordNum == password] <- numS
        
      }
      # failed login
      else if (set[row,]$mode == "login" & set[row,]$event == "failure" )
      {
        #print("Login Failure")
        numF = numF + 1
        info$numFail[info$user == u & info$passwordNum == password] <- numF
      }
      
      numL = numS + numF
      info$numLogin[info$user == u & info$passwordNum == password] <- numL
      
      finalTime =  set[row,]$time
      # get time
      totalTime <- difftime(strptime(finalTime, format="%Y-%m-%d %H:%M:%S", tz=""), 
                            strptime(initTime, format="%Y-%m-%d %H:%M:%S", tz=""), units="secs")
      #sets time in seconds
      info$timeTaken[info$user == u & info$passwordNum == password] <- round(as.numeric(totalTime, units = "secs"), digits = 2)
      
      
    }
  }
  
  
  print("File Read")
  write.csv(info, file = outputFile)
}
