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
  info <- data.frame(user = character(0), scheme = character(0), event = character(0),  timeTaken_day = numeric())
  initTime = 0
  finalTime = 0
  e = "NA"
  s = "NA"
  
  for (u in unique(df$user)){ # for user
    user = u  # set user
    set <- subset(df, df$user == u )
    finalTime = 0 
    for(row in 1:nrow(set)){ # for each entry
      s = set[row,]$scheme # set scheme
      #create new password
      if(set[row,]$mode == "create" & set[row,]$event == "start")
      {
        e = "Created Password"
        initTime = set[row,]$time # get initial time
        finalTime = 0
        
      }
      # successful login
      else if(set[row,]$mode == "login" & set[row,]$event == "success")
      {
        e = "Successful Login"
        finalTime =  set[row,]$time
        
      }
      # failed login
      else if (set[row,]$mode == "login" & set[row,]$event == "failure" )
      {
        e = "Failed Login"
        finalTime =  set[row,]$time
      }else
      {
        e   = "testing"
        finalTime =  0
      }
      
     
    
      # get time
      totalTime <- difftime(strptime(finalTime, format="%Y-%m-%d %H:%M:%S", tz=""), 
                            strptime(initTime, format="%Y-%m-%d %H:%M:%S", tz=""), units="days")
      t =  round(as.numeric(totalTime, units = "days"), digits = 2)
   
      if(is.na(t)){
        t = 0
      }
      
      temp = data.frame(user = u, scheme = s, event = e,  timeTaken_days = t)
      info <- rbind(info, temp)
      
    }
    
  }
  print("File Read")
  write.csv(info, file = outputFile)
}
