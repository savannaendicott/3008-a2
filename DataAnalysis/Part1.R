setwd("C:/Users/me/Desktop/3008-a2/DataAnalysis")

#####################   Get Data       ####################################
# calls sort for each scheme
# calls analyze for each scheme 
getData = function(){
  Text  <- read.csv(file="Logfiles/Text28_log.csv", head=TRUE,sep=",")
  Blank  <- read.csv(file="Logfiles/Blankpt28_log.csv", head=TRUE,sep=",")
  Image  <- read.csv(file="Logfiles/Imagept28_log.csv", head=TRUE,sep=",")
  
# sort(Text, "Logfiles/TextScheme.csv")
 #sort(Blank, "Logfiles/BlankScheme.csv")
 #sort(Image, "Logfiles/ImageScheme.csv")
  
  lst <-list()
  a = analyze("Logfiles/TextScheme.csv", "Logfiles/Text28")
  b = analyze("Logfiles/BlankScheme.csv", "Logfiles/Blank28")
  c = analyze("Logfiles/ImageScheme.csv","Logfiles/Image28")
  

  getGraphs(a,b,c)
}


#####################    Sort Function       ####################################
# Create 3 new csv files (1 per scheme) to analyze
# Within each file data each row has user, scheme, event, and timetaken
# event can be, password created, succesful Login, failed Login and testing
# time taken records the difference in time between successful or failed login 
#      and password created.  time is set to 0 at password created.
sort = function(data, outputFile){
 
  df <- data.frame( user = data$user, scheme = data$scheme, site = data$site, mode = data$mode,  event = data$event,  time = data$time)
  info <- data.frame(user = character(0), scheme = character(0),site = character(0), event = character(0),  timeTaken_sec = numeric())
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
      site = set[row,]$site
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
    
      temp = data.frame(user = u, scheme = s, site = site, event = e,  timeTaken_sec = t)
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
  df <- data.frame( user = data$user, scheme = data$scheme, site = data$site,  event = data$event,  time = data$timeTaken_sec)
  users <- unique(df$user)
  
  # get Login Totals 
  total <- data.frame(user = character(0),logins = numeric(), success = numeric(), failures = numeric(), time = numeric())
  for(u in users){
    set <- subset(df, df$user == u)
    
    totalS = sum(set$event == "Successful Login")
    totalF = sum(set$event == "Failed Login")
    totalL = totalS + totalF
    totalT = sum(set$time)
    temp <- data.frame(user = u,  logins = totalL, success = totalS, failures = totalF, time = totalT)
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
  print("Time Logins (in days)")
  print(times)
  
  
  
  output <- data.frame(total = total, success = success, failed = failed)
  return(output)
}


getGraphs = function(a, b,c ){
  
  # Create a BoxPlot for all schemes 
  boxplot(a$failed.time, 
          a$success.time,
          b$failed.time, 
          b$success.time,
          c$failed.time,
          c$success.time, 
          col=c('red', 'green'),
          names= c('text28','text28','blank28','blank28', 'image28','image28'), 
          main = "Time Taken", ylab = "days",
          xlab = "Scheme", ylim= c(-1,8))
  par(xpd=TRUE)
  legend(5,10,legend=c("success", "fail"),
         col=c("green", "red"), lty=1:2, cex=0.8)
  
  
  # Histograms regarding Number of Logins
  hist(a$total.failures,  col= c("red"),main = "Text28 number of Logins", xlim =c(0,20), ylim= c(0,8), xlab = "# of Login Attempts")
  hist(a$total.success , add = TRUE, col=c("green"))
  par(xpd=TRUE)
  legend(16,8,legend=c("success", "fail"),
         col=c("green", "red"), lty=1:2, cex=0.8)
  
  hist(b$total.success,  col= c("green"),main = "Blank28 number of Logins", xlim =c(0,35), ylim= c(0,8), xlab = "# of Login Attempts")
  hist(b$total.failures , add = TRUE, col=c("red"))
  par(xpd=TRUE)
  legend(20,8,legend=c("success", "fail"),
         col=c("green", "red"), lty=1:2, cex=0.8)
  
  
  hist(c$total.success,  col= c("green"),main = "Image28 number of Logins", xlim =c(0,20), ylim= c(0,12), xlab = "# of Login Attempts")
  hist(c$total.failures , add = TRUE, col=c("red"))
  par(xpd=TRUE)
  legend(17,8,legend=c("success", "fail"),
         col=c("green", "red"), lty=1:2, cex=0.8)
  
  
  # Histograms regarding time taken 
  hist(a$failed.time,  col= c("red") ,main = "Text28 Time for Logins", xlim =c(0,8), ylim= c(0,8), xlab = "Days ")
  hist(a$success.time , add = TRUE, col=rgb(0,1,0,0.75) )
  par(xpd=TRUE)
  legend(8,8,legend=c("success", "fail"),
         col=c("green", "red"), lty=1:2, cex=0.8)
  
  hist(b$failed.time,  col=c("red") ,main = "Blank28 time for Logins", xlim =c(0,8), ylim= c(0,8), xlab = "Days")
  hist(b$success.time , add = TRUE, col=rgb(0,1,0,0.75) )
  par(xpd=TRUE)
  legend(8,8,legend=c("success", "fail"),
         col=c("green", "red"), lty=1:2, cex=0.8)
  
  
  hist(c$failed.time,  col= c("red"),main = "Image28 time for Logins", xlim =c(0,8), ylim= c(0,12), xlab = "Days")
  hist(c$success.time , add = TRUE, col=rgb(0,1,0,0.75) )
  par(xpd=TRUE)
  legend(8,8,legend=c("success", "fail"),
         col=c("green", "red"), lty=1:2, cex=0.8)
  
  
  
  
}


