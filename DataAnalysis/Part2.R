


#####################   Get Data       ####################################
# calls sort for each scheme
# calls analyze for each scheme 
getData = function(){
  Text  <- read.table(file="server/logs/loginsNew.log", head=TRUE, sep=" ")
  
  sort(Text, "DataAnalysis/Logfiles/EmojiScheme.csv")
 
  
  lst <-list()
  a = analyze("DataAnalysis/Logfiles/EmojiScheme.csv", "Emoji")
  
  
  
  getGraphs(a)
}


#####################    Sort Function       ####################################
# Create 3 new csv files (1 per scheme) to analyze
# Within each file data each row has user, scheme, event, and timetaken
# event can be, password created, succesful Login, failed Login and testing
# time taken records the difference in time between successful or failed login 
#      and password created.  time is set to 0 at password created.
sort = function(data, outputFile){

  t  =  gsub("\\[","",data[,1]) 
  t2 =  gsub("\\]","",data[,2]) 
  time = paste(t,t2)
  event = data[,6]
  site = data[,7]
  mode = data[,8]
  user = data[,9]
  
  df <- data.frame( user = user, event =  event, site = site, mode = mode,  time = time)
  info <- data.frame(user = character(0), site = character(0), event = character(0),  timeTaken_sec = numeric())
  initTime = 0
  finalTime = 0
  e = "NA"
  s = "NA"
  
  for (u in unique(df$user)){ # for user
    user = u  # set user
    set <- subset(df, df$user == u )
    for(row in 1:nrow(set)){ # for each entry
      site = set[row,]$site
      #create new password
      if(set[row,]$event == "create")
      {
        e = "Created Password"
        initTime = set[row,]$time # get initial time
        finalTime = 0.0
        
      }
      # successful login
      else if(set[row,]$event == "successful" && set[row,]$mode == "login")
      {
        e = "Successful Login"
        finalTime =  set[row,]$time
        
      }
      # failed login
      else if (set[row,]$event == "unsuccessful" && set[row,]$mode == "login")
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
  
      temp = data.frame(user = u, site = site, event = e,  timeTaken_sec = t)
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
  df <- data.frame( user = data$user, site = data$site,  event = data$event,  time = data$timeTaken_sec)
  users <- unique(df$user)
  
  # get Login Totals 
  total <- data.frame(user = character(0),logins = numeric(), success = numeric(), failures = numeric(), time = numeric())
  for(u in users){
    set <- subset(df, df$user == u)
  #  print(set);
  
    totalS = sum(set$event == "Successful Login")
    totalF = sum(set$event == "Failed Login")
    totalL = sum(totalS, totalF)
    totalT = sum(set$time)

    if(totalL == 0){
      totalF = totalF +1
      totalL = totalL +1
    }    
    
    temp <- data.frame(user = u,  logins = totalL, success = totalS, failures = totalF, time = totalT)
    total <- rbind(total, temp)
    
    
    
  }
  
  meanLogin = mean(total$logins) 
  sdLogin  = sd(total$logins)
  medianLogin  = median(total$logins)

  
  meanS = mean(total$success)
  sdS = sd(total$success)
  medianS = median(total$success)
  
  meanF = mean(total$failures)
  sdF = sd(total$failures)
  medianF = median(total$failures)
  
  
  # get Successful Logins time
  success <- data.frame(user = character(0), time = numeric())
  for(u in users){
    set <- subset(df, df$user == u & df$event == "Successful Login")
    t = mean(set$time)
    
    if(is.na(t)){
      t = 0.0
    }
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
      t = mean(set$time)
    if(is.na(t)){
      t = 0.0
    }
    temp <- data.frame(user = u, time = t)
    failed <- rbind(failed, temp)
  }
  
  
  meanFailTime = mean(failed$time)
  sdFailTime = sd(failed$time)
  medianFailTime = median(failed$time)
  
  
  
  print(paste("====== Descriptive Statistics", schemeType))
  
  stats <- data.frame(total = c( mean = meanLogin, sd = sdLogin, median = medianLogin),
                      successful = c( mean = meanS, sd = sdS, median = medianS),
                      failed   = c( mean = meanF, sd = sdF, median = medianF))
  print ("Number Logins")
  print(stats)
  
  sigText = t.test(total$success,total$failures)
  print(sigText)
  
  times <- data.frame(successful = c(mean = meanSuccTime, sd = sdSuccTime,median = medianSuccTime),
                      failure =    c( mean = meanFailTime, sd = sdFailTime, median = medianFailTime))
  print("Time Logins (in secs)")
  print(times)
  
  
  
  output <- data.frame(total = total, success = success, failed = failed)
  return(output)
}


getGraphs = function(a ){
  
  # Create a BoxPlot for all schemes 
  boxplot(a$failed.time, 
          a$success.time,
          col=c('red', 'green'),
          names= c('failed', 'success'), 
          main = "Time Taken", ylab = "sec",
          ylim= c(-1,300))
  par(xpd=TRUE)
  legend(5,10,legend=c("success", "fail"),
         col=c("green", "red"), lty=1:2, cex=0.8)
  
  
  # Histograms regarding Number of Logins
  hist(a$total.failures,  col= c("red"),main = "Emoji number of Logins", xlim =c(0,20), ylim= c(0,20), xlab = "# of Login Attempts")
  hist(a$total.success , add = TRUE, col=c("green"))
  
 
  # Histograms regarding time taken 
  hist(a$failed.time, col=c("red"), main = "time Taken", xlim = c(0,350), xlab = "time in seconds");
  hist(a$success.time , add = TRUE, col=rgb(0,1,0,0.75) )

  

  
  
  
}


