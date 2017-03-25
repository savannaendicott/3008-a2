setwd("C:/Users/me/Desktop/3008-a2")
blank_pts <- read.csv(file="Blankpt28_log.csv", head=TRUE,sep=",")
text28 <- read.csv(file="Text28_log.csv", head=TRUE,sep=",")
img_pts <- read.csv(file="Imagept28_log.csv", head=TRUE,sep=",")


#####################    TEXT28 Scheme          #########################################
users <- unique(text28$user)
print(users)
df <- data.frame(text28$user, text28$scheme, text28$mode, text28$event, text28$time)
print(df)

c = 0 
#testing <- data.frame("user", " scheme", "numLogin", "numSucess", "numFail")
for(user in users){
  logins = length(subset(df$mode, text28$user == user &text28$mode == "login"))
  success = length(subset(df$text28.event, text28$user == user &text28$mode == "login" & text28$event == "success"))
  fail =  length(subset(df$text28.event, text28$user == user &text28$mode == "login" & text28$event == "failure"))
  scheme = subset(df$text28.scheme, text28$user == user) 
  temp <- (data.frame(user, scheme, logins, success, fail))

}
write.csv(temp, file = "TextScheme.csv")



#####################    blank_pt Scheme          #########################################
df <- data.frame(blank_pts$user, blank_pts$scheme, blank_pts$mode, blank_pts$event, blank_pts$time)
print(df)

c = 0 
#testing <- data.frame("user", " scheme", "numLogin", "numSucess", "numFail")
for(user in users){
  logins = length(subset(df$blank_pts.mode, blank_pts$user == user &blank_pts$mode == "login"))
  success = length(subset(df$blank_pts.event, blank_pts$user == user &blank_pts$mode == "login" & blank_pts$event == "success"))
  fail =  length(subset(df$blank_pts.event, blank_pts$user == user &blank_pts$mode == "login" & blank_pts$event == "failure"))
  scheme = subset(df$blank_pts.scheme, text28$user == user) 
  temp <- (data.frame(user, scheme, logins, success, fail))
  
}
write.csv(temp, file = "blankScheme.csv")
 
#####################    img_28 Scheme           #########################################

users <- unique(img_pts$user)
df <- data.frame(img_pts$user, img_pts$scheme, img_pts$mode, img_pts$event, img_pts$time)
print(df)

c = 0 
#testing <- data.frame("user", " scheme", "numLogin", "numSucess", "numFail")
for(user in users){
  logins = length(subset(df$img_pts.mode, img_pts$user == user & img_pts$mode == "login"))
  success = length(subset(df$img_pts.event, img_pts$user == user &img_pts$mode == "login" & img_pts$event == "success"))
  fail =  length(subset(df$img_pts.event, img_pts$user == user &img_pts$mode == "login" & img_pts$event == "failure"))
  scheme = subset(df$img_pts.scheme, img_pts$user == user) 
  temp <- data.frame(user, scheme, logins, success, fail)
}
write.csv(temp, file = "ImageScheme.csv")


