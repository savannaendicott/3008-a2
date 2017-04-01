setwd("C:/Users/me/Desktop/3008-a2")

#####################   Get Data       ####################################
# calls sort for each scheme
# calls analyze for each scheme 
getData = function(){
 #sort("Text28_log.csv", "TextScheme.csv")
 #sort("Blankpt28_log.csv", "BlankScheme.csv")
 #sort("Imagept28_log.csv", "ImageScheme.csv")
  
  lst <-list()
  test <- data.frame(s = numeric(), f = numeric(), st = numeric(), ft = numeric())
  analyze("TextScheme.csv", "Text28")
  analyze("BlankScheme.csv", "Blank28")
  analyze("ImageScheme.csv","Image28")
  


}


#####################    Sort Function       ####################################
# Create 3 new csv files (1 per scheme) to analyze
# Within each file data each row has user, scheme, event, and timetaken
# event can be, password created, succesful Login, failed Login and testing
# time taken records the difference in time between successful or failed login 
#      and password created.  time is set to 0 at password created.
sort = function(inputFile, outputFile){
  data  <- read.csv(file=inputFile, head=TRUE,sep=",")
  df <- data.frame( user = data$user, scheme = data$scheme, mode = data$mode,  event = data$event,  time = data$time)
  info <- data.frame(user = character(0), scheme = character(0), event = character(0),  timeTaken_sec = numeric())
  initTime = 0
  finalTime = 0
  e = "NA"
  s = "NA"
  
  for (u in unique(df$user)){ # for user
    user = u  # set user
    set <- subset(df, df$user == u )
    finalTime = 0.0
    for(row in 1:nrow(set)){ # for each entry
      s = set[row,]$scheme # set scheme
      #create new password
      if(set[row,]$mode == "create" & set[row,]$event == "start")
      {
        e = "Created Password"
        initTime = set[row,]$time # get initial time
        finalTime = 0.0
        
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
        finalTime =  set[row,]$time
      }
      
     
    
      # get time
      totalTime <- difftime(strptime(finalTime, format="%Y-%m-%d %H:%M:%S", tz=""), 
                            strptime(initTime, format="%Y-%m-%d %H:%M:%S", tz=""), units="secs")
      t =  round(as.numeric(totalTime, units = "secs"), digits = 2)
   
      if(is.na(t)){
        t = 0.0
      }
    
      temp = data.frame(user = u, scheme = s, event = e,  timeTaken_sec = t)
      info <- rbind(info, temp)
      
    }
    
  }
  print("File Read")
  write.csv(info, file = outputFile)
}


###########################  Analyze ##########################################
# takes the 3 output files from sort 
# creates descriptive statsm histograms and boxplots for number of logins and time taken 
#         for a successful/failed login. 
analyze = function(inputFile, schemeType){
  data  <- read.csv(file=inputFile, head=TRUE,sep=",")
  df <- data.frame( user = data$user, scheme = data$scheme, event = data$event,  time = data$timeTaken_sec)
  users <- unique(df$user)
  
  # get Login Totals 
  total <- data.frame(user = character(0), logins = numeric(), success = numeric(), failures = numeric(), time = numeric())
  for(u in users){
    set <- subset(df, df$user == u)
    
    totalS = sum(set$event == "Successful Login")
    totalF = sum(set$event == "Failed Login")
    totalL = totalS + totalF
    totalT = sum(set$time)
    temp <- data.frame(user = u, logins = totalL, success = totalS, failures = totalF, time = totalT)
    total <- rbind(total, temp)
    

  }
  
  meanLogin = mean(total[,2]) 
  sdLogin  = sd(total[,2])
  medianLogin  = median(total[,2])
  
  meanS = mean(total[,3])
  sdS = sd(total[,3])
  medianS = median(total[,3])
  
  meanF = mean(total[,4])
  sdF = sd(total[,4])
  medianF = median(total[,4])
  
  
  # get Successful Logins time
  success <- data.frame(user = character(0), time = numeric())
  for(u in users){
    set <- subset(df, df$user == u & df$event == "Successful Login")
    t = mean(set$time)/86400
    
    temp <- data.frame(user = u, time = t)
    success <- rbind(success, temp)
  }
  
  meanSuccTime = mean(success[,2])
  sdSuccTime = sd(success[,2])
  medianSuccTime = median(success[,2])
  
  
  
  # get failed Logins Time
  
  failed <- data.frame(user = character(0), time = numeric())
  for(u in users){
    set <- subset(df, df$user == u & df$event == "Failed Login")
    if(length(set$time) == 0)
      t = 0
    else
      t = mean(set$time, na.rm = TRUE)/86400
    
    temp <- data.frame(user = u, time = t)
    failed <- rbind(failed, temp)
  }
  
  meanFailTime = mean(failed[,2])
  sdFailTime = sd(failed[,2])
  medianFailTime = median(failed[,2])
  
  
  print(paste("Descriptive Statistics", schemeType))
  
  stats <- data.frame(total = c( mean = meanLogin, sd = sdLogin, median = medianLogin),
                      successful = c( mean = meanS, sd = sdS, median = medianS),
                      failed   = c( mean = meanF, sd = sdF, median = medianF))
  print ("Number Logins")
  print(stats)
  
  times <- data.frame(successful = c(mean = meanSuccTime, sd = sdSuccTime,median = medianSuccTime),
                      failure =    c( mean = meanFailTime, sd = sdFailTime, median = medianFailTime))
  print("Time Logins (in days)")
  print(times)
  
 

  ##########################      Graphs 
  title <- paste("Frequency of Logins ", schemeType)
  
  hist(total[,2], main = title, xlab = "number of Login Attempts", xlim = c(0,50))
  
  title <- paste("Frequency of Success", schemeType)
  hist(total[,3], main = title, xlab = "number of successful Logins", xlim = c(0,50))
  
  title <- paste("Frequency of Fails", schemeType)
  hist(total[,4], main = title, xlab = "number of Failed Logins",  xlim = c(0,50))
  

  title = paste("Sucessful Login Time", schemeType)
  hist(success[,2], main = title, xlab = "days", xlim = c(0, 8))
  boxplot(success$time, main = title, xlab =  "Sucessful Login", ylab = "days" )
  
  title = paste("Failed Login time ",  schemeType)
  hist(failed[,2], main = title, xlab = "days", xlim = c(0, 8))
  boxplot(failed$time, main = title, xlab =  "failed Login", ylab = "days")
  
}
