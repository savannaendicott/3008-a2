setwd("C:/Users/me/Desktop/3008-a2")
blank_pts <- read.csv(file="Blankpt28_log.csv", head=TRUE,sep=",")
text28 <- read.csv(file="Text28_log.csv", head=TRUE,sep=",")
img_pts <- read.csv(file="Imagept28_log.csv", head=TRUE,sep=",")


#####################    TEXT28 Scheme          #########################################
users_text <- unique(text28$user)
df_text <- data.frame(text28$user, text28$scheme, text28$mode, text28$event, text28$time)

info <- data.frame(user = character(0), scheme = character(0), numLogin = numeric(), numSucess = numeric(), numFail = numeric())
for(user in users_text){
  logins = length(subset(df_text$text28.mode, text28$user == user & text28$mode == "login"))
  success = length(subset(df_text$text28.event, text28$user == user &text28$mode == "login" & text28$event == "success"))
  fail =  length(subset(df_text$text28.event, text28$user == user &text28$mode == "login" & text28$event == "failure"))
  scheme = "text28"
   temp <- (data.frame(user, scheme, logins, success, fail))
  info <- rbind(info, temp)
}
print(info)
write.csv(info, file = "TextScheme.csv")



#####################    blank_pt Scheme          #########################################
df_blank <- data.frame(blank_pts$user, blank_pts$scheme, blank_pts$mode, blank_pts$event, blank_pts$time)
users_blank <- unique(blank_pts$user)
info <- data.frame(user = character(0), scheme = character(0), numLogin = numeric(), numSucess = numeric(), numFail = numeric())
for(user in users_blank){
  logins = length(subset(df_blank$blank_pts.mode, blank_pts$user == user &blank_pts$mode == "login"))
  success = length(subset(df_blank$blank_pts.event, blank_pts$user == user &blank_pts$mode == "enter" & blank_pts$event == "goodLogin"))
  fail =  length(subset(df_blank$blank_pts.event, blank_pts$user == user &blank_pts$mode == "enter" & blank_pts$event == "badLogin"))
  scheme = "blank28"
  temp <- (data.frame(user, scheme, logins, success, fail))
  info <- rbind(info,temp)
}
print(info)
write.csv(info, file = "blankScheme.csv")
 
#########################    img_28 Scheme           #########################################

users_img <- unique(img_pts$user)
df_img <- data.frame(img_pts$user, img_pts$scheme, img_pts$mode, img_pts$event, img_pts$time)

info <- data.frame(user = character(0), scheme = character(0), numLogin = numeric(), numSucess = numeric(), numFail = numeric())
for(user in users_img){
  logins = length(subset(df_img$img_pts.mode, img_pts$user == user & img_pts$mode == "login"))
  success = length(subset(df_img$img_pts.event, img_pts$user == user &img_pts$mode == "login" & img_pts$event == "success"))
  fail =  length(subset(df_img$img_pts.event, img_pts$user == user &img_pts$mode == "login" & img_pts$event == "failure"))
  #scheme = subset(df$img_pts.scheme, img_pts$user == user) 
  new <- data.frame(user, scheme, logins, success, fail)
  info <- rbind(info, new)
}
print(info)
write.csv(info, file = "ImageScheme.csv")


