setwd("C:/Users/me/Desktop/3008-a2")
scheme <- read.csv(file="TextScheme.csv", head=TRUE,sep=",")

analyzeData = function(){
  analyze("TextScheme.csv", "Text28")
  analyze("BlankScheme.csv", "Blank28")
  analyze("ImageScheme.csv","Image28")
}


###########################  Analyze ##########################################
analyze = function(inputFile, schemeType ){
  data  <- read.csv(file=inputFile, head=TRUE,sep=",")
  df <- data.frame( user = data$user, scheme = data$scheme, event = data$event,  time = data$timeTaken_days)
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
    t = sum(set$time)
    
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
    t = sum(set$time)
    
    temp <- data.frame(user = u, time = t)
    failed <- rbind(failed, temp)
  }
  
  meanFailTime = mean(success[,2])
  sdFailTime = sd(success[,2])
  medianFailTime = median(success[,2])
  
  
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
  hist(success[,2], main = title, xlab = "days", xlim = c(0, 150))
  boxplot(success$time, main = title, xlab =  "Sucessful Login Time")
  
  title = paste("Failed Login time ",  schemeType)
  hist(failed[,2], main = title, xlab = "days", xlim = c(0, 150))
  boxplot(failed$time, main = title, xlab =  "failed Login Time")
  
  
  
  
}



